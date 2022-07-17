/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

import { gql } from '@apollo/client'
import { Component, ComponentNature, DataSource, RectPath, Shape } from '@hatiolab/things-scene'
import { subscribe } from '@operato/graphql'

const NATURE: ComponentNature = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [
    {
      /* origin의 subscription 만을 허용하므로, 엔드포인트 속성은 무시한다. */
      type: 'string',
      label: 'endpoint',
      name: 'endpoint'
    },
    {
      type: 'graphql',
      label: 'query',
      name: 'query'
    }
  ],
  help: 'scene/component/graphql-subscription'
}

export default class GraphqlSubscription extends DataSource(RectPath(Shape)) {
  private static _image: HTMLImageElement
  private unsubscribe?: () => void

  static get image() {
    if (!GraphqlSubscription._image) {
      GraphqlSubscription._image = new Image()
      GraphqlSubscription._image.src = new URL('../icons/symbol-graphql-subscription.png', import.meta.url).href
    }

    return GraphqlSubscription._image
  }

  dispose() {
    if (this.unsubscribe) {
      this.unsubscribe()
    }

    super.dispose()
  }

  render(context: CanvasRenderingContext2D) {
    var { left, top, width, height } = this.bounds

    context.beginPath()
    this.drawImage(context, GraphqlSubscription.image, left, top, width, height)
  }

  ready() {
    super.ready()

    if (this.app.isViewMode) {
      this.requestData()
    }
  }

  get nature() {
    return NATURE
  }

  async requestData() {
    var { query } = this.state

    const { unsubscribe } = await subscribe(
      {
        query: gql`
          ${query}
        `
      },
      {
        next: ({ data }: { data: any }) => {
          if (data) {
            this.data = data
          }
        }
      }
    )

    this.unsubscribe = unsubscribe
  }
}

Component.register('graphql-subscription', GraphqlSubscription)
