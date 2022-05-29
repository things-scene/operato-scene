/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

import { Component } from '@hatiolab/things-scene'
import Input from './input'

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [
    {
      type: 'string',
      label: 'value',
      name: 'value'
    },
    {
      type: 'number',
      label: 'size',
      name: 'size'
    },
    {
      type: 'string',
      label: 'name',
      name: 'name'
    },
    {
      type: 'checkbox',
      label: 'checked',
      name: 'checked'
    },
    {
      type: 'checkbox',
      label: 'submit-on-change',
      name: 'submitOnChange'
    }
    // {
    //   type: 'checkbox',
    //   label: 'spread-on-init',
    //   name: 'spreadOnInit'
    //   /*
    //   spreadOnInit 은 제거되었다. (다음과 같이 대체될 수 있기 때문이다.)
    //   - value에만 초기값이 설정되어 있으면 데이타는 전파되지 않는다.
    //   - data에 초기값이 설정되어있으면, 처음부터 데이터는 전파된다.
    //   */
    // },
  ],
  'value-property': 'value'
}

export default class CheckBox extends Input {
  get nature() {
    return NATURE
  }

  get tagName() {
    return 'input'
  }

  get inputType() {
    return 'checkbox'
  }

  get hasTextProperty() {
    return true
  }

  createElement() {
    this.element = document.createElement('label')
    if (!this.element) return

    var input = document.createElement('input')
    this.element.appendChild(input)

    var text = document.createTextNode(this.get('text'))
    this.element.appendChild(text)

    this.setElementProperties(this.element)

    //@ts-ignore
    if (this.parent.isHTMLElement && this.parent.isHTMLElement()) this.parent.element.appendChild(this.element)
    else this.root.rootModel.overlay.appendChild(this.element)

    //@ts-ignore
    Component.reposition(this)

    //@ts-ignore
    this.oncreate_element && this.oncreate_element(this.element)
  }

  setElementProperties(element: HTMLElement) {
    var eText = this.element.querySelector('text')
    var eInput = this.element.querySelector('input')

    var { text, checked, value } = this.state

    if (eText) {
      eText.textContent = text
    }

    if (eInput) {
      eInput.checked = checked
      eInput.value = value
    }

    super.setElementProperties(eInput!)
  }
}

Component.register('input-checkbox', CheckBox)
