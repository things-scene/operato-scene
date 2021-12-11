import '@polymer/iron-icon'
import '@polymer/iron-icons'
import '@polymer/paper-icon-button'
import '@polymer/paper-tabs'
import './property-editor-chartjs-hbar'
import './property-editor-chartjs-mixed'
import './property-editor-chartjs-pie'
import './property-editor-chartjs-radar'

import { css, html } from 'lit'

import { OxPropertyEditor } from '@operato/property-editor'
import { Properties } from '@hatiolab/things-scene'
import { customElement } from 'lit/decorators'

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

  editorTemplate(props: Properties) {
    return html`
      ${props.value
        ? html`
            <div id="chart-type">
              <label> <i18n-msg msgid="label.chart-type">Chart Type</i18n-msg> </label>
              <input type="text" .value=${props.value.type} readonly />
            </div>
          `
        : html``}
      ${!props.value
        ? html``
        : props.value.type == 'line'
        ? html` <property-editor-chartjs-mixed .value=${props.value} fullwidth></property-editor-chartjs-mixed> `
        : props.value.type == 'horizontalBar'
        ? html` <property-editor-chartjs-hbar .value=${props.value} fullwidth></property-editor-chartjs-hbar> `
        : props.value.type == 'bar'
        ? html` <property-editor-chartjs-mixed .value=${props.value} fullwidth></property-editor-chartjs-mixed> `
        : props.value.type == 'pie'
        ? html` <property-editor-chartjs-pie .value=${props.value} fullwidth></property-editor-chartjs-pie> `
        : props.value.type == 'doughnut'
        ? html` <property-editor-chartjs-pie .value=${props.value} fullwidth></property-editor-chartjs-pie> `
        : props.value.type == 'polarArea'
        ? html` <property-editor-chartjs-pie .value=${props.value} fullwidth></property-editor-chartjs-pie> `
        : props.value.type == 'radar'
        ? html` <property-editor-chartjs-radar .value=${props.value} fullwidth></property-editor-chartjs-radar> `
        : html``}
    `
  }
}
