import { TinyColor } from '@ctrl/tinycolor'

export function convertConfigure(chart: SceneChart.ChartConfig) {
  if (!chart) return

  var data = chart.data || {}
  var datasets = data.datasets || []
  var options = chart.options || {}
  var scales = options.scales || {}
  var xAxes: Array<SceneChart.ChartXAxe>
  var yAxes: Array<SceneChart.ChartYAxe>
  var scale
  var legend = options.legend || {}
  var tooltips = (options.tooltips = options.tooltips || {})

  var multiAxis = options.multiAxis
  var stacked = false
  var yStacked = [false, false]
  var fontSize = Number(options.defaultFontSize)
  var fontFamily = options.defaultFontFamily
  var fontColor = options.defaultFontColor
  var theme = options.theme

  // backward compatible
  _configureBackwardsCompatible(chart.type, options)

  // setup series configure
  for (let i in datasets) {
    let series = datasets[i]

    if (options.stacked && !series.stack) {
      series.stack = 'A'
    }

    /*
     * TODO from chartjs 2.9, categoryPercentage, barPercentage properties move to dataset.
     * so need to move related properties - categorySpacing, barSpacing should be moved to series.
     */
    if (chart.type == 'bar') {
      let categorySpacing = (scales.xAxes && scales.xAxes[0].categorySpacing) || 0
      let barSpacing = (scales.xAxes && scales.xAxes[0].barSpacing) || 0

      series.categoryPercentage = 1 - categorySpacing || 1
      series.barPercentage = 1 - barSpacing || 0.8
    } else if (chart.type == 'horizontalBar') {
      let categorySpacing = (scales.yAxes && scales.yAxes[0].categorySpacing) || 0
      let barSpacing = (scales.yAxes && scales.yAxes[0].barSpacing) || 0

      series.categoryPercentage = 1 - categorySpacing || 1
      series.barPercentage = 1 - barSpacing || 0.8
    }

    _setSeriesConfigures(series, chart)

    if (!multiAxis) {
      if (series.yAxisID == 'right') series.yAxisID = 'left'
    }
  }

  delete options.stacked

  var leftSeries = datasets.filter(d => d.yAxisID == 'left')
  var rightSeries = datasets.filter(d => d.yAxisID == 'right')

  leftSeries.forEach(s => {
    var filtered = leftSeries.filter(ss => s.stack == ss.stack)
    if (filtered.length > 1) {
      yStacked[0] = true
      return
    }
  })

  rightSeries.forEach(s => {
    var filtered = rightSeries.filter(ss => s.stack == ss.stack)
    if (filtered.length > 1) {
      yStacked[1] = true
      return
    }
  })

  stacked = yStacked[0] || yStacked[1]

  // setup options
  // 1. setup scales
  switch (chart.type) {
    case 'line':
    case 'bar':
    case 'horizontalBar':
      xAxes = scales.xAxes || []
      yAxes = scales.yAxes || []

      if (chart.type == 'horizontalBar') {
        xAxes = scales.yAxes || []
        yAxes = scales.xAxes || []
      }

      // 1-1. setup xAxes
      for (let i in xAxes) {
        let axis = xAxes[i]
        _setStacked(axis, stacked)
        _setScalesFont(axis, {
          fontSize,
          fontFamily
        })
        _setScalesAutoMinMax(axis)
        _setScalesTickRotation(axis)
        _setAxisTitle(axis)
        _setScalesTheme(axis, theme, fontColor)
        _appendTickCallback(axis.ticks)

        axis.gridLines!.display = options.xGridLine
      }

      // 1-2. setup yAxes
      for (let i in yAxes) {
        let axis = yAxes[i]

        //@ts-ignore
        if (i == 1) {
          _setMultiAxis(axis, multiAxis)
        }
        _setStacked(axis, yStacked[i])
        _setScalesFont(axis, {
          fontSize,
          fontFamily
        })
        _setScalesAutoMinMax(axis)
        _setAxisTitle(axis)
        _setScalesTheme(axis, theme, fontColor)
        _appendTickCallback(axis.ticks)

        //@ts-ignore
        if (i == 0) axis.gridLines.display = options.yGridLine

        //@ts-ignore
        if (i == 1) axis.gridLines.display = options.y2ndGridLine
      }

      break
    case 'pie':
    case 'doughnut':
      break
    default:
      scale = options.scale || {}
      _setScalesFont(scale, {
        fontSize,
        fontFamily
      })
      break
  }

  // 2. setup legend
  _setLegendFont(legend, {
    fontSize,
    fontFamily
  })
  legend.labels && (legend.labels.boxWidth = 15)
  _setLegendTheme(legend, theme, fontColor)

  // 3. setup tooltips
  _setTooltipFont(tooltips, {
    fontSize,
    fontFamily
  })
  _setTooltipCallback(tooltips)
}

