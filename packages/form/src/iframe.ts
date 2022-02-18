/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

import { Component, HTMLOverlayElement } from '@hatiolab/things-scene'

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [
    {
      type: 'string',
      label: 'src',
      name: 'src'
    }
  ],
  'value-property': 'src'
}

export default class IFrame extends HTMLOverlayElement {
  get src() {
    return this.getState('src')
  }

  set src(src) {
    this.setState('src', src)
  }

  setElementProperties(iframe: HTMLIFrameElement) {
    var { src = '' } = this.state

    if (iframe.src != src) iframe.src = src
  }

  get nature() {
    return NATURE
  }
}

Component.register('iframe', IFrame)
