/*
 * Copyright © HatioLab Inc. All rights reserved.
 */
import { Class, Component, ValueHolder } from '@hatiolab/things-scene'

const FILL_STYLES = ['#ccc', '#afd0f1', '#ffba00', '#e9746b'] // IDLE, RUN, WARN, ERROR
const STROKE_STYLES = ['#999', '#87b1db', '#d96f21', '#a73928'] // IDLE, RUN, WARN, ERROR

export default (superclass: Class) => {
  var A = class extends ValueHolder(superclass) {
    animOnState() {
      if (this.value !== 1 || this.disposed) return

      var self = this

      var alpha = Math.floor(Math.random() * 100)
      if (alpha < 10) alpha = 2
      else if (alpha > 90) alpha = 1
      else alpha = 0

      requestAnimationFrame(function () {
        self.delta('tilt', alpha)
        self.clearCache('fillStyle')
        self.invalidate()
      })
    }

    _draw_pattern(ctx: CanvasRenderingContext2D) {
      var { width, height, left, top } = this.bounds

      var { tilt = 0, wheelSize = 3 } = this.model

      tilt += this.delta('tilt') || 0
      tilt %= 3
      tilt -= 1

      var color = FILL_STYLES[this.value] || FILL_STYLES[0]
      var stroke = STROKE_STYLES[this.value] || STROKE_STYLES[0]
      var lineWidth = 1

      var pattern_size = wheelSize * 10 || Math.min(width / 5, height / 5)

      ctx.beginPath()
      ctx.fillStyle = color
      ctx.rect(left, top, width, height)
      ctx.fill()

      ctx.strokeStyle = stroke
      ctx.lineWidth = lineWidth

      this._draw_wheel(ctx, pattern_size, tilt)
    }

    _draw_circle(ctx: CanvasRenderingContext2D, size: number) {
      var { width, height } = this.bounds

      var offsetX = 0,
        offsetY = 0

      while (offsetY < height) {
        offsetX = 0
        while (offsetX < width) {
          ctx.moveTo(offsetX + size / 2 + size / 3, offsetY + size / 2)
          ctx.ellipse(offsetX + size / 2, offsetY + size / 2, size / 3, size / 3, 0, 0, 2 * Math.PI, false)

          offsetX += size
        }
        offsetY += size
      }

      ctx.stroke()
    }

    _draw_inner(ctx: CanvasRenderingContext2D, size: number, tilt: number) {
      var { width, height } = this.bounds

      var offsetX = 0,
        offsetY = 0

      while (offsetY < height) {
        offsetX = 0
        while (offsetX < width) {
          ctx.translate(offsetX, offsetY)
          ctx.beginPath()
          ctx.translate(size / 2, size / 2)
          ctx.rotate(tilt)

          ctx.moveTo(-size / 6, -size / 6)
          ctx.lineTo(-size / 6, size / 6)
          ctx.moveTo(size / 6, -size / 6)
          ctx.lineTo(size / 6, size / 6)

          ctx.stroke()
          ctx.rotate(-tilt)
          ctx.translate(-size / 2, -size / 2)
          ctx.translate(-offsetX, -offsetY)

          offsetX += size
        }
        offsetY += size
      }
    }

    _draw_wheel(ctx: CanvasRenderingContext2D, size: number, tilt: number) {
      var { left, top } = this.bounds

      ctx.beginPath()
      ctx.translate(left, top)
      this._draw_circle(ctx, size)
      this._draw_inner(ctx, size, tilt)
    }
  }

  Component.memoize(A.prototype, 'fillStyle', false)

  return A
}