function _configureBackwardsCompatible(type: string, options: SceneChart.ChartOptions) {
  switch (type) {
    case 'horizontalBar':
      if (!options.scales) options.scales = {}
      break
    case 'radar':
    case 'polarArea':
      if (options.defaultFontColor) {
        options.scale!.ticks!.fontColor = options.defaultFontColor
        if (options.scale.pointLabels) {
          options.scale.pointLabels.fontColor = options.defaultFontColor
        } else {
          options.scale.pointLabels = { fontColor: options.defaultFontColor }
        }
      }
      options.scale!.ticks!.backdropColor = options.fillStyle ? options.fillStyle : '#00ff0000'
      break
    case 'line':
    case 'bar':
      if (!options.scales) options.scales = {}
      if (!options.scales.yAxes) options.scales.yAxes = []

      if (options.scales.yAxes.length === 1) {
        let yAxes = options.scales.yAxes
        yAxes.push({
          position: 'right',
          id: 'right',
          display: options.multiAxis || false,
          gridLines: {
            display: (yAxes[0] && yAxes[0].gridLines && yAxes[0].gridLines.display) || false
          },
          ticks: {
            beginAtZero: false,
            callback: function (value: any, index: number, values: any[]) {
              var returnValue = value
              if (typeof returnValue == 'number') {
                returnValue = returnValue.toLocaleString()
              }

              return returnValue
            }
          }
        })
      }
      break
    case 'pie':
    case 'doughnut':
      break
    default:
      if (!options.scale) options.scale = {}

      break
  }
}

function _setStacked(axis: SceneChart.ChartXAxe, stacked: boolean) {
  axis.stacked = stacked
}

function _setMultiAxis(axis: SceneChart.ChartXAxe, multiAxis: boolean) {
  axis.display = multiAxis
}

function _setAxisTitle(axis: SceneChart.ChartXAxe) {
  if (!axis.scaleLabel) axis.scaleLabel = {}
  axis.scaleLabel.labelString = axis.axisTitle
  axis.scaleLabel.display = axis.axisTitle ? true : false
}

function _setScalesFont(
  axis: SceneChart.ChartXAxe | SceneChart.RadialLinearScale,
  { fontSize, fontFamily }: { fontSize: number; fontFamily: string }
) {
  axis.ticks = axis.ticks ? axis.ticks : {}
  axis.ticks.fontSize = fontSize

  if (fontFamily) {
    axis.ticks.fontFamily = fontFamily
  }

  ;(axis as SceneChart.RadialLinearScale).pointLabels = {
    fontSize,
    fontFamily
  }
}

function _setScalesAutoMinMax(axis: SceneChart.ChartXAxe) {
  axis.ticks = axis.ticks ? axis.ticks : {}

  let autoMin = axis.ticks.autoMin
  let autoMax = axis.ticks.autoMax

  if (autoMin === true) {
    delete axis.ticks.min
  }
  if (autoMax === true) {
    delete axis.ticks.max
  }
}

function _setScalesTickRotation(axis: SceneChart.ChartXAxe) {
  axis.ticks = axis.ticks ? axis.ticks : {}
  // axis.ticks.maxRotation = 0
}

