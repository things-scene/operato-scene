import { Component, Donut, POSITION, Rect } from '@hatiolab/things-scene'

/*
 * Copyright © HatioLab Inc. All rights reserved.
 */
import MixinRoller from './mixin-conveyor'

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [
    {
      type: 'select',
      label: 'conveyor-type',
      name: 'conveyorType',
      property: {
        options: [
          {
            display: 'Roller',
            value: 0
          },
          {
            display: 'Belt',
            value: 1
          }
        ]
      }
    },
    {
      type: 'angle',
      label: 'start-angle',
      name: 'startAngle'
    },
    {
      type: 'angle',
      label: 'end-angle',
      name: 'endAngle'
    },
    {
      type: 'number',
      label: 'ratio',
      name: 'ratio'
    },
    {
      type: 'number',
      label: 'roll-width',
      name: 'rollWidth'
    },
    {
      type: 'number',
      label: 'value',
      name: 'value'
    },
    {
      type: 'checkbox',
      label: 'animation',
      name: 'animated'
    }
  ],
  help: 'scene/component/conveyor-join'
}

const RADIAN = 0.0174533 / Math.PI

var controlHandler = {
  ondragmove: function (point: POSITION, index: number, component: Component) {
    var { cx, rx } = component.model

    var transcoorded = component.transcoordP2S(point.x, point.y)

    var ratio = ((transcoorded.x - cx) / rx) * 100

    ratio = ratio >= 100 || ratio <= -100 ? 100 : Math.abs(ratio)

    component.set({ ratio })
  }
}

var antiClockWiseControlHandler = {
  ondragmove: function (point: POSITION, index: number, component: Component) {
    var { cx, cy } = component.model

    var transcoorded = component.transcoordP2S(point.x, point.y)

    var theta = Math.atan2(-(transcoorded.y - cy), transcoorded.x - cx)

    if (theta > 0) if (theta <= Math.PI / 2) theta = Math.PI / 2
    if (theta < 0) if (theta >= -Math.PI / 2) theta = -Math.PI / 2

    var startAngle = -theta + Math.PI / 2

    component.set({ startAngle })
  }
}

var clockwiseControlHandler = {
  ondragmove: function (point: POSITION, index: number, component: Component) {
    var { cx, cy } = component.model

    var transcoorded = component.transcoordP2S(point.x, point.y)

    var theta = Math.atan2(-(transcoorded.y - cy), transcoorded.x - cx)

    if (theta > 0) if (theta >= Math.PI / 2) theta = Math.PI / 2
    if (theta < 0) if (theta <= -Math.PI / 2) theta = -Math.PI / 2

    var endAngle = -theta + Math.PI / 2

    component.set({ endAngle })
  }
}

export default class ConveyorJoin extends MixinRoller(Donut) {
  get nature() {
    return NATURE
  }

  is3dish() {
    return false
  }

  render(ctx: CanvasRenderingContext2D) {
    var { ratio = 50, cx, cy, rx, ry, startAngle = 0, endAngle = Math.PI / 2, animated = false } = this.model

    animated && this.animOnState()

    ctx.beginPath()

    startAngle -= Math.PI / 2
    endAngle -= Math.PI / 2

    ctx.ellipse(cx, cy, Math.abs(rx), Math.abs(ry), 0, startAngle, endAngle)

    // ctx.moveTo(cx + (rx / 100) * ratio ,cy);
    // 맨 마지막 속성이 true면 원의 범위만큼 공백이 됨

    ctx.ellipse(cx, cy, Math.abs((rx / 100) * ratio), Math.abs((ry / 100) * ratio), 0, endAngle, startAngle, true)

    ctx.lineTo(rx * Math.cos(startAngle) + cx, rx * Math.sin(startAngle) + cy)
  }

  get controls() {
    var { cx, cy, rx, ratio, startAngle, endAngle } = this.model

    var controls = []

    controls.push({
      x: cx + ((rx + (rx * ratio) / 100) / 2) * Math.sin(startAngle),
      y: cy - ((rx + (rx * ratio) / 100) / 2) * Math.cos(startAngle),
      handler: antiClockWiseControlHandler
    })

    controls.push({
      x: cx + ((rx + (rx * ratio) / 100) / 2) * Math.sin(endAngle),
      y: cy - ((rx + (rx * ratio) / 100) / 2) * Math.cos(endAngle),
      handler: clockwiseControlHandler
    })

    controls.push({
      x: cx + (rx / 100) * ratio,
      y: cy,
      handler: controlHandler
    })

    return controls
  }
}

Component.register('conveyor-join', ConveyorJoin as any)
