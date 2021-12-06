/**
 * @license Copyright © HatioLab Inc. All rights reserved.
 */

import { LitElement, PropertyValues, css, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

@customElement('editor-legend-status')
class EditorLegendStatus extends LitElement {
  static styles = [
    css`
      :host {
        font-size: 0.8em;
        display: grid;
        grid-template-columns: repeat(10, 1fr);
        grid-gap: 5px;
      }

      :host > * {
        order: 2;
        grid-column: 4 / -1;
      }

      :host > legend {
        order: 1;
        grid-column: 1 / -1;
        font-size: 11px;
        color: rgb(228, 108, 46);
        font-weight: bold;
        text-transform: capitalize;
        padding: 5px 0px 0px 5px;
      }

      :host > label {
        grid-column: 1 / 4;
        text-align: right;
        color: var(--primary-text-color);
      }

      div[data-record] input {
        width: 20%;
      }
      :host > table {
        grid-column: 1 / -1;
      }
      table input {
        width: 25px;
        margin: 3px 0 2px 0;
        padding: 3px;
        font-size: 12px;
      }
      table td span {
        padding: 5px 0 0 0;
      }
      table td things-editor-color {
        width: 81px;
        height: 25px;
      }
      table td button {
        margin-left: 0;
      }
      table th {
        background-color: rgba(0, 0, 0, 0.1);
        padding: 2px 0;
        text-align: center;
      }

      table tr > th:first-child {
        width: 40px;
      }

      table tr > th:nth-child(2) {
        width: 85px;
      }

      table tr > th:nth-child(4) {
        width: 30px;
      }

      table *.things-editor-legend-status {
        float: none !important;
      }
      table td {
        text-align: center;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      }
      table tr.stock-new {
        background-color: rgba(179, 145, 117, 0.3);
      }
      table td input[data-description] {
        width: 100%;
        box-sizing: border-box;
      }
    `
  ]

  @property({ type: Object }) value: any

  @state() private _statusField?: string
  @state() private _defaultColor?: string
  @state() private _ranges: any[] = []

  private boundOnChange?: any
  private _changingNow: boolean = false

  render() {
    return html`
      <legend>
        <i18n-msg msgid="label.status">Status</i18n-msg>
      </legend>

      <label class="stock-field">
        <i18n-msg msgid="label.field">Field</i18n-msg>
      </label>
      <input
        type="text"
        .value=${this._statusField || ''}
        @change=${(e: Event) => {
          this._statusField = (e.target as HTMLInputElement).value
        }}
      />
      <label class="default-color">
        <i18n-msg msgid="label.default-color">Default Color</i18n-msg>
      </label>
      <things-editor-color
        name="default-color"
        .value=${this._defaultColor || ''}
        placeholder="default color"
        @change=${(e: Event) => {
          this._defaultColor = (e.target as HTMLInputElement).value
        }}
      ></things-editor-color>

      <table>
        <tr>
          <th>
            Min &le; <br />Field<br />
            &lt; Max
          </th>
          <th>color</th>
          <th>disp. text</th>
          <th></th>
        </tr>
        ${this._ranges.map(
          item => html`
            <tr data-record>
              <td>
                <input type="text" data-min placeholder="min" .value="${item.min}" />
                <span>~</span>
                <input type="text" data-max placeholder="max" .value="${item.max}" />
              </td>
              <td>
                <things-editor-color data-color .value="${item.color}" placeholder="color"></things-editor-color>
              </td>
              <td>
                <input type="text" data-description .value="${item.description || ''}" placeholder="display text" />
              </td>
              <td>
                <button class="record-action" @tap=${(e: TouchEvent) => this._delete(e)} tabindex="-1">-</button>
              </td>
            </tr>
          `
        )}

        <tr data-record-new class="stock-new">
          <td>
            <input type="text" data-min placeholder="min" value="" />
            <span>~</span>
            <input type="text" data-max placeholder="max" value="" />
          </td>
          <td>
            <things-editor-color data-color value="" placeholder="color"></things-editor-color>
          </td>
          <td>
            <input type="text" data-description value="" placeholder="display text" />
          </td>
          <td>
            <button class="record-action" @tap=${() => this._add()} tabindex="-1">+</button>
          </td>
        </tr>
      </table>
    `
  }

  connectedCallback() {
    super.connectedCallback()
    if (!this.boundOnChange) this.boundOnChange = this._onChange.bind(this)

    this.renderRoot.addEventListener('change', this.boundOnChange)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.renderRoot.removeEventListener('change', this.boundOnChange)
  }

  _valueChanged(value: any) {
    var val = value || this._getDefaultValue()
    this._statusField = val.field
    this._defaultColor = val.defaultColor
    this._ranges = [...val.ranges]

    this.requestUpdate()
  }

  _onChange(e: Event) {
    e.stopPropagation()
    this._changingNow = true

    var input = e.target as HTMLInputElement
    var value = input.value

    var tr = input.closest('tr')

    if (tr) {
      if (tr.hasAttribute('data-record')) this._build(true)
      else if (tr.hasAttribute('data-record-new') && input.hasAttribute('data-color')) this._add()
    }

    this.value = {
      field: this._statusField,
      defaultColor: this._defaultColor,
      ranges: this._ranges
    }

    this.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        composed: true
      })
    )
    this.requestUpdate()
  }

  _build(includeNewRecord: boolean) {
    if (includeNewRecord) var records = this.renderRoot.querySelectorAll('[data-record],[data-record-new]')
    else var records = this.renderRoot.querySelectorAll('[data-record]')

    var newRanges = []

    for (var i = 0; i < records.length; i++) {
      var record = records[i]

      var min = (record.querySelector('[data-min]') as HTMLInputElement).value
      var max = (record.querySelector('[data-max]') as HTMLInputElement).value
      var description = (record.querySelector('[data-description]') as HTMLInputElement).value
      var inputs = record.querySelectorAll('[data-color]:not([style*="display: none"])') as NodeListOf<HTMLInputElement>
      if (!inputs || inputs.length == 0) continue

      var input = inputs[inputs.length - 1]
      var color = input.value

      if (min != undefined && max != undefined && color)
        newRanges.push({
          min: min.trim(),
          max: max.trim(),
          color: color.trim(),
          description: description.trim()
        })
    }

    newRanges.sort(function (range1, range2) {
      var min1 = Number(range1.min)
      var min2 = Number(range2.min)

      var result = min1 - min2

      if (Number.isNaN(result)) {
        var strMin1 = String(min1)
        var strMin2 = String(min2)

        if (strMin1 > strMin2) result = 1
        else if (strMin1 == strMin2) result = 0
        else result = -1
      }

      return result
    })

    this._ranges = newRanges
    this.requestUpdate()
  }

  _add() {
    this._build(true)

    var inputs = this.renderRoot.querySelectorAll(
      '[data-record-new] input:not([style*="display: none"]), [data-record-new] [data-color]:not([style*="display: none"])'
    ) as NodeListOf<HTMLInputElement>

    for (var i = 0; i < inputs.length; i++) {
      let input = inputs[i]
      input.value = ''
    }
  }

  _delete(e: Event) {
    var record = (e.target as Element).closest('tr[data-record]')

    ;(record!.querySelector('[data-min]') as HTMLInputElement).value = ''
    ;(record!.querySelector('[data-max]') as HTMLInputElement).value = ''
    ;(record!.querySelector('[data-color]') as HTMLInputElement).value = ''

    this._build(false)

    this.value = {
      field: this._statusField,
      defaultColor: this._defaultColor,
      ranges: this._ranges
    }

    this.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        composed: true
      })
    )
  }

  _getDefaultValue() {
    return {
      field: '',
      defaultColor: '',
      ranges: []
    }
  }

  _onRepeaterChanged() {
    var inputs = this.renderRoot.querySelectorAll(
      '[data-record] input:not([style*="display: none"])[value=""], [data-record-new] input:not([style*="display: none"])[value=""]'
    ) as NodeListOf<HTMLInputElement>

    inputs[0].focus()
  }

  updated(changes: PropertyValues<this>) {
    if (changes.has('value')) this._valueChanged(this.value)
  }
}
