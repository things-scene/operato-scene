/*
 * Copyright © HatioLab Inc. All rights reserved.
 */
import { Component, ComponentNature, RectPath, Style } from '@hatiolab/things-scene'

import { Table } from '../'

const NATURE: ComponentNature = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [
    {
      type: 'editor-table',
      label: '',
      name: '',
      property: {
        merge: false,
        split: false
      }
    }
  ],
  help: 'scene/component/data-cell'
}

export default class DataCell extends RectPath(Component) {
  get nature() {
    return NATURE
  }

  _drawBorder(context: CanvasRenderingContext2D, x: number, y: number, to_x: number, to_y: number, style: Style) {
    if (style && style.strokeStyle && style.lineWidth && style.lineDash) {
      context.beginPath()
      context.moveTo(x, y)
      context.lineTo(to_x, to_y)
      Component.drawStroke(context, style)
    }
  }

  _draw(context: CanvasRenderingContext2D) {
    var { left, top, width, height } = this.bounds

    var border = this.model.border || {}

    // Cell 채우기.
    context.beginPath()
    context.lineWidth = 0
    context.rect(left, top, width, height)
    this.drawFill(context)

    // Border 그리기
    var parent = this.parent as Table
    var idx = parent.components.indexOf(this)
    var columns = parent.columns || 1

    this._drawBorder(context, left, top, left + width, top, border.top)
    this._drawBorder(context, left, top + height, left, top, border.left)
    if ((idx + 1) % columns == 0) {
      /* if this filed is right most, draw right side border. */
      this._drawBorder(context, left + width, top, left + width, top + height, border.right)
    }
    this._drawBorder(context, left + width, top + height, left, top + height, border.bottom)
  }
}

Component.register('data-cell', DataCell)
