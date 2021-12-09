import './ox-editor-i18n'

import { html } from 'lit'
import { customElement } from 'lit/decorators.js'

import { Properties } from '@hatiolab/things-scene'
import { OxPropertyEditor } from '@operato/property-editor'

@customElement('property-editor-i18n')
export class PropertyEditorLegendStatus extends OxPropertyEditor {
  editorTemplate(props: Properties) {
    return html` <ox-editor-i18n .value=${props.value} fullwidth></ox-editor-i18n> `
  }
}
