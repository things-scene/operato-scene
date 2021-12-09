/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

import { Component, Donut, ValueHolder } from '@hatiolab/things-scene';

import { PROPERTIES } from './gauge-properties';

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [
    ...PROPERTIES,
    {
      type: 'number',
      label: 'start-angle',
      name: 'startAngle',
      property: 'startAngle'
    },
    {
      type: 'number',
      label: 'end-angle',
      name: 'endAngle',
      property: 'endAngle'
    },
    {
      type: 'color',
      label: 'text-fill-style',
      name: 'textFillStyle',
      property: 'textFillStyle'
    },
    {
      type: 'color',
      label: 'needle-fill-style',
      name: 'needleFillStyle',
      property: 'needleFillStyle'
    },
    {
      type: 'color',
      label: 'inner-circle-fill-style',
      name: 'innerCircleFillStyle',
      property: 'innerCircleFillStyle'
    },
    {
      type: 'checkbox',
      label: 'in-text',
      name: 'inText',
      property: 'inText'
    }
  ],
  help: 'scene/component/gauge-circle'
}

function drawStepLine(context: CanvasRenderingContext2D, ang: number, rx: number, stepNeedleSize: number) {
  context.rotate(ang)
  context.translate(0, -rx)

  context.fillRect(0, -rx * 0.14, stepNeedleSize, rx * 0.175)
  context.translate(0, rx)
  context.rotate(-ang)
}

function drawSubStepLine(context: CanvasRenderingContext2D, ang: number, rx: number, stepNeedleSize: number) {
  context.rotate(ang)
  context.translate(0, -rx)

  context.fillRect(0, -rx * 0.04, stepNeedleSize, rx * 0.075)
  context.translate(0, rx)
  context.rotate(-ang)
}

function drawStepText(context: CanvasRenderingContext2D, text: string, ang: number, rx: number) {
  context.rotate(ang)
  context.translate(0, -rx * 0.83)
  context.rotate(-ang)

  context.fillText(text, 0, 0)
  context.rotate(ang)
  context.translate(0, rx * 0.83)
  context.rotate(-ang)
}

function drawNeedle(context: CanvasRenderingContext2D, rx: number, ang: number) {
  context.rotate(ang)

  context.beginPath()

  context.moveTo(rx * 0.035, 0) // 중앙 두께

  context.lineTo(0, rx * 0.8) // 끝 점

  context.lineTo(-rx * 0.035, 0) // 중앙 두께

  context.lineTo(-rx * 0.015, -rx * 0.2) // 뒷쪽 두께
  context.lineTo(rx * 0.015, -rx * 0.2) // 뒷쪽 두께

  context.rotate(-ang)
}

