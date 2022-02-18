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
      type: 'string',
      label: 'value',
      name: 'text'
    },
    {
      type: 'checkbox',
      label: 'multiple',
      name: 'multiple'
    }
  ],
  'value-property': 'text'
}

export default class InputFile extends Input {
  get nature() {
    return NATURE
  }

  setElementProperties(element: HTMLInputElement) {
    super.setElementProperties(element)

    element.multiple = !!this.state.multiple
  }
}

Component.register('input-file', InputFile)
