/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

import {
  Component,
  RectPath,
  Shape,
  ValueHolder,
} from '@hatiolab/things-scene';

import { PROPERTIES } from './gauge-properties';

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [
    ...PROPERTIES,
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
      type: 'number',
      label: 'needle-size',
      name: 'needleSize',
      property: 'needleSize'
    }
  ],
  help: 'scene/component/gauge-vertical'
}

export default class GaugeVertical extends ValueHolder(RectPath(Shape)) {
  _draw(context: CanvasRenderingContext2D) {
    var {
      startValue,
      endValue,
      step,
      subStep,
      colorStops,
      needleFillStyle,
      stepFillStyle,
      textFillStyle,
      needleSize,
      stepNeedleSize,
      stepTextSize,
      showStepText = true,
      showStartValue = true,
      showEndValue = true,
      showStepLine = true,
      showSubStep = true,
      width,
      height,
      top,
      left,
      animFromBase = false
    } = this.model

    startValue = Number(startValue)

    this.animOnValueChange(this.value, animFromBase, startValue)

    const totalValue = endValue - startValue // 게이지의 시작과 끝 값의 크기

    context.translate(left, top) // top과 left의 좌표에 영향을 받지 않기 위해 transalate를 한다음 모든 탑과 레프트의 좌표를 0으로 줌

    ////  메인 막대 그리기  ////
    context.beginPath()

    context.rect(0, 0, width, height)

    this.drawFill(context)
    this.drawStroke(context)
    context.closePath()

    ////  스텝별 색 칠하기  ////
    if (colorStops) {
      let beforeValue = 0
      colorStops.forEach(function (v: {position: number; color: string;}, idx: number, arr: {position: number; color: string;}[]) {
        context.beginPath()

        let value = Math.max(Math.min(v.position - startValue, totalValue), 0) // v.position 범위의 최소값은 0, 최대값은 totalValue가 되야함.
        let startStepPosition = (height * beforeValue) / totalValue
        let endStepPosition

        // console.log(startStepPosition + (height * value / totalValue));
        if (idx === arr.length - 1 || startStepPosition + (height * value) / totalValue)
          // 배열의 마지막 값이거나 중간 시작값 + 그려지는 값이 height 를 넘을 경우는 무조건 끝까지 채워주도록 한다
          endStepPosition = height - startStepPosition
        else endStepPosition = height - (height * value) / totalValue

        if (beforeValue > totalValue || beforeValue > value)
          // 값이 게이지의 최대 값을 넘어가거나 이전 값 보다 현재값이 작으면 다시 그릴 필요 없음
          return false

        context.rect(0, height - startStepPosition, width, -endStepPosition)

        context.fillStyle = v.color
        context.fill()
        beforeValue = value
      })
    }

    ////  바늘 그리기  ////
    context.beginPath()
    let drawingValue = this.animValue
    drawingValue = Math.max(Math.min(drawingValue, endValue), startValue) // 그려지는 값은 startValue보다 작을 수 없고, endValue보다 클 수 없음.
    let position = height - ((drawingValue - startValue) / totalValue) * height

    needleSize *= 4
    context.moveTo(width * 1.05, position)
    context.lineTo(width * 1.05 + needleSize, position + needleSize / 2)
    context.lineTo(width * 1.05 + needleSize, position - needleSize / 2)

    context.fillStyle = needleFillStyle
    context.fill()
    context.closePath()

    ////  스텝 선 그리기  ////
    context.fillStyle = stepFillStyle
    if (showStepLine) {
      let count = totalValue / step

      // Draw StartValue
      context.fillRect(0, height, height * 0.06, stepNeedleSize)
      // Draw StepValue
      for (let num = 1; num < count; num++) {
        let locate = (height / count) * num

        context.fillRect(0, locate, height * 0.06, stepNeedleSize)
      }
      // Draw EndValue
      context.fillRect(0, 0, height * 0.06, stepNeedleSize)
    }

    ////  서브 스탭 그리기  ////
    if (showSubStep) {
      let count = totalValue

      // Draw StartValue
      context.fillRect(0, 0, height * 0.027, stepNeedleSize)

      // Draw StepValue
      for (let num = 1; num <= count; num++) {
        if (num % step == 0 || num % subStep != 0) {
          // 메인 스탭과 서브 스탭은 그리지 않음
          continue
        }
        let locate = (height / count) * num
        context.fillRect(0, locate, height * 0.027, stepNeedleSize)
      }
    }

    ////  스텝 텍스트 그리기  ////
    let fontSize = (height * stepTextSize) / 150
    context.fillStyle = textFillStyle
    context.font = fontSize + 'px arial'
    context.textBaseline = 'middle'
    context.textAlign = 'center'
    if (showStartValue) {
      // Draw StartText
      context.fillText(startValue, -fontSize, height)
    }

    if (showEndValue) {
      // Draw EndText
      context.fillText(endValue, -fontSize, 0)
    }

    if (showStepText) {
      // Draw StepText
      let count = totalValue / step

      for (let num = 1; num < count; num++) {
        let value = startValue + Number(step) * num
        let locate = height - (height / count) * num

        context.fillText(value, -fontSize, locate)
      }
    }

    context.translate(-left, -top)
  }

  _post_draw(context: CanvasRenderingContext2D) {
    this.drawText(context)
  }

  get nature() {
    return NATURE
  }
}

Component.register('gauge-vertical', GaugeVertical)
