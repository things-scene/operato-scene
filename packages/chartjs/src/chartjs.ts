import './ox-chart'

import cloneDeep from 'lodash/cloneDeep'

/*
 * Copyright © HatioLab Inc. All rights reserved.
 */
import { Component, error, HTMLOverlayElement, Properties } from '@hatiolab/things-scene'

import { OxChart } from './ox-chart'

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [
    {
      type: 'chartjs',
      label: '',
      name: 'chart'
    }
  ],
  'value-property': 'data',
  help: 'scene/component/chartjs'
}

export default class ChartJS extends HTMLOverlayElement {
  private _isChartChanged = false
  private _isDataChanged = false

  get nature() {
    return NATURE
  }

  get hasTextProperty() {
    return false
  }

  get tagName() {
    return 'ox-chart'
  }

  isShadowable() {
    return false
  }

  createElement() {
    super.createElement()

    var { width, height } = this.bounds
    var element = this.element as OxChart
    var data = this.data

    element.width = width
    element.height = height

    this._setChartConfig(element)
    element.data = data
  }

  /* component.property => element.property */
  setElementProperties(element: OxChart) {
    this.set('lineWidth', 0) // border 표현이 자연스럽게 바뀌면 지울것.

    var { chart: chartConfig } = this.state
    var { width, height } = this.bounds
    var data = this.data

    try {
      element.width = width
      element.height = height

      if (chartConfig && this._isChartChanged) {
        this._setChartConfig(element)
        this._isChartChanged = false
      }

      if (this._isDataChanged) {
        element.data = data
        this._isDataChanged = false
      }
    } catch (e) {
      error(e)
    }
  }

  _setChartConfig(element: OxChart) {
    var { chart: chartConfig, fontSize = 12, fontFamily, fontColor, shadow } = this.state
    var { left = 0, top = 0, blurSize = 0, color = 'transparent' } = shadow || {}

    const fontOption = {
      defaultFontSize: fontSize,
      defaultFontFamily: fontFamily,
      defaultFontColor: fontColor
    }

    const shadowOption = {
      shadowOffsetX: left,
      shadowOffsetY: top,
      shadowBlur: blurSize,
      shadowColor: color
    }

    var cloneChartConf = cloneDeep(chartConfig)

    cloneChartConf.options = {
      ...cloneChartConf.options,
      ...fontOption
    }

    cloneChartConf.data.datasets = cloneChartConf.data.datasets.map((dataset: any) => {
      return {
        ...dataset,
        ...shadowOption
      }
    })

    element.options = cloneChartConf
  }

  onchange(after: Properties, before: Properties) {
    this._isChartChanged = false

    if ('chart' in after || 'fontSize' in after || 'fontFamily' in after || 'fontColor' in after || 'shadow' in after)
      this._isChartChanged = true

    super.onchange(after, before)
  }

  onchangeData(data: any) {
    this._isDataChanged = true
  }
}

Component.register('chartjs', ChartJS)
