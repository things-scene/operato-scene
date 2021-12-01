import './editor-i18n'

import { OxPropertyEditor } from '@operato/property-editor'
import { customElement } from 'lit/decorators.js'
import { html } from 'lit'

@customElement('property-editor-i18n')
export class PropertyEditorLegendStatus extends OxPropertyEditor {
  editorTemplate(props: any) {
    return html` <editor-i18n .value=${props.value} fullwidth></editor-i18n> `
  }
}
