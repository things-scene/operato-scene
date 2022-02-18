/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

import TinyColor from 'tinycolor2'

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
    },
    {
      type: 'checkbox',
      label: 'spread-on-init',
      name: 'spreadOnInit'
    }
  ],
  'value-property': 'text'
}

export default class InputColor extends Input {
  get nature() {
    return NATURE
  }

  setElementProperties(element: HTMLInputElement) {
    this.value = TinyColor(this.value || '#000000').toHexString()
    super.setElementProperties(element)
  }
}

Component.register('input-color', InputColor)
