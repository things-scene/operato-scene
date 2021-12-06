import { Component, Properties, RectPath, Shape, error } from '@hatiolab/things-scene'

/*
 * Copyright © HatioLab Inc. All rights reserved.
 */
import format from './libs/format'

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [
    {
      type: 'number',
      label: 'due',
      name: 'due',
      placeholder: 'timestamp'
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
  'value-property': 'due',
  help: 'scene/component/duetimer'
}

export default class DueTimer extends RectPath(Shape) {
  static get nature() {
    return NATURE
  }

  ready() {
    if (!this.app.isViewMode) {
      return
    }

    var { due = 0 } = this.state

    this.timeout = Math.max(Math.round((due - Date.now()) / 1000), 0)
  }

  onchange(after: Properties) {
    if ('due' in after) {
      this.timeout = Math.max(Math.round((this.due - Date.now()) / 1000), 0)
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

  get due() {
    return Number(this.getState('due') || 0)
  }

  set due(due) {
    this.setState('due', due)
  }

  get countdown() {
    const due = this.due
    const now = Date.now()

    return Math.max(Math.round((due - now) / 1000), 0)
  }
}

Component.register('duetimer', DueTimer)
