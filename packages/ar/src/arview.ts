/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

import '@google/model-viewer'

import { Component, ComponentNature, HTMLOverlayContainer } from '@hatiolab/things-scene'

const NATURE: ComponentNature = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [
    {
      type: 'attachment-selector',
      label: 'src',
      name: 'src'
    },
    {
      type: 'checkbox',
      label: 'camera-controls',
      name: 'cameraControls'
    }
  ],
  'value-property': 'src'
}

export default class Arview extends HTMLOverlayContainer {
  get nature() {
    return NATURE
  }

  /*
   * 컴포넌트의 생성 또는 속성 변화 시에 호출되며,
   * 그에 따른 html element의 반영이 필요한 부분을 구현한다.
   *
   * ThingsComponent state => HTML element properties
   */
  setElementProperties(element: HTMLElement & { src: string }) {
    var { src, cameraControls } = this.state

    // element.style.pointerEvents = 'auto' //'inherit'

    element.src = src || ''
    if (cameraControls) {
      element.setAttribute('camera-controls', cameraControls)
    } else {
      element.removeAttribute('camera-controls')
    }

    element.setAttribute('ar', '')
    element.setAttribute('ar-modes', 'webxr scene-viewer quick-look')
    element.setAttribute('environment-image', 'neutral')
    element.setAttribute('auto-rotate', '')
  }

  /*
   * 컴포넌트가 ready 상태가 되거나, 컴포넌트의 속성이 변화될 시 setElementProperties 뒤에 호출된다.
   * 변화에 따른 기본적인 html 속성이 super.reposition()에서 진행되고, 그 밖의 작업이 필요할 때, 오버라이드 한다.
   */
  reposition() {
    super.reposition()
  }

  get tagName() {
    return 'model-viewer'
  }
}

Component.register('arview', Arview)
