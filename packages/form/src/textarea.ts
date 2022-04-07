/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

import { Component, error, HTMLOverlayElement } from '@hatiolab/things-scene'

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
    }
  ],
  'value-property': 'text'
}

export default class TextArea extends HTMLOverlayElement {
  get nature() {
    return NATURE
  }

  get tagName() {
    return 'textarea'
  }

  private value: any

  createElement() {
    super.createElement()

    const element = this.element as HTMLTextAreaElement

    element.style.resize = 'none'

    /* element.property => component.property */
    element.onchange = e => {
      this.value = element.value
    }
  }

  /* component.property => element.property */
  setElementProperties(element: HTMLTextAreaElement) {
    var { name = '', placeholder = '', disabled, readonly, maxlength } = this.state

    try {
      element.name = name
      element.placeholder = placeholder
      element.disabled = disabled
      element.readOnly = readonly
      element.maxLength = maxlength === undefined ? -1 : maxlength
      element.value = this.value
    } catch (e) {
      error(e)
    }

    this.data = this.value
  }
}

Component.register('textarea', TextArea)
