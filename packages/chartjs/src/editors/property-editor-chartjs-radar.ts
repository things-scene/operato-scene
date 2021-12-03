import '@polymer/iron-icon/iron-icon'
import '@polymer/paper-button/paper-button'
import '@polymer/paper-icon-button/paper-icon-button'
import '@polymer/paper-tabs/paper-tabs'

import PropertyEditorChartJSMultiSeriesAbstract from './property-editor-chartjs-multi-series-abstract'
import { customElement } from 'lit/decorators.js'
import { html } from 'lit'

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

  editorTemplate(props: any) {
    return html`
      <legend><i18n-msg msgid="label.series">Series</i18n-msg></legend>

      <div fullwidth>${this.multiSeriesTabTemplate()}</div>

      <legend><i18n-msg msgid="label.axes">Axes</i18n-msg></legend>

      <label> <i18n-msg msgid="label.data-key">Data Key</i18n-msg> </label>
      <input type="text" value-key="labelDataKey" .value=${this.labelDataKey} />
    `
  }
}
