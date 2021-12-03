import { LitElement, html } from 'lit'
import { TinyColor, random as randomColor } from '@ctrl/tinycolor'

import { PropertyEditorChartJSStyles } from './property-editor-chartjs-styles'
import { property } from 'lit/decorators.js'

export default class PropertyEditorChartJSAbstract extends LitElement {
  static styles = [PropertyEditorChartJSStyles]

  @property({ type: Object }) value: any = {}
  @property({ type: Number }) currentSeriesIndex: number = 0

  render() {
    return html`
      <legend><i18n-msg msgid="label.chart">Chart</i18n-msg></legend>

      <label> <i18n-msg msgid="label.theme">theme</i18n-msg> </label>
      <select value-key="theme" class="select-content" .value=${this.theme}>
        <option value="dark">dark</option>
        <option value="light">light</option>
      </select>

      <input type="checkbox" value-key="display" .checked=${this.display} />
      <label> <i18n-msg msgid="label.legend">Legend</i18n-msg> </label>

      ${this.display
        ? html`
            <label> <i18n-msg msgid="label.position">Position</i18n-msg> </label>
            <select value-key="position" class="select-content" .value=${this.position}>
              <option value="top">top</option>
              <option value="right">right</option>
              <option value="bottom">bottom</option>
              <option value="left">left</option>
            </select>
          `
        : html``}
      ${this.editorTemplate(this)}
    `
  }

  firstUpdated() {
    this.renderRoot.addEventListener('change', this.onValuesChanged.bind(this))
  }

  displayValueTemplate() {
    return html`
      <label> <i18n-msg msgid="label.value-prefix">Value Prefix</i18n-msg> </label>
      <input type="text" value-key="series.valuePrefix" .value=${this.series.valuePrefix || ''} />

      <label> <i18n-msg msgid="label.value-suffix">Value suffix</i18n-msg> </label>
      <input type="text" value-key="series.valueSuffix" .value=${this.series.valueSuffix || ''} />

      <input type="checkbox" value-key="series.displayValue" .checked=${this.series.displayValue || false} />
      <label> <i18n-msg msgid="label.value-display">Value Display</i18n-msg> </label>

      ${this.series.displayValue
        ? html`
            <label> <i18n-msg msgid="label.font-color">Font Color</i18n-msg> </label>
            <things-editor-color
              value-key="series.defaultFontColor"
              .value=${this.series.defaultFontColor || '#000'}
            ></things-editor-color>
            <label> <i18n-msg msgid="label.font-size">Font Size</i18n-msg> </label>
            <input type="number" value-key="series.defaultFontSize" .value=${this.series.defaultFontSize || 10} />
            <label> <i18n-msg msgid="label.position">Position</i18n-msg> </label>
            <select value-key="series.dataLabelAnchor" .value=${this.series.dataLabelAnchor || 'center'}>
              <option value="start">Start</option>
              <option value="center" selected>Center</option>
              <option value="end">End</option>
            </select>
          `
        : html``}
    `
  }

  editorTemplate(props: any) {
    return html``
  }

  get data() {
    return this.value.data
  }

  set data(data) {
    this.value.data = data
  }

  get datasets() {
    if (!this.data.datasets) this.data.datasets = []

    return this.data.datasets
  }

  set datasets(datasets) {
    this.datasets = datasets
  }

  get series() {
    if (!this.datasets[this.currentSeriesIndex]) this.datasets[this.currentSeriesIndex] = {}
    return this.datasets[this.currentSeriesIndex]
  }

  set series(series) {
    !this.data ? (this.data = { dataset: [series] }) : (this.datasets[this.currentSeriesIndex] = series)
  }

  set dataKey(key) {
    this.series.dataKey = key
  }

  get dataKey() {
    return this.series.dataKey
  }

  get legend() {
    !this.value.options && (this.value.options = {})
    return this.value.options.legend
  }

  set legend(legend) {
    this.value.options.legend = legend
  }

