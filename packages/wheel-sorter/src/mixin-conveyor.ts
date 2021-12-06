/*
 * Copyright © HatioLab Inc. All rights reserved.
 */
import { Class, Component, ValueHolder } from '@hatiolab/things-scene'

const TYPE_ROLLER = 0
const TYPE_BELT = 1

const FILL_STYLES = ['#ccc', '#afd0f1', '#afd0f1', '#ffba00', '#e9746b'] // IDLE, RUN, RUN(REVERSE), WARN, ERROR
const STROKE_STYLES = ['#999', '#87b1db', '#87b1db', '#d96f21', '#a73928'] // IDLE, RUN, RUN(REVERSE), WARN, ERROR

type RollerPattern = {
  width: number
  height: number
}

function pattern_for_belt_type(component: any) {
  var { height } = component.bounds

  var { rollWidth = 10 } = component.model

  var width = Math.max(rollWidth, 1)

  var color = FILL_STYLES[component.value] || FILL_STYLES[0]
  var stroke = STROKE_STYLES[component.value] || STROKE_STYLES[0]
  var lineWidth = 1

  if (!component._roller_pattern) component._roller_pattern = document.createElement('canvas')

  component._roller_pattern.width = width
  component._roller_pattern.height = height

  var context = component._roller_pattern.getContext('2d')

  context.beginPath()
  context.fillStyle = color
  context.strokeStyle = stroke
  context.lineWidth = lineWidth

  context.moveTo(0, 0)
  context.lineTo(width, 0)
  context.lineTo(width, height)
  context.lineTo(0, height)
  context.lineTo(0, 0)
  context.fill()

  context.beginPath()

  context.globalAlpha = 0.2

  var x_for_belt = (component._step || 0) % width
  if (component.value == 2) x_for_belt = width - x_for_belt

  context.moveTo(x_for_belt, height)
  context.lineTo(x_for_belt, 0)

  context.stroke()

  return component._roller_pattern
}

function pattern_for_roller_type(component: any) {
  var { height } = component.bounds

  var { rollWidth = 10, animated } = component.model

  // var modelWidth = component.model.width;

  var width = Math.max(rollWidth, 1)

  var color = FILL_STYLES[component.value] || FILL_STYLES[0]
  var stroke = STROKE_STYLES[component.value] || STROKE_STYLES[0]
  var lineWidth = Math.min(1, width / 10)

  width += lineWidth * 2

  if (!component._roller_pattern) component._roller_pattern = document.createElement('canvas')

  var gap = Math.floor((width * 2) / 3)

  // while (Math.round(modelWidth - width) % (width + gap) > gap) {
  //   gap++
  //   console.log(gap, Math.round(modelWidth - width) % (width + gap))
  // }

  component._roller_pattern.width = width + gap
  component._roller_pattern.height = height

  var context = component._roller_pattern.getContext('2d')

  context.beginPath()
  context.fillStyle = color
  context.strokeStyle = stroke
  context.lineWidth = lineWidth

  context.ellipse(lineWidth + width / 2, height - width / 4 - lineWidth, width / 2, width / 4, 0, 0, Math.PI)

  context.moveTo(lineWidth, height - width / 4)
  context.lineTo(lineWidth, width / 4)

  context.ellipse(lineWidth + width / 2, width / 4 + lineWidth, width / 2, width / 4, 0, Math.PI, 0)

  context.lineTo(lineWidth + width, height - width / 4)

  context.fill()
  context.stroke()

  context.globalAlpha = 0.2

  context.lineWidth = width / 3

  if (animated) {
    var x_for_roll = component._step % width
    if (component.value == 2) x_for_roll = width - x_for_roll

    context.moveTo(x_for_roll, height - width / 4)
    context.lineTo(x_for_roll, width / 4)

    context.stroke()
  }

  return component._roller_pattern
}

const patterns = [pattern_for_roller_type, pattern_for_belt_type]

export default (superclass: Class) => {
  var A = class extends ValueHolder(superclass) {
    dispose() {
      super.dispose()
      delete this._roller_pattern
    }

    animOnState() {
      if ((this.value !== 1 && this.value !== 2) || this.disposed) return

      if (!this._step || this._step > 40000) this._step = this.value == 0

      this._step++

      var self = this

      requestAnimationFrame(function () {
        self.clearCache('fillStyle')
        self.invalidate()
      })
    }

    get conveyorType() {
      var conveyorType = this.get('conveyorType')
      if (conveyorType != TYPE_BELT && conveyorType != TYPE_ROLLER) conveyorType = TYPE_ROLLER
      return conveyorType
    }

    get fillStyle() {
      return {
        image: patterns[this.conveyorType](this),
        offsetX: 0,
        offsetY: 0,
        type: 'pattern'
      }
    }
  }

  Component.memoize(A.prototype, 'fillStyle', false)
  Component.memoize(A.prototype, 'conveyorType', false)

  return A
}
