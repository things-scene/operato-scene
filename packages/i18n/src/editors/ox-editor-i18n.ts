/**
 * @license Copyright © HatioLab Inc. All rights reserved.
 */

import { LitElement, css, html } from 'lit'
import { customElement, property, queryAll, state } from 'lit/decorators.js'

/**
multiple language editor element

Example:

  <ox-editor-i18n value=${map}>
  </ox-editor-i18n>
*/
@customElement('ox-editor-i18n')
export default class EditorI18n extends LitElement {
  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
        align-content: center;

        width: 100%;
        overflow: hidden;
        border: 1px solid #ccc;
        margin: 5px 0;

        background-color: #ddd;
      }

      div {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
      }

      div > * {
        min-width: 0px;
        min-height: 20px;
        margin: 2px;
        padding: 0;
      }

      button {
        width: 20px;
        text-align: center;
        border-radius: 50%;
        font-size: 1em;
      }

      input {
        flex: 1;
      }
    `
  ]

  @property({ type: Object }) value: { [key: string]: any } = {}

  @queryAll('[data-record-new] input') _inputs?: Array<HTMLInputElement>

  @state() _changingNow: boolean = false

  firstUpdated() {
    this.renderRoot.addEventListener('change', this._onChange.bind(this))
  }

  render() {
    return html`
      <datalist id="language-list">
        <option value="en">English</option>
        <option value="ko">한국어</option>
        <option value="zh">中文</option>
        <option value="ms">Bahasa Malaysia</option>
      </datalist>

      ${this._toArray(this.value).map(
        item => html`
          <div data-record>
            <input type="text" data-lng placeholder="language" .value=${item.key} list="language-list" />
            <input type="text" data-term placeholder="term" .value=${item.value} />
            <button class="record-action" @click=${(e: MouseEvent) => this._delete(e)} tabindex="-1">x</button>
          </div>
        `
      )}

      <div data-record-new>
        <input type="text" data-lng placeholder="language" value="" list="language-list" />
        <input type="text" data-term placeholder="term" value="" />
        <button class="record-action" @click=${() => this._add()} tabindex="-1">+</button>
      </div>
    `
  }

  _onChange(e: Event) {
    if (this._changingNow) {
      return
    }

    this._changingNow = true

    var input = e.target as HTMLInputElement
    var value = input.value

    var div = input.parentElement as HTMLElement

    if (div.hasAttribute('data-record')) {
      this._build()
    } else if (div.hasAttribute('data-record-new') && input.hasAttribute('data-term')) {
      this._add()
    }

    this._changingNow = false
  }

  _build(includeNewRecord?: boolean) {
    if (includeNewRecord) var records = this.renderRoot.querySelectorAll('[data-record],[data-record-new]')
    else var records = this.renderRoot.querySelectorAll('[data-record]')

    var newmap: { [key: string]: string } = {}

    for (var i = 0; i < records.length; i++) {
      var record = records[i]

      var key = (record.querySelector('[data-lng]') as HTMLInputElement)?.value
      var input = record.querySelector('[data-term]') as HTMLInputElement
      if (!input) continue

      var value = input.value

      if (key) {
        newmap[key] = value || ''
      }
    }

    this.value = newmap
    this.dispatchEvent(new CustomEvent('change', { bubbles: true, composed: true }))
  }

  /* map아이템들을 template(dom-repeat)용 배열로 변환하는 함수 */
  _toArray(map: { [key: string]: any }) {
    var array = []

    for (var key in map) {
      array.push({
        key: key,
        value: map[key]
      })
    }

    return array
  }

  _add() {
    this._build(true)

    var inputs = this._inputs || []

    for (var i = 0; i < inputs.length; i++) {
      let input = inputs[i]
      input.value = ''
    }

    inputs[0].focus()
  }

  _delete(e: MouseEvent) {
    var record = (e.target as HTMLElement).parentElement
    const lng = record?.querySelector('[data-lng]') as HTMLInputElement
    lng && (lng.value = '')

    this._build()
  }
}
