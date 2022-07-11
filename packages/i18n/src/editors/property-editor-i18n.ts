import './ox-editor-i18n'

import { html } from 'lit'
import { customElement } from 'lit/decorators.js'

import { OxPropertyEditor, PropertySpec } from '@operato/property-editor'

@customElement('property-editor-i18n')
export class PropertyEditorLegendStatus extends OxPropertyEditor {
  editorTemplate(value: any, spec: PropertySpec) {
    return html` <ox-editor-i18n .value=${value} fullwidth></ox-editor-i18n> `
  }
}