export default class GaugeCircle extends ValueHolder(Donut) {
  _draw(context: CanvasRenderingContext2D) {
    var {
      lineWidth = 20,
      startValue,
      endValue,
      step,
      subStep,
      startAngle = 0,
      endAngle = 180,
      fontColor = 'black',
      showStepText = true,
      showStartValue = true,
      showEndValue = true,
      showStepLine = true,
      showSubStep = true,
      inText = true,
      colorStops, // 스텝별 각각 다른 색
      fillStyle,
      textFillStyle = 'black',
      needleFillStyle = 'black',
      innerCircleFillStyle = 'gray',
      stepNeedleSize = 2,
      stepFillStyle,
      stepTextSize,
      cx,
      cy,
      rx,
      ry,
      ratio,
      animFromBase = false
    } = this.model

    startValue = Number(startValue)

    this.animOnValueChange(this.value, animFromBase, startValue)

    const RADIAN = 0.0174533 / Math.PI
    const rxRatio = (rx / 100) * ratio // 원 안에 지워지는 비율을 계산한 rx - ratio의 비율에 따라 크기가 변함
    const ryRatio = (ry / 100) * ratio // 원 안에 지워지는 비율을 계산한 ry - ratio의 비율에 따라 크기가 변함
    const circleSize = (endAngle - startAngle) / 180 // 원의 총 길이. - PI * 2가 원이므로 (360도 = 2, 180도 = 1)
    const totalValue = endValue - startValue // 게이지의 시작과 끝 값의 크기

    startAngle = startAngle * RADIAN - 0.5 //  맨 위쪽을 중심으로 앵글의 범위에 따라 왼쪽으로 넓어짐
    endAngle = endAngle * RADIAN - 0.5 //  맨 위쪽을 중심으로 앵글의 범위에 따라 오른쪽으로 넓어짐

    context.translate(cx, cy)

    ////  메인 게이지 원 그리기  ////
    context.beginPath()

    context.ellipse(
      0,
      0,
      Math.abs(rx),
      Math.abs(ry),
      0,
      startAngle * Math.PI,
      endAngle * Math.PI
    )
    this.drawStroke(context)
    context.ellipse(
      0,
      0,
      Math.abs(rxRatio),
      Math.abs(ryRatio),
      0,
      endAngle * Math.PI,
      startAngle * Math.PI,
      true
    ) // 반대로 그리며 원을 지움.
    // this.drawFill(context)

    context.closePath()

    ////  스텝별 색 칠하기  ////
    if (colorStops) {
      let beforeValue = 0
      let endStepAngle = 0
      context.moveTo(0, 0)

      colorStops.forEach(function (v: {position: number; color: string;}, idx: number, arr: {position: number; color: string;}[]) {
        context.beginPath()

        let value = Math.max(Math.min(v.position - startValue, totalValue), 0) // v.position 범위의 최소값은 0, 최대값은 totalValue가 되야함.
        let startStepAngle = endStepAngle || Math.PI * (startAngle + (circleSize * beforeValue) / totalValue)

        if (idx === arr.length - 1)
          // 마지막값은 무조건 끝까지 채워주도록 한다
          endStepAngle = Math.PI * (startAngle + circleSize)
        else endStepAngle = Math.PI * (startAngle + (circleSize * value) / totalValue)

        if (beforeValue > totalValue || beforeValue > value)
          // 값이 게이지의 최대 값을 넘어가거나 이전 값 보다 현재값이 작으면 다시 그릴 필요 없음
          return false

        context.ellipse(0, 0, Math.abs(rx), Math.abs(ry), 0, startStepAngle, endStepAngle)
        context.ellipse(0, 0, Math.abs(rxRatio), Math.abs(ryRatio), 0, endStepAngle, startStepAngle, true)
        context.fillStyle = v.color
        context.fill()

        beforeValue = value
      })
    }
    context.scale(1, ry / rx)

    ////  바늘 그리기  ////
    context.beginPath()
    let drawingValue = this.animValue
    drawingValue = Math.max(Math.min(drawingValue, endValue), startValue) // 그려지는 값은 startValue보다 작을 수 없고, endValue보다 클 수 없음.

    let ang = Math.PI * ((circleSize * (drawingValue - startValue)) / totalValue + startAngle - 0.5)

    drawNeedle(context, rx, ang)

    context.fillStyle = needleFillStyle
    context.fill()

    ////  중앙 원 그리기  ////
    context.beginPath()
    context.ellipse(0, 0, Math.abs(rx) / 15, Math.abs(rx) / 15, 0, 0, 2 * Math.PI)
    context.fillStyle = innerCircleFillStyle
    context.fill()

    ////  스텝 선 그리기  ////
    context.fillStyle = stepFillStyle
    if (showStepLine) {
      let count = totalValue / step

      // Draw StartValue
      drawStepLine(context, Math.PI * (startAngle + 0.5), rx * 0.8, stepNeedleSize) // 원을 그릴때 PI는 45도 부터 그리지만 angle은 0도부터 틀어서 + 0.5도를 곱해줘야함
      // Draw StepValue
      for (let num = 1; num < count; num++) {
        let ang = Math.PI * ((circleSize / count) * num + startAngle + 0.5)

        drawStepLine(context, ang, rx * 0.8, stepNeedleSize)
      }
      // Draw EndValue
      drawStepLine(context, Math.PI * (endAngle + 0.5), rx * 0.8, stepNeedleSize)
    }

    ////  서브 스탭 그리기  ////
    if (showSubStep) {
      let count = totalValue

      // Draw StepValue
      for (let num = 1; num <= count; num++) {
        if (num % step == 0 || num % subStep != 0) {
          // 메인 스탭과 서브 스탭은 그리지 않음
          continue
        }
        let ang = Math.PI * ((circleSize / count) * num + startAngle + 0.5)

        drawSubStepLine(context, ang, rx * 0.8, stepNeedleSize)
      }
    }

    ////  스텝 텍스트 그리기  ////
    context.fillStyle = textFillStyle
    context.font = (rx * stepTextSize) / 50 + 'px arial'
    context.textBaseline = 'middle'
    context.textAlign = 'center'
    let textLocation = inText ? 0.8 : 1.35

    if (showStartValue) {
      // Draw StartText
      drawStepText(context, startValue, Math.PI * (startAngle + 0.5), rx * textLocation)
    }

    if (showEndValue) {
      // Draw EndText
      drawStepText(context, endValue, Math.PI * (endAngle + 0.5), rx * textLocation)
    }

    if (showStepText) {
      // Draw StepText
      let count = totalValue / step

      for (let num = 1; num < count; num++) {
        let value = startValue + step * num
        let ang = Math.PI * ((circleSize / count) * num + startAngle + 0.5)

        drawStepText(context, value, ang, rx * textLocation)
      }
    }

    context.scale(1, rx / ry)
    context.translate(-cx, -cy)
  }

  contains(x: number, y: number): boolean {
    // 컨테인즈는 Ellipse로 정의함
    var { cx, cy, rx, ry } = this.model

    var normx = (x - cx) / (rx * 2 - 0.5)
    var normy = (y - cy) / (ry * 2 - 0.5)

    return normx * normx + normy * normy < 0.25
  }

  _post_draw(context: CanvasRenderingContext2D) {
    this.drawText(context)
  }

  get nature() {
    return NATURE
  }
}

Component.register('gauge-circle', GaugeCircle)
