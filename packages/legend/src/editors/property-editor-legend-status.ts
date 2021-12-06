import './editor-legend-status'

import { OxPropertyEditor } from '@operato/property-editor'
import { Properties } from '@hatiolab/things-scene'
import { html } from 'lit-element'

export class PropertyEditorLegendStatus extends OxPropertyEditor {
  static get is() {
    return 'property-editor-legend-status'
  }

  editorTemplate(props: Properties) {
    return html` <editor-legend-status .value=${props.value} fullwidth></editor-legend-status> `
  }
}

customElements.define(PropertyEditorLegendStatus.is, PropertyEditorLegendStatus)
