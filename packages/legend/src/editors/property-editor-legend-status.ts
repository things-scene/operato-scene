import './editor-legend-status'

import { html } from 'lit'
import { customElement } from 'lit/decorators.js'

import { OxPropertyEditor, PropertySpec } from '@operato/property-editor'

@customElement('property-editor-legend-status')
export class PropertyEditorLegendStatus extends OxPropertyEditor {
  editorTemplate(value: any, spec: PropertySpec) {
    return html` <editor-legend-status .value=${value} fullwidth></editor-legend-status> `
  }
}
