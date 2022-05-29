/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

import { Component } from '@hatiolab/things-scene'
import Input from './input'
import { tinycolor } from '@thebespokepixel/es-tinycolor'

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
      type: 'color',
      label: 'value',
      name: 'text',
      property: {
        withoutAlpha: true,
        valueType: 'hex'
      }
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

export default class InputColor extends Input {
  get nature() {
    return NATURE
  }

  setElementProperties(element: HTMLInputElement) {
    this.value = tinycolor(this.value || '#000000', {}).toHexString(false)
    super.setElementProperties(element)
  }
}

Component.register('input-color', InputColor)
