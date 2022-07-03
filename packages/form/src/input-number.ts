/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

import { Component } from '@hatiolab/things-scene'

import Input from './input'

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
      type: 'number',
      label: 'value',
      name: 'text'
    },
    {
      type: 'number',
      label: 'min',
      name: 'min'
    },
    {
      type: 'number',
      label: 'max',
      name: 'max'
    },
    {
      type: 'number',
      label: 'step',
      name: 'step'
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
      label: 'submit-on-change',
      name: 'submitOnChange'
    },
    {
      type: 'checkbox',
      label: 'hide-keyboard',
      name: 'hideKeyboard'
    },
    {
      type: 'checkbox',
      label: 'select-after-change',
      name: 'selectAfterChange'
    }
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
  ],
  'value-property': 'text'
}

export default class InputNumber extends Input {
  get nature() {
    return NATURE
  }

  setElementProperties(element: HTMLInputElement) {
    super.setElementProperties(element)

    var { min = 0, max = 100, step = 1 } = this.state

    element.min = min
    element.max = max
    element.step = step
  }

  getInputValue(): any {
    return (this.element as HTMLInputElement).valueAsNumber
  }

  get text() {
    /* ignore text formatting */
    return this.getState('text')
  }

  set text(text) {
    this.setState('text', text)
  }
}

Component.register('input-number', InputNumber)
Component.register('input-range', InputNumber)
