import { Component, ComponentNature } from '@hatiolab/things-scene'

/*
 * Copyright © HatioLab Inc. All rights reserved.
 */
import Input from './input.js'

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
    },
    {
      type: 'checkbox',
      label: 'english-only',
      name: 'englishOnly'
    },
    {
      type: 'checkbox',
      label: 'select-after-change',
      name: 'selectAfterChange'
    }
  ],
  'value-property': 'text',
  help: 'scene/component/input'
} as ComponentNature

export default class InputText extends Input {
  get nature(): ComponentNature {
    return NATURE
  }

  createElement() {
    super.createElement()
  }

  onInputChange(e: Event) {
    var { englishOnly, selectAfterChange } = this.state
    const element = this.element as HTMLInputElement

    if (englishOnly) {
      /* englishOnly 인 경우에는 멀티바이트 문자들을 모두 제거한다. */
      this.value = element.value = element.value?.replace(/[^\x00-\x7F]/g, '')
    } else {
      this.value = element.value
    }

    if (selectAfterChange) {
      requestAnimationFrame(() => {
        element.select()
      })
    }
  }

  onInputKeydown(e: KeyboardEvent) {
    super.onInputKeydown(e)

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

;['input-text'].forEach(input => Component.register(input, InputText))
