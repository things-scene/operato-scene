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
      const { alltimeFocus, hideKeyboard, alltimeFocusPending, autofocus } = this.state

      this.element.onkeydown = e => {
        this.onInputKeydown(e)
      }

      if (alltimeFocus) {
        this.element.addEventListener('focusout', e => {
          setTimeout(
            () => {
              this.select()
            },
            !alltimeFocusPending || alltimeFocusPending == 0 ? 1000 : alltimeFocusPending
          )
        })
      }

      if (hideKeyboard) {
        this.element.addEventListener('focusin', e => {
          this.element.setAttribute('readonly', '')
          this.select()

          requestAnimationFrame(() => {
            this.element.removeAttribute('readonly')
          })
        })
      }

      if (autofocus) {
        requestAnimationFrame(() => {
          this.select()
        })
      }
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

  // overridable by inherited classes
  getInputValue(): any {
    return (this.element as HTMLInputElement).value
  }

  onInputChange(e: Event) {
    var { englishOnly, selectAfterChange } = this.state
    const value = this.getInputValue()

    if (englishOnly) {
      /* englishOnly 인 경우에는 멀티바이트 문자들을 모두 제거한다. */
      this.value = value?.replace(/[^\x00-\x7F]/g, '')
    } else {
      this.value = value
    }

    if (selectAfterChange) {
      requestAnimationFrame(() => {
        this.select()
      })
    }
  }

  onInputKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.isComposing) {
      e.preventDefault()

      /*
        enter 키가 눌리면, 값이 변화가 없더라도 강제로 change 이벤트를 발생시킨다.
      */
      this.element.dispatchEvent(new CustomEvent('change'))

      const { nextInput } = this.state

      if (nextInput) {
        setTimeout(() => {
          const n = this.root.findById(nextInput) as Input
          n && n.select && n.select()
        }, 100)
      }
    }

    const { englishOnly } = this.state
    const element = this.element as HTMLInputElement

    if (englishOnly && !e.metaKey && !e.ctrlKey && !e.altKey && /^Key/.test(e.code)) {
      e.stopPropagation()
      e.preventDefault()

      /* englishOnly 인 경우에 문자들은 여기에서 처리한다. 멀티바이트 문자들이 대부분 알파벳의 자모음을 조합하므로, ... */
      const key = e.shiftKey ? e.code.charAt(3) : e.code.charAt(3).toLowerCase()
      const value = element.value

      const start = element.selectionStart || 0
      const end = element.selectionEnd || start

      element.value = [value.substring(0, start), key, value.substring(end)].join('')
      element.setSelectionRange(start + 1, start + 1)
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
