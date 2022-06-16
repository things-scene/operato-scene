/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

import { Component, ComponentNature, HTMLOverlayElement } from '@hatiolab/things-scene'
import { OxInputBarcode } from '@operato/input' // TODO make '@operato/input/ox-input-barcode.js' work.

const NATURE: ComponentNature = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [
    {
      type: 'checkbox',
      label: 'without-enter',
      name: 'withoutEnter'
    },
    {
      type: 'checkbox',
      label: 'english-only',
      name: 'englishOnly'
    },
    {
      type: 'checkbox',
      label: 'select-after-change',
      name: 'selectAfterChange'
    }
  ],
  help: 'scene/component/barcode-scanner'
}

export default class BarcodeScanner extends HTMLOverlayElement {
  private _data: any

  get nature() {
    return NATURE
  }

  get data() {
    return this._data
  }

  set data(data) {
    this._data = data
    this.executeMappings() // 이전 데이터와 비교하지 않고 매핑을 실행하기 위함
  }

  dispose() {
    super.dispose()
  }

  ready() {
    super.ready()
    var scanInput = this.element as OxInputBarcode

    scanInput.addEventListener('change', (e: Event) => {
      this.data = scanInput.value
    })

    // 스캔 시 컴포넌트 데이터 세팅
    var scan = scanInput.scan
    scanInput.scan = (e: MouseEvent) =>
      scan.call(scanInput, e).then(() => {
        if (scanInput.input) this.data = scanInput.input.value
      })
  }

  setElementProperties(input: OxInputBarcode) {
    const { withoutEnter = false, englishOnly = false, selectAfterChange = false } = this.state

    input.withoutEnter = withoutEnter
    input.englishOnly = englishOnly
    input.selectAfterChange = selectAfterChange

    input.value = this._data = this.text
  }

  get tagName() {
    return 'ox-input-barcode'
  }
}

Component.register('barcode-scanner', BarcodeScanner)
