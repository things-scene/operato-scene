import { Component, Properties, RectPath, Shape } from '@hatiolab/things-scene'

/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [
    {
      type: 'string',
      label: 'accessor',
      name: 'accessor'
    }
  ],
  'value-property': 'source',
  help: 'scene/component/accessor'
}

const SELF = function (o: any) {
  return o
}

function buildAccessor(accessor: string) {
  if (!accessor) return SELF

  var accessors = String(accessor)
    .trim()
    .replace(/\[(\w+)\]/g, '.$1')
    .replace(/^\./, '')
    .split('.')
    .filter(accessor => !!accessor.trim())

  return accessors.length > 0
    ? function (o: any) {
        return accessors.reduce((o, accessor) => (o ? o[accessor] : undefined), o)
      }
    : SELF
}

export default class DataAccessor extends RectPath(Shape) {
  static _image: HTMLImageElement
  static get image() {
    if (!DataAccessor._image) {
      DataAccessor._image = new Image()
      DataAccessor._image.src = new URL('../icons/symbol-data-accessor.png', import.meta.url).href
    }

    return DataAccessor._image
  }

  get nature() {
    return NATURE
  }

  _accessorFunc?: (o: any) => any
  get accessorFunc() {
    if (!this._accessorFunc) {
      this._accessorFunc = buildAccessor(this.getState('accessor'))
    }

    return this._accessorFunc
  }

  render(context: CanvasRenderingContext2D) {
    var { left, top, width, height } = this.bounds

    context.beginPath()
    this.drawImage(context, DataAccessor.image, left, top, width, height)
  }

  onchange(after: Properties, before: Properties) {
    if (after.hasOwnProperty('accessor')) {
      delete this._accessorFunc
      this.setState('data', this.accessorFunc(this.getState('source')))
    } else if (after.hasOwnProperty('source')) {
      this.setState('data', this.accessorFunc(this.getState('source')))
    }
  }

  get accessor() {
    return this.getState('accessor')
  }

  set accessor(accessor) {
    this.setState('accessor', accessor)
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

Component.register('data-accessor', DataAccessor)
