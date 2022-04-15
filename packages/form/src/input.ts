/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

import { Component, ComponentNature, HTMLOverlayElement, Properties, error } from '@hatiolab/things-scene'

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
    {
      type: 'checkbox',
      label: 'spread-on-init',
      name: 'spreadOnInit'
    },
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
      this.value = (this.element as HTMLInputElement).value
      // this.data = this.value
    }

    var alltimeFocus = this.get('alltimeFocus')
    var alltimeFocusPending = this.get('alltimeFocusPending')
    var hideKeyboard = this.get('hideKeyboard')
    if (this.app.isViewMode) {
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
    }

    var nextInput = this.get('nextInput')
    if (nextInput) {
      this.element.addEventListener('keypress', e => {
        if (e.keyCode == 13) {
          var n = this.root.findById(nextInput) as HTMLInputElement | undefined
          n && n.select && n.select()
        }
      })
    }

    setTimeout(() => {
      this.get('autofocus') && (this.element as HTMLInputElement).select()
    }, 300)
  }

  /* component.property => element.property */
  setElementProperties(element: HTMLInputElement) {
    var { name = '', placeholder = '', disabled, readonly, maxlength, spreadOnInit, nextInput, autofocus } = this.state

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

    // if (spreadOnInit) {
    //   this.data = this.value
    // }
  }

  onchange(after: Properties, before: Properties) {
    super.onchange(after, before)
    var { spreadOnInit, submitOnChange } = this.state
    const element = this.element as HTMLInputElement

    var valueProperty = this.nature['value-property']
    if (valueProperty && valueProperty in after && this.element) {
      element.value = after.text
      if (!spreadOnInit) {
        this.data = this.value
      }

      if (submitOnChange && element.form)
        element.form.dispatchEvent(
          new Event('submit', {
            cancelable: true
          })
        )
    }
  }
}

;[
  'input',
  'input-text',
  'input-password',
  'input-email',
  'input-search',
  'input-time',
  'input-datetime-local',
  'input-month',
  'input-week'
].forEach(input => Component.register(input, Input))
