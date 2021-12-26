import './editor-legend-status'

import { OxPropertyEditor } from '@operato/property-editor'
import { Properties } from '@hatiolab/things-scene'
import { customElement } from 'lit/decorators.js'
import { html } from 'lit'

@customElement('property-editor-legend-status')
export class PropertyEditorLegendStatus extends OxPropertyEditor {
  editorTemplate(props: Properties) {
    return html` <editor-legend-status .value=${props.value} fullwidth></editor-legend-status> `
  }
}
