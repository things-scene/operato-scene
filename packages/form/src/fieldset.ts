/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

import { Component, HTMLOverlayContainer } from '@hatiolab/things-scene'

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [
    {
      type: 'string',
      label: 'legend',
      name: 'legend'
    }
  ]
}

export default class FieldSet extends HTMLOverlayContainer {
  private _legendElement?: HTMLLegendElement

  setElementProperties(fieldset: HTMLFieldSetElement) {
    var { legend = '' } = this.state

    if (legend) {
      this.legendElement.textContent = legend
    } else {
      this._legendElement && this.element.removeChild(this._legendElement)
      delete this._legendElement
    }
  }

  get legendElement(): HTMLLegendElement {
    if (!this._legendElement) {
      var legend = document.createElement('legend')
      this.element.appendChild(legend)

      this._legendElement = legend
    }

    return this._legendElement
  }

  get nature() {
    return NATURE
  }
}

Component.register('fieldset', FieldSet)
