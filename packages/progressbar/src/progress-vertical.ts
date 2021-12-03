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
      label: 'anim-from-base',
      name: 'animFromBase'
    }
  ],
  help: 'scene/component/progress-vertical'
}

export default class ProgressVertical extends ValueHolder(RectPath(Shape)) {
  _draw(context: CanvasRenderingContext2D) {
    var { top, left, height, width, backgroundColor = 'transparent', animFromBase = false } = this.model

    this.animOnValueChange(this.value, animFromBase, 0)

    // background의 색상
    context.beginPath()
    context.rect(left, top, width, height)

    context.fillStyle = backgroundColor
    context.fill()

    // value의 색상
    context.beginPath()

    var drawValue = height - (height * Math.max(Math.min(this.animValue, 100), 0)) / 100
    drawValue = Math.max(Math.min(drawValue, height), 0) // DrawValue도 높이보다 작거나 커지지 말아야 한다.
    context.rect(left, top + drawValue, width, height - drawValue)

    this.drawFill(context)

    context.closePath()

    context.beginPath()

    context.rect(left, top, width, height)
  }

  _post_draw(context: CanvasRenderingContext2D) {
    this.drawStroke(context)
    this.drawText(context)
  }

  get nature() {
    return NATURE
  }
}

Component.register('progress-vertical', ProgressVertical)
