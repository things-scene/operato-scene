const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [
    {
      type: 'i18n',
      label: 'terms',
      name: 'terms'
    },
    {
      type: 'string',
      label: 'i18n-key',
      name: 'key'
    },
    {
      type: 'string',
      label: 'fallback',
      name: 'fallback'
    }
  ],
  'value-property': 'key',
  help: 'scene/component/label'
}

import { Component, RectPath } from '@hatiolab/things-scene'

import i18next from 'i18next'

export default class Label extends RectPath(Component) {
  static get nature() {
    return NATURE
  }

  is3dish() {
    return true
  }

  get text() {
    const { key, terms = {}, fallback } = this.state

    const language = i18next.language
    return terms[language] || terms[language.substr(0, 2)] || (key && i18next.t(key)) || fallback
  }
}

Component.register('label', Label)
