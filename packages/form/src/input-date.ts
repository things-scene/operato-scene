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
      type: 'date',
      label: 'value',
      name: 'text'
    },
    {
      type: 'date',
      label: 'min',
      name: 'min'
    },
    {
      type: 'date',
      label: 'max',
      name: 'max'
    },
    {
      type: 'checkbox',
      label: 'submit-on-change',
      name: 'submitOnChange'
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

export default class InputDate extends Input {
  get nature() {
    return NATURE
  }

  setElementProperties(element: HTMLInputElement) {
    super.setElementProperties(element)

    var { min, max } = this.state

    element.min = min
    element.max = max
  }
}

Component.register('input-date', InputDate)
