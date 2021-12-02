/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

import { Component, ControlHandler, Rect } from '@hatiolab/things-scene'

var controlHandler: ControlHandler = {
  ondragmove: function (point, index, component) {
    var { left, width, height } = component.bounds
    /*
     * point의 좌표는 부모 레이어 기준의 x, y 값이다.
     * 따라서, 도형의 회전을 감안한 좌표로의 변환이 필요하다.
     * Transcoord시에는 point좌표가 부모까지 transcoord되어있는 상태이므로,
     * 컴포넌트자신에 대한 transcoord만 필요하다.(마지막 파라미터를 false로).
     */
    var transcoorded = component.transcoordP2S(point.x, point.y)
    var round = ((transcoorded.x - left) / (width / 2)) * 100

    round = roundSet(round, width, height)

    component.set({ round })
  }
}

function roundSet(round: number, width: number, height: number) {
  var max = width > height ? (height / width) * 100 : 100

  if (round >= max) round = max
  else if (round <= 0) round = 0

  return round
}

export default class HalfRoundrect extends Rect {
  is3dish() {
    return false
  }

  _draw(context: CanvasRenderingContext2D) {
    var { top, left, width, height } = this.bounds
    var round = this.state.round

    context.beginPath()

    round = roundSet(round, width, height)

    if (round > 0) {
      var tmpRound = (round / 100) * (width / 2)

      context.moveTo(left + tmpRound, top)
      context.lineTo(left + width - tmpRound, top)
      context.quadraticCurveTo(left + width, top, left + width, top + tmpRound)

      context.lineTo(left + width, top + height)
      context.lineTo(left, top + height)
      context.lineTo(left, top + tmpRound)

      context.quadraticCurveTo(left, top, left + tmpRound, top)
    } else {
      context.rect(left, top, width, height)
    }

    this.drawFill(context)
    this.drawStroke(context)
  }

  get controls() {
    var { top, left, width, height } = this.bounds
    var round = this.state.round

    round = round == undefined ? 0 : roundSet(round, width, height)

    return [
      {
        x: left + (width / 2) * (round / 100),
        y: top,
        handler: controlHandler
      }
    ]
  }
}

Component.register('half-roundrect', HalfRoundrect)
