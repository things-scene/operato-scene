import './editor-i18n'

import { ThingsEditorProperty } from '@things-factory/modeller-ui'
import { customElement } from 'lit/decorators.js'
import { html } from 'lit'

@customElement('property-editor-i18n')
export class PropertyEditorLegendStatus extends ThingsEditorProperty {
  editorTemplate(props: any) {
    return html` <editor-i18n .value=${props.value} fullwidth></editor-i18n> `
  }
}
