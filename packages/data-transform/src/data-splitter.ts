import { Component, Properties, RectPath, Shape } from '@hatiolab/things-scene'

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  'value-property': 'source'
  // help: 'scene/component/splitter'
}

export default class DataSplitter extends RectPath(Shape) {
  static _image: HTMLImageElement

  static get image() {
    if (!DataSplitter._image) {
      DataSplitter._image = new Image()
      DataSplitter._image.src = new URL('../icons/symbol-data-splitter.png', import.meta.url).href
    }

    return DataSplitter._image
  }

  get nature() {
    return NATURE
  }

  render(context: CanvasRenderingContext2D) {
    var { left, top, width, height } = this.bounds

    context.beginPath()
    this.drawImage(context, DataSplitter.image, left, top, width, height)
  }

  onchange(after: Properties, before: Properties) {
    if (after.hasOwnProperty('source') && Array.isArray(after.source)) {
      this._split(after.source)
    }
  }

  _split(targetArray: Array<any>) {
    if (targetArray.length) {
      for (var i = 0; i < targetArray.length; i++) {
        this.setState('data', targetArray[i])
      }
    }
    console.log(targetArray)
  }

  get source() {
    return this.getState('source')
  }

  set source(source) {
    this.setState('source', source)
  }
}

Component.register('data-splitter', DataSplitter)
