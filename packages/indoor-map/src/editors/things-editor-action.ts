/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

import { Component, Properties } from '@hatiolab/things-scene'
import { css, html } from 'lit'

import { OxPropertyEditor } from '@operato/property-editor'
import { customElement } from 'lit/decorators.js'

@customElement('things-editor-action')
export default class ThingsEditorAction extends OxPropertyEditor {
  static styles = [
    ...OxPropertyEditor.styles,
    css`
      :host > label {
        display: flex;
        grid-column: span 3;
        order: 1;
        align-items: center;
        justify-self: right;
      }
    `
  ]

  editorTemplate(props: Properties) {
    var property = props.property || {}
    var { icon, action } = property

    return html`
      <paper-icon-button
        .icon=${icon}
        @click=${(e: MouseEvent) => {
          this.dispatchEvent(
            new CustomEvent('i-need-selected', {
              bubbles: true,
              composed: true,
              detail: {
                callback: (selected: Component[]) => {
                  typeof action === 'function' && action(selected[0])
                }
              }
            })
          )
        }}
      ></paper-icon-button>
    `
  }
}
