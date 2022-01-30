import { Component, ComponentNature, RectPath, Shape } from '@hatiolab/things-scene'

/*
 * Copyright © HatioLab Inc. All rights reserved.
 */
import MixinRoller from './mixin-conveyor'

const NATURE: ComponentNature = {
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
  help: 'scene/component/conveyor'
}

export default class Conveyor extends MixinRoller(RectPath(Shape)) {
  get nature() {
    return NATURE
  }

  render(ctx: CanvasRenderingContext2D) {
    var { width, height, left, top, animated = false } = this.model

    animated && this.animOnState()

    ctx.beginPath()
    ctx.rect(left, top, width, height)
  }

  is3dish() {
    return false
  }
}

Component.register('conveyor', Conveyor as any)
Component.register('conveyor-belt', Conveyor as any)
