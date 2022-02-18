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
}

Component.register('input-number', InputNumber)
Component.register('input-range', InputNumber)
