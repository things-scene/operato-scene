import { Properties } from '@hatiolab/things-scene'
import PropertyEditorChartJSAbstract from './property-editor-chartjs-abstract'
import { customElement } from 'lit/decorators.js'
import { html } from 'lit'

@customElement('property-editor-chartjs-pie')
export default class PropertyEditorChartJSPie extends PropertyEditorChartJSAbstract {
  static styles = PropertyEditorChartJSAbstract.styles

  constructor() {
    super()

    this.value = {
      options: {
        legend: {}
      },
      data: {
        datasets: []
      }
    }

    this.currentSeriesIndex = 0
  }

  get valuePrefix() {
    return this.series.valuePrefix
  }

  set valuePrefix(valuePrefix) {
    this.series.valuePrefix = valuePrefix
  }

  get valueSuffix() {
    return this.series.valueSuffix
  }

  set valueSuffix(valueSuffix) {
    this.series.valueSuffix = valueSuffix
  }

  get color() {
    return this.series.color || this.series.backgroundColor
  }

  set color(color) {
    this.series.color = color
    delete this.series.backgroundColor
  }

  get displayValue() {
    return this.series.displayValue
  }

  set displayValue(displayValue) {
    this.series.displayValue = displayValue
  }

  editorTemplate(props: Properties) {
    return html`
      <legend><i18n-msg msgid="label.series">Series</i18n-msg></legend>

      <label> <i18n-msg msgid="label.data-key">Data Key</i18n-msg> </label>
      <input type="text" value-key="dataKey" .value=${this.series.dataKey} />

      <label> <i18n-msg msgid="label.color">color</i18n-msg> </label>
      <ox-input-multiple-colors value-key="color" .value=${this.color}></ox-input-multiple-colors>

      ${this.displayValueTemplate()}

      <legend><i18n-msg msgid="label.axes">Axes</i18n-msg></legend>

      <label> <i18n-msg msgid="label.data-key">Data Key</i18n-msg> </label>
      <input type="text" value-key="labelDataKey" .value=${this.labelDataKey} />
    `
  }
}
