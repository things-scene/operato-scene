/*
 * Copyright © HatioLab Inc. All rights reserved.
 */
import { css, html } from 'lit'

import { Properties } from '@hatiolab/things-scene'
import { OxPropertyEditor } from '@operato/property-editor'

export default class ThingsEditorAction extends OxPropertyEditor {
  static get is() {
    return 'things-editor-action'
  }

  static get styles() {
    return [
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
  }

  editorTemplate(props: Properties) {
    var property = props.property || {}
    var { icon, action } = property
    return html`
      <paper-icon-button
        .icon=${icon}
        @click=${(e: MouseEvent) =>
          this.dispatchEvent(
            new CustomEvent('action-editor-clicked', {
              bubbles: true,
              composed: true,
              detail: action
            })
          )}
      ></paper-icon-button>
    `
  }
}

customElements.define(ThingsEditorAction.is, ThingsEditorAction)
