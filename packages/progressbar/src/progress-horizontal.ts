/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

import { Component, RectPath, Shape, ValueHolder } from '@hatiolab/things-scene'

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [
    {
      type: 'string',
      label: 'value',
      name: 'value',
      property: 'value'
    },
    {
      type: 'color',
      label: 'background-color',
      name: 'backgroundColor',
      property: 'backgroundColor'
    },
    {
      type: 'checkbox',
      label: 'reverse',
      name: 'reverse',
      property: 'reverse'
    },
    {
      type: 'checkbox',
      label: 'anim-from-base',
      name: 'animFromBase'
    }
  ],
  help: 'scene/component/progress-horizontal'
}

export default class ProgressHorizontal extends ValueHolder(RectPath(Shape)) {
  _draw(context: CanvasRenderingContext2D) {
    var { top, left, height, width, backgroundColor = 'transparent', reverse, animFromBase = false } = this.model

    this.animOnValueChange(this.value, animFromBase, 0)

    // background의 색상
    context.beginPath()
    context.rect(left, top, width, height)

    context.fillStyle = backgroundColor
    context.fill()

    // value의 색상
    context.beginPath()

    var drawValue = width - (width * Math.max(Math.min(this.animValue, 100), 0)) / 100
    drawValue = Math.max(Math.min(drawValue, width), 0) // DrawValue도 높이보다 작거나 커지지 말아야 한다.

    // 그리는 값의 방향을 지정
    if (reverse) context.rect(left, top, width - drawValue, height)
    else context.rect(left + drawValue, top, width - drawValue, height)

    this.drawFill(context)

    context.closePath()

    context.beginPath()

    context.rect(left, top, width, height)
  }

  _post_draw(context: CanvasRenderingContext2D) {
    this.drawStroke(context)
    this.drawText(context)
  }

  // get controls() {}

  get nature() {
    return NATURE
  }
}

Component.register('progress-horizontal', ProgressHorizontal)
