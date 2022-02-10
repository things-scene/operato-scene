/*
 * Copyright © 2017 HatioLab Inc. All rights reserved.
 */

import './news-ticker-element'

import { Component, error, HTMLOverlayElement } from '@hatiolab/things-scene'

import ThingsNewsTicker from './news-ticker-element'

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [
    {
      type: 'select',
      label: 'direction',
      name: 'direction',
      property: {
        options: [
          {
            display: 'horizontal',
            value: 'horizontal'
          },
          {
            display: 'vertical',
            value: 'vertical'
          }
        ]
      }
    },
    {
      type: 'checkbox',
      label: 'reverse',
      name: 'reverse'
    },
    {
      type: 'number',
      label: 'duration',
      name: 'duration',
      placeholder: 'seconds'
    }
  ],
  help: 'scene/component/news-ticker'
}

export default class NewsTicker extends HTMLOverlayElement {
  get nature() {
    return NATURE
  }

  get hasTextProperty() {
    return true
  }

  get tagName() {
    return 'ox-news-ticker'
  }

  createElement() {
    super.createElement()

    this.setState('text', '#{data}')

    var element = this.element

    element.style.overflow = 'hidden'
  }

  /* component.property => element.property */
  setElementProperties(element: HTMLElement) {
    try {
      var {
        direction = 'horizontal',
        reverse,
        textAlign,
        fontColor = 'black',
        fontSize = 13,
        font,
        duration = 30
      } = this.state

      var text = this.text

      var isReverse = reverse
      var isTextOverflowed = this.isTextOverflowed

      var newsTicker = element as ThingsNewsTicker

      newsTicker.direction = direction
      newsTicker.duration = duration * 1000
      newsTicker.fontColor = fontColor
      newsTicker.fontFamily = font
      newsTicker.fontSize = `${fontSize}px`
      newsTicker.textAlign = textAlign
      newsTicker.isReverse = isReverse
      newsTicker.isTextOverflowed = isTextOverflowed
      newsTicker.textData = text
    } catch (e) {
      error(e)
    }
  }

  get isTextOverflowed() {
    var { width } = this.bounds
    var span = document.createElement('span')

    // @ts-ignore
    span.style.font = this.font
    span.style.position = 'fixed'
    span.style.left = '-100%'
    span.style.visibility = 'none'

    span.textContent = this.text

    document.body.appendChild(span)

    var textBounds = span.getBoundingClientRect()
    var isOverflowed = width < textBounds.width

    document.body.removeChild(span)

    return isOverflowed
  }
}

Component.register('news-ticker', NewsTicker)
