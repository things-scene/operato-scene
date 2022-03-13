/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

import { Component, HTMLOverlayContainer, Properties } from '@hatiolab/things-scene'

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [
    {
      type: 'checkbox',
      label: 'submit-on-change',
      name: 'submitOnChange'
    },
    {
      type: 'checkbox',
      label: 'copy-value-to-data',
      name: 'copyValueToData'
    }
  ],
  'value-property': 'value'
}

export default class RadioGroup extends HTMLOverlayContainer {
  get nature() {
    return NATURE
  }

  containable(component: Component) {
    return component.model.type == 'input-radio'
  }

  setElementProperties(element: HTMLElement) {
    element.onchange = () => {
      this.changeChecked()
    }
  }

  onchange(after: Properties, before: Properties) {
    super.onchange(after, before)

    const element = this.element as HTMLInputElement
    if ('value' in after && element) {
      element.value = after.value
      if (this.get('copyValueToData')) {
        try {
          this.data = JSON.parse(after.value)
        } catch (e) {
          this.data = after.value
        }
      }
      if (this.get('submitOnChange') && (element.parentElement as HTMLElement).tagName == 'FORM')
        (element.parentElement as HTMLElement).dispatchEvent(
          new Event('submit', {
            cancelable: true
          })
        )
    }
  }

  changeChecked() {
    var allRadioList = this.element.querySelectorAll('input')
    var specificList = Array.prototype.slice.call(allRadioList).filter(e => e.name == this.element.id)
    if (specificList.length) {
      var checkedValue = specificList.filter(e => e.checked == true)
      this.set('value', checkedValue[0].value)
    }
  }
}

Component.register('radio-group', RadioGroup)
