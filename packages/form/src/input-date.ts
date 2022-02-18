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
    },
    {
      type: 'checkbox',
      label: 'spread-on-init',
      name: 'spreadOnInit'
    }
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
