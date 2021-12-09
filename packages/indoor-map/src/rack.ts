/*
 * Copyright © HatioLab Inc. All rights reserved.
 */
import { Component, RectPath } from '@hatiolab/things-scene';

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [{
    type: 'number',
    label: 'depth',
    name: 'depth',
    property: 'depth'
  }, {
    type: 'number',
    label: 'shelves',
    name: 'shelves',
    property: 'shelves'
  }, {
    type: 'string',
    label: 'location-pattern',
    name: 'locPattern',
    placeholder: '{z}{s}-{u}-{sh}',
    property: 'locPattern'
  }, {
    type: 'string',
    label: 'zone',
    name: 'zone',
    property: 'zone'
  }, {
    type: 'string',
    label: 'section',
    name: 'section',
    property: 'section'
  }, {
    type: 'string',
    label: 'unit',
    name: 'unit',
    property: 'unit'
  }, {
    type: 'string',
    label: 'shelf-pattern',
    name: 'shelfPattern',
    placeholder: '#',
    property: 'shelfPattern'
  }],
  help: 'scene/component/rack'
}

export default class Rack extends RectPath(Component) {

  is3dish() {
    return true
  }

  draw(context: CanvasRenderingContext2D) {

    var {
      left,
      top,
      width,
      height,
      strokeStyle,
      lineWidth,
      fillStyle,
      alpha = 1,
    } = this.model;

    context.beginPath()
    context.rect(left, top, width, height)
    context.strokeStyle = strokeStyle
    context.lineWidth = lineWidth
    context.globalAlpha = alpha * 0.4
    context.stroke()

    context.beginPath()
    context.rect(left + width * 0.15, top + height * 0.15, width * 0.7, height * 0.7)
    context.fillStyle = fillStyle
    context.globalAlpha = alpha * 0.5
    context.fill()

    context.beginPath()
    context.moveTo(left, top)
    context.lineTo(left + width, top + height)
    context.moveTo(left, top + height)
    context.lineTo(left + width, top)
    context.strokeStyle = strokeStyle
    context.lineWidth = lineWidth
    context.globalAlpha = alpha * 0.4
    context.stroke()
  }

  get nature() {
    return NATURE
  }

  get hasTextProperty() {
    return false;
  }

}

Component.register('rack', Rack)
