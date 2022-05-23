/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

import { Component, ComponentNature, Properties, RectPath, Shape } from '@hatiolab/things-scene'

import format from './libs/format'

const NATURE: ComponentNature = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [
    {
      type: 'number',
      label: 'days',
      name: 'days',
      placeholder: 'days'
    },
    {
      type: 'number',
      label: 'hours',
      name: 'hours',
      placeholder: 'hours'
    },
    {
      type: 'number',
      label: 'minutes',
      name: 'minutes',
      placeholder: 'minutes'
    },
    {
      type: 'number',
      label: 'seconds',
      name: 'seconds',
      placeholder: 'seconds'
    },
    {
      type: 'string',
      label: 'format-run',
      name: 'format-run',
      placeholder: 'hh:mm:ss'
    },
    {
      type: 'string',
      label: 'format-stop',
      name: 'format-stop',
      placeholder: '--:--:--'
    },
    {
      type: 'color',
      label: 'background-color',
      name: 'backgroundColor',
      property: 'backgroundColor'
    }
  ],
  'value-property': 'timeout',
  help: 'scene/component/timer'
}

export default class Timer extends RectPath(Shape) {
  private _due?: number

  get nature() {
    return NATURE
  }

  ready() {
    if (!this.app.isViewMode) {
      return
    }

    var { days = 0, hours = 0, minutes = 0, seconds = 0 } = this.state

    this.timeout = days * 86400 + hours * 3600 + minutes * 60 + seconds
  }

  onchange(after: Properties) {
    if ('timeout' in after) {
      this._due = Date.now() + this.timeout * 1000
      this.counting()
    }
  }

  counting() {
    requestAnimationFrame(() => {
      const countdown = this.countdown

      if (countdown > 0) {
        this.set('data', format(countdown, this.getState('format-run')))

        setTimeout(() => {
          this.counting()
        }, 1000)
      } else {
        this.set('data', this.getState('format-stop'))
      }
    })
  }

  render(context: CanvasRenderingContext2D) {
    var { top, left, height, width, backgroundColor = 'transparent' } = this.model

    // background의 색상
    context.beginPath()
    context.rect(left, top, width, height)

    context.fillStyle = backgroundColor
    context.fill()

    // value의 색상
    context.beginPath()

    var progress = (this.countdown / this.timeout) * 100

    if (!isNaN(progress)) {
      progress = width - (width * progress) / 100
      progress = Math.max(Math.min(progress, width), 0)

      context.rect(left, top, progress, height)
      this.drawFill(context)

      context.beginPath()
    }

    // stroke
    context.rect(left, top, width, height)
  }

  postrender(context: CanvasRenderingContext2D) {
    this.drawStroke(context)
    this.drawText(context)
  }

  get timeout() {
    return Number(this.getState('timeout') || 0)
  }

  set timeout(timeout) {
    this.setState('timeout', Number(timeout) || 0)
  }

  get countdown() {
    const timeout = this.timeout
    if (!timeout || timeout < 0) {
      return 0
    }

    const due = this._due || 0
    const now = Date.now()

    return Math.max(Math.round((due - now) / 1000), 0)
  }
}

Component.register('timer', Timer)