  get theme() {
    return this.value.options && this.value.options.theme
  }

  set theme(theme) {
    !this.value.options && (this.value.options = {})
    this.value.options.theme = theme
  }

  get scales() {
    return this.value.options.scales
  }

  set scales(scales) {
    !this.value.options && (this.value.options = {})
    this.value.options.scales = scales
  }

  get display() {
    return this.legend && this.legend.display
  }

  set display(display) {
    this.legend.display = display
  }

  get position() {
    return this.legend.position
  }

  set position(position) {
    this.legend.position = position
  }

  get stacked() {
    return this.value.options.stacked
  }

  set stacked(stacked) {
    this.value.options.stacked = stacked
  }

  get labelDataKey() {
    return this.data && this.data.labelDataKey
  }

  set labelDataKey(labelDataKey) {
    this.data.labelDataKey = labelDataKey
  }

  set options(options) {
    this.value.options = options
  }

  get options() {
    return this.value.options
  }

  onValuesChanged(e: Event) {
    var element = e.target as HTMLInputElement
    var key = element.getAttribute('value-key')
    var value = element.value

    if (!key) {
      return
    }

    value = this._getElementValue(element)

    var attrs = key.split('.')
    var attr = attrs.shift() || ''
    var variable = this

    while (attrs.length > 0) {
      //@ts-ignore
      variable = variable[attr]
      attr = attrs.shift() || ''
    }

    //@ts-ignore
    variable[attr] = value

    this.dispatchEvent(new CustomEvent('change', { bubbles: true, composed: true }))
    this.requestUpdate()
  }

  onTapAddTab(e: Event) {
    if (!this.value.data.datasets) return

    var lastSeriesIndex = this.value.data.datasets.length
    var chartType = this.series.type || this.value.type
    var lastSeriesColor = new TinyColor(this.datasets[lastSeriesIndex - 1].backgroundColor)

    var seriesModel = this._getSeriesModel({
      chartType,
      datasetsLength: lastSeriesIndex,
      lastSeriesColor
    })

    this.value.data.datasets.push(seriesModel)
    this.dispatchEvent(new CustomEvent('change', { bubbles: true, composed: true }))
    this.currentSeriesIndex = lastSeriesIndex
  }

  onTapRemoveCurrentTab(e: Event) {
    if (!this.value.data.datasets) return

    var currIndex = this.currentSeriesIndex
    this.value.data.datasets.splice(currIndex, 1)

    currIndex--

    if (currIndex < 0) currIndex = 0

    this.dispatchEvent(new CustomEvent('change', { bubbles: true, composed: true }))
    this.currentSeriesIndex = currIndex

    this.requestUpdate()
  }

  _getSeriesModel({
    chartType,
    datasetsLength,
    lastSeriesColor
  }: {
    chartType: any
    datasetsLength: number
    lastSeriesColor: TinyColor
  }) {
    var addSeriesOption: any = {
      label: `series ${datasetsLength + 1}`,
      data: [],
      borderWidth: 1,
      dataKey: '',
      yAxisID: 'left',
      color: randomColor({
        hue: lastSeriesColor as any
      }).toRgbString()
    }

    addSeriesOption.type = addSeriesOption.chartType = chartType
    return addSeriesOption
  }

  _getElementValue(element: HTMLElement) {
    switch (element.tagName) {
      case 'INPUT':
        switch ((element as HTMLInputElement).type) {
          case 'checkbox':
            return (element as HTMLInputElement).checked
          case 'number':
            return Number((element as HTMLInputElement).value) || 0
          case 'text':
            return String((element as HTMLInputElement).value)
        }

      case 'PAPER-BUTTON':
        return (element as any).active

      case 'PAPER-LISTBOX':
        return (element as any).selected

      case 'THINGS-EDITOR-MULTIPLE-COLOR':
        return (element as any).values

      case 'THINGS-EDITOR-ANGLE-INPUT':
        return Number((element as any).radian) || 0

      default:
        return (element as any).value
    }
  }
}
