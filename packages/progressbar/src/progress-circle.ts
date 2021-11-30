/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

import { Component, Ellipse, ValueHolder } from '@hatiolab/things-scene'

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [
    {
      type: 'string',
      label: 'value',
      name: 'value'
    },
    {
      type: 'number',
      label: 'start-angle',
      name: 'startAngle'
    },
    {
      type: 'number',
      label: 'end-angle',
      name: 'endAngle'
    },
    {
      type: 'color',
      label: 'blank-stroke-style',
      name: 'blankStrokeStyle'
    },
    {
      type: 'checkbox',
      label: 'packman-style',
      name: 'packmanStyle'
    },
    {
      type: 'checkbox',
      label: 'anim-from-base',
      name: 'animFromBase'
    }
  ],
  help: 'scene/component/progress-circle'
}

export default class ProgressCircle extends ValueHolder(Ellipse) {
  _draw(context: CanvasRenderingContext2D) {
    var {
      startAngle = 0,
      endAngle = 360,
      lineWidth = 20,
      blankStrokeStyle,
      cx,
      cy,
      rx,
      ry,
      packmanStyle = false,
      animFromBase = false
    } = this.model

    this.animOnValueChange(this.value, animFromBase, 0)

    const RADIAN = 0.0174533 / Math.PI

    context.beginPath()
    this.drawStroke(context)
    // Angle마다 '-90'와 '-0.5 * Math.PI'가 있는 이유는 0도를 시계의 12시 방향으로 맞추기 위함.
    var startAngleToRadian = (startAngle - 90) * RADIAN * Math.PI
    var endAngleToRadian = (endAngle - 90) * RADIAN * Math.PI

    //// / 바깥쪽 원 그리기  ////
    context.strokeStyle = blankStrokeStyle
    context.ellipse(cx, cy, Math.abs(rx), Math.abs(ry), 0, startAngleToRadian, endAngleToRadian)

    context.lineWidth = lineWidth
    context.stroke()

    var percent = Math.min(Math.max(this.animValue / 100, 0), 100)

    context.beginPath()
    if (packmanStyle) {
      context.ellipse(
        cx,
        cy,
        Math.abs(rx),
        Math.abs(ry),
        0,
        startAngleToRadian,
        startAngleToRadian + (endAngleToRadian - startAngleToRadian) * percent
      )
      context.lineTo(cx, cy)
    } else {
      context.ellipse(cx, cy, Math.abs(rx), Math.abs(ry), 0, startAngleToRadian, endAngleToRadian)
    }
    this.drawFill(context)

    context.closePath()

    context.beginPath()

    ////  채워지는 원 그리기  ////

    context.ellipse(
      cx,
      cy,
      Math.abs(rx),
      Math.abs(ry),
      0,
      startAngleToRadian,
      startAngleToRadian + (endAngleToRadian - startAngleToRadian) * percent
    )

    this.drawStroke(context)
  }

  _post_draw(context: CanvasRenderingContext2D) {
    this.drawText(context)
  }

  get nature() {
    return NATURE
  }
}

Component.register('progress-circle', ProgressCircle)
