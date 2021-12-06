/*
 * Copyright © HatioLab Inc. All rights reserved.
 */
import { Class, Component, ValueHolder } from '@hatiolab/things-scene'

const FILL_STYLES = ['rgba(0,0,0,.4)', 'rgba(175,208,241,.7)', 'rgba(255,186,0,.7)', 'rgba(198,50,40,.7)'] // IDLE, RUN, WARN, ERROR
const STROKE_STYLES = ['rgba(0,0,0,.7)', 'rgba(175,208,241,1)', 'rgba(255,186,0,1)', 'rgba(198,50,40,1)'] // IDLE, RUN, WARN, ERROR

function pattern(component: any) {
  var { width, height } = component.bounds

  var color = FILL_STYLES[component.value] || FILL_STYLES[0]
  var stroke = STROKE_STYLES[component.value] || STROKE_STYLES[0]
  var lineWidth = 1

  if (!component._scanner_pattern) component._scanner_pattern = document.createElement('canvas')

  component._scanner_pattern.width = width
  component._scanner_pattern.height = height

  var ctx = component._scanner_pattern.getContext('2d')

  var radius = width / 10
  var left = 0
  var top = 0

  // outer box
  ctx.beginPath()
  ctx.fillStyle = color
  ctx.strokeStyle = stroke

  ctx.rect(0, 0, width, height)
  ctx.fill()
  // ctx.stroke();

  // inner box
  radius = width / 40
  left = width / 4
  top = height / 4

  ctx.beginPath()
  ctx.fillStyle = 'rgba(0,0,0,.7)'
  ctx.strokeStyle = null

  ctx.moveTo(left + radius, top)
  ctx.lineTo(left + width / 2 - radius, top)
  ctx.quadraticCurveTo(left + width / 2, top, left + width / 2, top + radius)
  ctx.lineTo(left + width / 2, top + height / 2 - radius)
  ctx.quadraticCurveTo(left + width / 2, top + height / 2, left + width / 2 - radius, top + height / 2)
  ctx.lineTo(left + radius, top + height / 2)
  ctx.quadraticCurveTo(left, top + height / 2, left, top + height / 2 - radius)
  ctx.lineTo(left, top + radius)
  ctx.quadraticCurveTo(left, top, left + radius, top)
  ctx.fill()

  // barcode
  left = left + width * 0.1
  top = top + height * 0.05

  var offsetTop = 0
  var barcodeAreaWidth = width * 0.3
  var barcodeAreaHeight = height * 0.4

  ctx.beginPath()
  ctx.fillStyle = '#fff'

  ctx.moveTo(left, top)
  ctx.rect(left, top + offsetTop, barcodeAreaWidth, (barcodeAreaHeight / 14) * 0.9)
  offsetTop = (barcodeAreaHeight / 14) * 2
  ctx.rect(left, top + offsetTop, barcodeAreaWidth, (barcodeAreaHeight / 14) * 0.3)
  offsetTop = (barcodeAreaHeight / 14) * 4
  ctx.rect(left, top + offsetTop, barcodeAreaWidth, (barcodeAreaHeight / 14) * 0.4)
  offsetTop = (barcodeAreaHeight / 14) * 6
  ctx.rect(left, top + offsetTop, barcodeAreaWidth, (barcodeAreaHeight / 14) * 0.8)
  offsetTop = (barcodeAreaHeight / 14) * 8
  ctx.rect(left, top + offsetTop, barcodeAreaWidth, (barcodeAreaHeight / 14) * 0.6)
  offsetTop = (barcodeAreaHeight / 14) * 10
  ctx.rect(left, top + offsetTop, barcodeAreaWidth, barcodeAreaHeight / 14)
  offsetTop = (barcodeAreaHeight / 14) * 11
  ctx.rect(left, top + offsetTop, barcodeAreaWidth, barcodeAreaHeight / 14)
  offsetTop = (barcodeAreaHeight / 14) * 14
  ctx.rect(left, top + offsetTop, barcodeAreaWidth, (barcodeAreaHeight / 14) * 0.3)

  ctx.fill()

  // lazer
  ctx.beginPath()
  left = width / 2
  top = height * 0.1

  ctx.strokeStyle = '#cc3300'
  ctx.lineWidth = 1
  ctx.moveTo(left, top)
  ctx.lineTo(left, height * 0.9)

  ctx.stroke()

  return component._scanner_pattern
}

export default (superclass: Class) => {
  var A = class extends ValueHolder(superclass) {
    dispose() {
      super.dispose()
      delete this._scanner_pattern
    }

    get fillStyle() {
      return {
        image: pattern(this),
        offsetX: 0,
        offsetY: 0,
        type: 'pattern',
        fitPattern: true
      }
    }
  }

  Component.memoize(A.prototype, 'fillStyle', false)

  return A
}
