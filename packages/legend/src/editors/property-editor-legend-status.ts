import './editor-legend-status'

import { html } from 'lit'

import { Properties } from '@hatiolab/things-scene'
import { OxPropertyEditor } from '@operato/property-editor'

export class PropertyEditorLegendStatus extends OxPropertyEditor {
  static get is() {
    return 'property-editor-legend-status'
  }

  editorTemplate(props: Properties) {
    return html` <editor-legend-status .value=${props.value} fullwidth></editor-legend-status> `
  }
}

customElements.define(PropertyEditorLegendStatus.is, PropertyEditorLegendStatus)
