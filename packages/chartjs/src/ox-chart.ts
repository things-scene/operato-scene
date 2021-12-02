/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

import 'chartjs-plugin-datalabels'
import 'chartjs-plugin-style'

import { Chart } from 'chart.js'
import { html, LitElement, PropertyValues } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'

import { convertConfigure, OxChartConfig } from './config-converter'
import DataBinderPlugin from './plugins/chartjs-plugin-data-binder'

Chart.plugins.register(DataBinderPlugin)

@customElement('ox-chart')
export class OxChart extends LitElement {
  @property({ type: Number }) width!: number
  @property({ type: Number }) height!: number
  @property({ type: Object }) options!: Chart.ChartConfiguration
  @property({ type: Object }) data!: Chart.ChartData

  private _initialized?: boolean
  private _chart?: Chart

  @query('canvas') _canvas!: HTMLCanvasElement

  firstUpdated() {
    this.initChart()
  }

  render() {
    return html` <canvas></canvas> `
  }

  updated(changes: PropertyValues<this>) {
    if (changes.has('width') || changes.has('height')) {
      this.updateChartSize()
    }

    if (changes.has('options')) {
      this.updateChartConfig()
    }

    if (changes.has('data')) {
      this._chart!.data.rawData = this.data
      this._chart!.update(0)
    }
  }

  initChart() {
    const { data, options, type } = this.options
    options!.maintainAspectRatio = false

    this.attachPluginOptions(options)
    convertConfigure(this.options as OxChartConfig)

    this._chart = new Chart(this._canvas, {
      type,
      data,
      options
    })

    this.updateChartSize()

    this._initialized = true
  }

  updateChartSize() {
    const width = Math.floor(this.width)
    const height = Math.floor(this.height)

    this._canvas.style.width = `${width}px`
    this._canvas.style.height = `${height}px`

    const _ = () => {
      if (this._canvas.offsetWidth == 0 || this._canvas.offsetHeight == 0) {
        requestAnimationFrame(_)
      } else {
        /*
        주의 : chart.resize() 내에서 pixel ratio를 감안해서, canvas 의 width, height를 설정하기때문에,
        별도 처리가 필요하지 않다.
        */
        this._chart!.resize()
      }
    }

    requestAnimationFrame(_)
  }

  updateChartConfig() {
    if (!this._chart) return

    const { data, options, type } = this.options
    options!.maintainAspectRatio = false

    this.attachPluginOptions(options)
    convertConfigure(this.options as OxChartConfig)

    this._chart.type = type
    this._chart.data = data
    this._chart.options = options
    this._chart.data.rawData = this.data
    this._chart.update(0)
  }

  attachPluginOptions(options: Chart.ChartOptions = {}) {
    var pluginOptions = (options.plugins = options.plugins || {})
    this.attachDatalabelPluginOptions(pluginOptions)
  }

  attachDatalabelPluginOptions(pluginOptions: Chart.ChartPluginsOptions = {}) {
    var datalabelsOption = (pluginOptions.datalabels = pluginOptions.datalabels || {})
    datalabelsOption['display'] = function (context) {
      return !!context.dataset.displayValue
    }

    datalabelsOption['anchor'] = function (context) {
      return context.dataset.dataLabelAnchor || 'center'
    }

    datalabelsOption['color'] = function (context) {
      return context.dataset.defaultFontColor || '#000'
    }

    datalabelsOption['font'] = function (context) {
      return {
        size: context.dataset.defaultFontSize
      }
    }

    datalabelsOption['clamp'] = true

    datalabelsOption['formatter'] = function (value, context) {
      var prefix = context.dataset.valuePrefix || ''
      var suffix = context.dataset.valueSuffix || ''
      if (value == undefined) return value

      var stringValue = String(value)
      return prefix + stringValue.toLocaleString() + suffix
    }
  }
}
