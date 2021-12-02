/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

import gql from 'graphql-tag'

import { Component, DataSource, RectPath, Shape } from '@hatiolab/things-scene'

import COMPONENT_IMAGE from '../assets/symbol-data-subscription.png'
import { subscribe } from './origin-client'

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [
    {
      type: 'string',
      label: 'tag',
      name: 'tag'
    }
  ],
  'value-property': 'tag',
  help: 'scene/component/data-subscription'
}

export default class DataSubscription extends DataSource(RectPath(Shape)) {
  static _image: HTMLImageElement
  static get image() {
    if (!DataSubscription._image) {
      DataSubscription._image = new Image()
      DataSubscription._image.src = COMPONENT_IMAGE
    }

    return DataSubscription._image
  }

  private subscription?: {
    unsubscribe(): void
  }

  dispose() {
    this.subscription?.unsubscribe()
    delete this.subscription

    super.dispose()
  }

  render(context: CanvasRenderingContext2D) {
    var { left, top, width, height } = this.bounds

    context.beginPath()
    this.drawImage(context, DataSubscription.image, left, top, width, height)
  }

  ready() {
    this._initDataSubscription()
  }

  get nature() {
    return NATURE
  }

  get tag() {
    return this.state.tag
  }

  set tag(tag) {
    this.setState('tag', tag)
  }

  _initDataSubscription() {
    if (!this.app.isViewMode) return

    this.startSubscribe()
  }

  async startSubscribe() {
    var { tag } = this.state

    this.subscription = await subscribe(
      {
        query: gql`
          subscription {
            data(tag: "${tag}") {
              tag
              data
            }
          }
        `
      },
      {
        next: async ({ data }: { data: any }) => {
          if (data) {
            this.data = data.data.data
          }
        }
      }
    )
  }
}

Component.register('data-subscription', DataSubscription)
