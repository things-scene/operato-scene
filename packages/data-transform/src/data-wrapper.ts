import { Component, Properties, RectPath, Shape } from '@hatiolab/things-scene'

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [
    {
      type: 'string',
      label: 'property-name',
      name: 'propertyName'
    }
  ],
  'value-property': 'source',
  help: 'scene/component/wrapper'
}

export default class DataWrapper extends RectPath(Shape) {
  static _image: HTMLImageElement

  static get image() {
    if (!DataWrapper._image) {
      DataWrapper._image = new Image()
      DataWrapper._image.src = new URL('../icons/symbol-data-wrapper.png', import.meta.url).href
    }

    return DataWrapper._image
  }

  get nature() {
    return NATURE
  }

  render(context: CanvasRenderingContext2D) {
    var { left, top, width, height } = this.bounds

    context.beginPath()
    this.drawImage(context, DataWrapper.image, left, top, width, height)
  }

  onchange(after: Properties, before: Properties) {
    if ('source' in after) {
      this._wrap()
    }
  }

  _wrap() {
    let { source, propertyName } = this.state

    this.setState('data', {
      [propertyName]: source
    })
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

Component.register('data-wrapper', DataWrapper)
