import { Component, Properties, RectPath, Shape } from '@hatiolab/things-scene'

/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [],
  'value-property': 'source',
  help: 'scene/component/aggregator'
}

export default class DataAggregator extends RectPath(Shape) {
  static _image: HTMLImageElement

  static get image() {
    if (!DataAggregator._image) {
      DataAggregator._image = new Image()
      DataAggregator._image.src = new URL('../icons/symbol-data-aggregator.png', import.meta.url).href
    }
    return DataAggregator._image
  }

  get nature() {
    return NATURE
  }

  render(context: CanvasRenderingContext2D) {
    var { left, top, width, height } = this.bounds

    context.beginPath()
    this.drawImage(context, DataAggregator.image, left, top, width, height)
  }

  onchange(after: Properties, before: Properties) {
    if ('source' in after) {
      this._aggregate()
    }
  }

  _aggregate() {
    let { source, data } = this.state

    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      data = {}
    }

    this.setState('data', { ...data, ...source })
  }

  get source() {
    return this.getState('source')
  }

  set source(source) {
    this.setState('source', source)
  }

  get hasTextProperty() {
    return false
  }
}

Component.register('data-aggregator', DataAggregator)
