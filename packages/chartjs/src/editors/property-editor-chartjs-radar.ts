import { html } from 'lit'
import { customElement } from 'lit/decorators.js'

import { Properties } from '@hatiolab/things-scene'

import PropertyEditorChartJSMultiSeriesAbstract from './property-editor-chartjs-multi-series-abstract'

@customElement('property-editor-chartjs-radar')
export default class PropertyEditorChartJSRadar extends PropertyEditorChartJSMultiSeriesAbstract {
  static styles = PropertyEditorChartJSMultiSeriesAbstract.styles

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
  }

  editorTemplate(props: Properties) {
    return html`
      <legend><i18n-msg msgid="label.series">Series</i18n-msg></legend>

      <div fullwidth>${this.multiSeriesTabTemplate()}</div>

      <legend><i18n-msg msgid="label.axes">Axes</i18n-msg></legend>

      <label> <i18n-msg msgid="label.data-key">Data Key</i18n-msg> </label>
      <input type="text" value-key="labelDataKey" .value=${this.labelDataKey} />
    `
  }
}
