/*
 * Copyright © HatioLab Inc. All rights reserved.
 */
import { Component, Container, Layout, RectPath } from '@hatiolab/things-scene'

import Table from './table'

type Style = { [style: string]: any }

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [
    {
      type: 'editor-table',
      label: '',
      name: '',
      property: {
        merge: true,
        split: true
      }
    },
    {
      type: 'string',
      label: 'data-key',
      name: 'dataKey',
      property: 'dataKey'
    },
    {
      type: 'number',
      label: 'data-index',
      name: 'dataIndex',
      property: 'dataIndex'
    }
  ],
  help: 'scene/component/table-cell'
}

const EMPTY_BORDER = {}

function isBottomMost(idx: number, rows: number, columns: number, components: Component[]) {
  return idx >= (rows - 1) * columns || (components[idx + columns] && components[idx + columns].hidden)
}

function isRightMost(idx: number, rows: number, columns: number, components: Component[]) {
  return (idx + 1) % columns == 0 || (components[idx + 1] && components[idx + 1].hidden)
}

/**
 * 1. 스타일을 상속 받아야 함. (cascade-style)
 * 2. 스타일을 동적처리할 수 있음. (로직처리)
 * 3. 데이타를 받을 수 있음.
 */
export default class TableCell extends RectPath(Component) {
  // export default class TableCell extends Container {

  // get layout() {
  //   return Layout.get(this.get('layout') || 'card')
  // }

  get nature() {
    return NATURE
  }

  set merged(merged) {
    this.set('merged', !!merged)
    if (merged) this.set('text', '')
  }

  get merged() {
    return this.get('merged')
  }

  set rowspan(rowspan) {
    this.set('rowspan', rowspan)
  }

  get rowspan() {
    return this.get('rowspan')
  }

  set colspan(colspan) {
    this.set('colspan', colspan)
  }

  get colspan() {
    return this.get('colspan')
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
    var { left, top, width, height } = this.model

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
    var rows = parent.rows || 1

    this._drawBorder(context, left, top, left + width, top, border.top)
    this._drawBorder(context, left, top + height, left, top, border.left)
    if (isRightMost(idx, rows, columns, parent.components))
      this._drawBorder(context, left + width, top, left + width, top + height, border.right)
    if (isBottomMost(idx, rows, columns, parent.components))
      this._drawBorder(context, left + width, top + height, left, top + height, border.bottom)
  }
}

Component.register('table-cell', TableCell)
