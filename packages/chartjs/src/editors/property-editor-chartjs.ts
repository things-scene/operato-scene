import './property-editor-chartjs-hbar'
import './property-editor-chartjs-mixed'
import './property-editor-chartjs-pie'
import './property-editor-chartjs-radar'

import { css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import { OxPropertyEditor, PropertySpec } from '@operato/property-editor'

@customElement('property-editor-chartjs')
export default class ChartJSEditor extends OxPropertyEditor {
  static styles = [
    css`
      :host {
        display: block;
        padding: 5px;
      }

      #chart-type {
        display: grid;
        grid-template-columns: repeat(10, 1fr);
        grid-gap: 5px;
      }

      #chart-type > label {
        box-sizing: border-box;
        grid-column: span 3;

        text-align: right;

        color: var(--primary-text-color);
        font-size: 0.8em;
        line-height: 2;
        text-transform: capitalize;
      }

      #chart-type > input {
        box-sizing: border-box;
        grid-column: span 7;
        border: 1px solid rgba(0, 0, 0, 0.2);
      }
    `
  ]

  editorTemplate(value: any, spec: PropertySpec) {
    return html`
      ${value
        ? html`
            <div id="chart-type">
              <label> <i18n-msg msgid="label.chart-type">Chart Type</i18n-msg> </label>
              <input type="text" .value=${value.type} readonly />
            </div>
          `
        : html``}
      ${!value
        ? html``
        : value.type == 'line'
        ? html` <property-editor-chartjs-mixed .value=${value} fullwidth></property-editor-chartjs-mixed> `
        : value.type == 'horizontalBar'
        ? html` <property-editor-chartjs-hbar .value=${value} fullwidth></property-editor-chartjs-hbar> `
        : value.type == 'bar'
        ? html` <property-editor-chartjs-mixed .value=${value} fullwidth></property-editor-chartjs-mixed> `
        : value.type == 'pie'
        ? html` <property-editor-chartjs-pie .value=${value} fullwidth></property-editor-chartjs-pie> `
        : value.type == 'doughnut'
        ? html` <property-editor-chartjs-pie .value=${value} fullwidth></property-editor-chartjs-pie> `
        : value.type == 'polarArea'
        ? html` <property-editor-chartjs-pie .value=${value} fullwidth></property-editor-chartjs-pie> `
        : value.type == 'radar'
        ? html` <property-editor-chartjs-radar .value=${value} fullwidth></property-editor-chartjs-radar> `
        : html``}
    `
  }
}
