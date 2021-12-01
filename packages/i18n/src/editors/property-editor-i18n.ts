import './ox-editor-i18n'

import { OxPropertyEditor } from '@operato/property-editor'
import { customElement } from 'lit/decorators.js'
import { html } from 'lit'

@customElement('property-editor-i18n')
export class PropertyEditorLegendStatus extends OxPropertyEditor {
  editorTemplate(props: any) {
    return html` <ox-editor-i18n .value=${props.value} fullwidth></ox-editor-i18n> `
  }
}
