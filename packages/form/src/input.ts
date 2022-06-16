/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

import { Component, ComponentNature, error, HTMLOverlayElement, Properties } from '@hatiolab/things-scene'

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [
    {
      type: 'string',
      label: 'name',
      name: 'name'
    },
    {
      type: 'string',
      label: 'value',
      name: 'text'
    },
    {
      type: 'string',
      label: 'placeholder',
      name: 'placeholder'
    },
    {
      type: 'checkbox',
      label: 'readonly',
      name: 'readonly'
    },
    {
      type: 'checkbox',
      label: 'disabled',
      name: 'disabled'
    },
    {
      type: 'number',
      label: 'max-length',
      name: 'maxlength'
    },
    {
      type: 'checkbox',
      label: 'submit-on-change',
      name: 'submitOnChange'
    },
    // {
    //   type: 'checkbox',
    //   label: 'spread-on-init',
    //   name: 'spreadOnInit'
    //   /*
    //   spreadOnInit 은 제거되었다. (다음과 같이 대체될 수 있기 때문이다.)
    //   - value에만 초기값이 설정되어 있으면 데이타는 전파되지 않는다.
    //   - data에 초기값이 설정되어있으면, 처음부터 데이터는 전파된다.
    //   */
    // },
    {
      type: 'string',
      label: 'next-input',
      name: 'nextInput'
    },
    {
      type: 'checkbox',
      label: 'autofocus',
      name: 'autofocus'
    },
    {
      type: 'checkbox',
      label: 'alltime-focus',
      name: 'alltimeFocus'
    },
    {
      type: 'number',
      label: 'alltime-focus-pending',
      name: 'alltimeFocusPending',
      placeholder: 'milli-seconds'
    },
    {
      type: 'checkbox',
      label: 'hide-keyboard',
      name: 'hideKeyboard'
    }
  ],
  'value-property': 'text',
  help: 'scene/component/input'
} as ComponentNature

export default class Input extends HTMLOverlayElement {
  value: any

  get nature(): ComponentNature {
    return NATURE
  }

  get tagName() {
    return 'input'
  }

  get inputType() {
    return this.get('type').substr(6)
  }

  select() {
    ;(this.element as HTMLInputElement).select()
  }

  createElement() {
    super.createElement()

    /* element.property => component.property */
    this.element.onchange = e => {
      this.onInputChange(e)
    }

    if (this.app.isViewMode) {
      var alltimeFocus = this.get('alltimeFocus')
      var alltimeFocusPending = this.get('alltimeFocusPending')
      var hideKeyboard = this.get('hideKeyboard')

      this.element.onkeydown = e => {
        this.onInputKeydown(e)
      }

      this.element.addEventListener('focusout', e => {
        if (alltimeFocus) {
          setTimeout(
            () => {
              ;(this.element as HTMLInputElement).select()
            },
            !alltimeFocusPending || alltimeFocusPending == 0 ? 1000 : alltimeFocusPending
          )
        }
      })

      this.element.addEventListener('focusin', e => {
        if (hideKeyboard) {
          this.element.setAttribute('readonly', '')
          ;(this.element as HTMLInputElement).select()
          setTimeout(() => {
            this.element.removeAttribute('readonly')
          }, 50)
        }
      })

      setTimeout(() => {
        this.get('autofocus') && (this.element as HTMLInputElement).select()
      }, 300)
    }
  }

  /* component.property => element.property */
  setElementProperties(element: HTMLInputElement) {
    var { name = '', placeholder = '', disabled, readonly, maxlength, autofocus } = this.state

    try {
      element.type = this.inputType
      element.name = name
      element.placeholder = placeholder
      element.disabled = disabled
      element.readOnly = readonly
      element.maxLength = maxlength === undefined ? 524288 : maxlength
      element.value = this.value
      autofocus && element.setAttribute('autofocus', '')
    } catch (e) {
      error(e)
    }
  }

  onchange(after: Properties, before: Properties) {
    super.onchange(after, before)

    const element = this.element as HTMLInputElement
    var valueProperty = this.nature['value-property']

    if (valueProperty && valueProperty in after && element) {
      var { submitOnChange } = this.state
      const value = after[valueProperty]

      element.value = value
      this.data = after[valueProperty]

      if (submitOnChange && element.form)
        element.form.dispatchEvent(
          new Event('submit', {
            cancelable: true
          })
        )
    }
  }

  onInputChange(e: Event) {
    this.value = (this.element as HTMLInputElement).value
  }

  onInputKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault()
      e.stopPropagation()

      /*
        enter 키가 눌리면, 값이 변화가 없더라도 강제로 change 이벤트를 발생시킨다.
      */
      this.element.dispatchEvent(new CustomEvent('change'))

      setTimeout(() => {
        const nextInput = this.get('nextInput')
        if (nextInput) {
          const n = this.root.findById(nextInput) as HTMLInputElement | undefined
          n && n.select && n.select()
        }
      }, 100)
    }
  }
}

;[
  'input-password',
  'input-email',
  'input-search',
  'input-time',
  'input-datetime-local',
  'input-month',
  'input-week'
].forEach(input => Component.register(input, Input))
