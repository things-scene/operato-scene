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
}

;['input-text'].forEach(input => Component.register(input, InputText))