function _setScalesTheme(axis: SceneChart.ChartXAxe, theme: SceneChart.Theme, fontColor: string) {
  var baseColor = _getBaseColorFromTheme(theme)

  axis.gridLines = axis.gridLines ? axis.gridLines : {}
  if (axis.gridLines) {
    axis.gridLines.zeroLineColor = baseColor.clone().setAlpha(0.5).toString()
    axis.gridLines.color = baseColor.clone().setAlpha(0.1).toString()
  }

  axis.ticks = axis.ticks ? axis.ticks : {}
  axis.ticks.fontColor = fontColor ? fontColor : baseColor.clone().setAlpha(0.5).toString()
}

function _setLegendFont(
  legend: SceneChart.ChartLegendOptions,
  { fontFamily, fontSize }: { fontFamily: string; fontSize: number }
) {
  legend.labels = legend.labels ? legend.labels : {}
  legend.labels.fontSize = fontSize
  if (fontFamily) legend.labels.fontFamily = fontFamily
}

function _setLegendTheme(legend: SceneChart.ChartLegendOptions, theme: SceneChart.Theme, fontColor: string) {
  var baseColor = _getBaseColorFromTheme(theme)

  legend.labels = legend.labels ? legend.labels : {}
  legend.labels.fontColor = fontColor ? fontColor : baseColor.clone().setAlpha(0.5).toString()
}

function _getBaseColorFromTheme(theme: SceneChart.Theme) {
  let darkColor = '#000'
  let lightColor = '#fff'

  var baseColor

  switch (theme) {
    case 'light':
      baseColor = lightColor
      break
    case 'dark':
    default:
      baseColor = darkColor
      break
  }

  baseColor = new TinyColor(baseColor)

  return baseColor
}

function _setSeriesConfigures(series: SceneChart.ChartDataSets, chart: SceneChart.ChartConfig) {
  var type = series.type || chart.type
  var stackGroup = `${type} ${series.yAxisID} ${series.stack || series.dataKey}`
  var color = series.color ? series.color : series.backgroundColor

  switch (type) {
    case 'bar':
    case 'horizontalBar':
      series.borderColor = series.backgroundColor = color
      break

    case 'line':
    case 'radar':
      color = series.color ? series.color : series.borderColor
      series.pointBackgroundColor = series.pointBorderColor = series.borderColor = series.backgroundColor = color
      series.pointBorderWidth = (series.borderWidth as number) * 0.5
      series.pointHoverRadius = series.pointRadius
      if (series.fill == undefined) series.fill = false
      break

    default:
      series.borderColor = series.backgroundColor = color
      break
  }

  series.stack = stackGroup
}

function _appendTickCallback(ticks: SceneChart.TickOptions | undefined) {
  if (!ticks) {
    return
  }

  ticks.callback = function (value, index, values) {
    var returnValue
    if (!Number.isNaN(Number(value))) {
      returnValue = Number(value).toLocaleString()
    } else {
      returnValue = value
    }

    if (returnValue) return returnValue
  }
}

function _setTooltipFont(
  tooltips: SceneChart.ChartTooltipOptions,
  { fontSize, fontFamily }: { fontSize: number; fontFamily: string }
) {
  tooltips.titleFontSize = tooltips.bodyFontSize = tooltips.footerFontSize = fontSize
  if (fontFamily) tooltips.titleFontFamily = tooltips.bodyFontFamily = tooltips.footerFontFamily = fontFamily
}

function _setTooltipCallback(tooltips: SceneChart.ChartTooltipOptions) {
  tooltips.callbacks = tooltips.callbacks || {}

  tooltips.intersect = false
  tooltips.mode = 'index'

  tooltips.callbacks.label = function (tooltipItem: SceneChart.ChartTooltipItem, data: SceneChart.ChartData) {
    var value = data.datasets?.[tooltipItem.datasetIndex || 0].data?.[tooltipItem.index || 0]
    var datasetLabel = data.datasets?.[tooltipItem.datasetIndex || 0].label
    var label = datasetLabel || data.labels?.[tooltipItem.index || 0]
    var toNumValue = Number(value)

    if (!isNaN(toNumValue)) {
      value = toNumValue
    }

    var prefix = data.datasets?.[tooltipItem.datasetIndex || 0].valuePrefix || ''
    var suffix = data.datasets?.[tooltipItem.datasetIndex || 0].valueSuffix || ''

    return `${label}: ${prefix + value?.toLocaleString() + suffix}`
  }
}
