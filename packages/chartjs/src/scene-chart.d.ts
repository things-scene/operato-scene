declare class SceneChart extends Chart {
  type: Chart.ChartType | string
  data: SceneChart.ChartData
}

declare namespace SceneChart {
  type Theme = 'light' | 'dark'
  type Data = { [key: string]: any }
  type DataSeries = Array<Data>

  interface TickOptions extends Chart.TickOptions {
    autoMax?: boolean
    autoMin?: boolean
  }

  interface ChartScales {
    type?: Chart.ScaleType | string
    display?: boolean
    position?: Chart.PositionType | string
    gridLines?: GridLineOptions
    scaleLabel?: Chart.ScaleTitleOptions
    ticks?: TickOptions
    xAxes?: ChartXAxe[]
    yAxes?: ChartYAxe[]
  }

  interface ChartDataSets extends Chart.ChartDataSets {
    color: string
    dataKey: string
    valuePrefix: string
    valueSuffix: string
    displayValue: string
    dataLabelAnchor: string
    defaultFontColor: string
    defaultFontSize: number
    highlight: {
      color: string
      condition: string
    }
  }

  interface ChartData {
    labels?: Array<string | string[]>
    datasets?: ChartDataSets[]
    rawData?: any
    labelDataKey?: string
  }

  interface ChartXAxe extends Chart.ChartXAxe {
    categorySpacing?: number
    barSpacing?: number
    ticks?: TickOptions
    axisTitle?: string
  }
  interface ChartYAxe extends ChartXAxe {}

  interface GridLineOptions extends Chart.GridLineOptions {}
  interface ChartLegendOptions extends Chart.ChartLegendOptions {}
  interface ChartTooltipOptions extends Chart.ChartTooltipOptions {}
  interface ChartTooltipItem extends Chart.ChartTooltipItem {}
  interface RadialLinearScale extends Chart.RadialLinearScale {}
  interface ChartPluginsOptions extends Chart.ChartPluginsOptions {}
  // datalabels?: DataLabelsPluginOptions
  // [plugin: string]: any
  // }

  // interface ChartOptions {
  //   responsive?: boolean
  //   responsiveAnimationDuration?: number
  //   aspectRatio?: number
  //   maintainAspectRatio?: boolean
  //   events?: string[]
  //   legendCallback?(chart: Chart): string
  //   onHover?(this: Chart, event: MouseEvent, activeElements: Array<{}>): any
  //   onClick?(event?: MouseEvent, activeElements?: Array<{}>): any
  //   onResize?(this: Chart, newSize: ChartSize): void
  //   title?: ChartTitleOptions
  //   legend?: ChartLegendOptions
  //   tooltips?: ChartTooltipOptions
  //   hover?: ChartHoverOptions
  //   animation?: ChartAnimationOptions
  //   elements?: ChartElementsOptions
  //   layout?: ChartLayoutOptions
  //   scale?: RadialLinearScale
  //   scales?: ChartScales | LinearScale | LogarithmicScale | TimeScale
  //   showLines?: boolean
  //   spanGaps?: boolean
  //   cutoutPercentage?: number
  //   circumference?: number
  //   rotation?: number
  //   devicePixelRatio?: number
  //   plugins?: ChartPluginsOptions
  // }

  interface Context {
    dataset: ChartDataSets
  }

  interface DataLabelsPluginOptions {
    display: (context: Context) => true | false | 'auto'
    anchor: (context: Context) => 'center' | 'start' | 'end' | string
    color: (context: Context) => string
    font: (context: Context) => { size: number }
    clamp: boolean
    formatter: (value: any, context: Context) => string
  }

  interface ChartOptions extends Chart.ChartOptions {
    scales: ChartScales
    scale: RadialLinearScale
    legend: ChartLegendOptions
    tooltips: ChartTooltipOptions
    multiAxis: boolean
    defaultFontSize: number | string
    defaultFontFamily: string
    defaultFontColor: string
    theme: Theme
    stacked?: boolean
    xGridLine: boolean
    fillStyle: string
    maintainAspectRatio?: boolean
    // plugins: ChartPluginsOptions

    // responsive?: boolean
    // responsiveAnimationDuration?: number
    // aspectRatio?: number
    // events?: string[]
    // legendCallback?(chart: Chart): string
    // onHover?(this: Chart, event: MouseEvent, activeElements: Array<{}>): any
    // onClick?(event?: MouseEvent, activeElements?: Array<{}>): any
    // onResize?(this: Chart, newSize: ChartSize): void
    // title?: ChartTitleOptions
    // hover?: ChartHoverOptions
    // animation?: ChartAnimationOptions
    // elements?: ChartElementsOptions
    // layout?: ChartLayoutOptions
    // // scale?: RadialLinearScale
    // // scales?: ChartScales | LinearScale | LogarithmicScale | TimeScale
    // showLines?: boolean
    // spanGaps?: boolean
    // cutoutPercentage?: number
    // circumference?: number
    // rotation?: number
    // devicePixelRatio?: number
  }

  interface ChartConfig {
    type: string
    data: ChartData
    options: ChartOptions
  }
}
