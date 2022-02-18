/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

import { Component, HTMLOverlayContainer } from '@hatiolab/things-scene'

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true
}

export default class Div extends HTMLOverlayContainer {
  setElementProperties(div: HTMLDivElement) {
    div.textContent = this.text
  }

  get tagName() {
    return 'div'
  }

  get nature() {
    return NATURE
  }
}

Component.register('div', Div)
