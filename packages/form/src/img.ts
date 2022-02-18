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

export default class Img extends HTMLOverlayElement {
  setElementProperties(img: HTMLImageElement) {
    var { src = '' } = this.state

    if (img.src != src) img.src = src
  }

  get src() {
    return this.get('src')
  }

  set src(src) {
    this.set('src', src)
  }

  get nature() {
    return NATURE
  }
}

Component.register('img', Img)
