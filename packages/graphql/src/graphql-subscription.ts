/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

import { SubscriptionClient } from 'subscriptions-transport-ws'

import { Component, DataSource, RectPath, Shape } from '@hatiolab/things-scene'

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [
    {
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
  private client?: SubscriptionClient
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
    if (this.client) {
      this.client.unsubscribeAll()
      this.client.close(true)
    }

    super.dispose()
  }

  render(context: CanvasRenderingContext2D) {
    var { left, top, width, height } = this.bounds

    context.beginPath()
    this.drawImage(context, GraphqlSubscription.image, left, top, width, height)
  }

  ready() {
    this._initGraphqlSubscription()
  }

  get nature() {
    return NATURE
  }

  _initGraphqlSubscription() {
    if (!this.app.isViewMode) return

    this.requestData()
  }

  async requestData() {
    var { endpoint, query } = this.state
    var self = this

    this.client = new SubscriptionClient(endpoint, {
      reconnect: true,
      connectionParams: {
        headers: {
          /* 
            특정 도메인의 데이타만 받고자 하는 경우에, referer 정보를 제공해서 서버에서 서브도메인 정보를 취득하도록 한다.
            referer: location.href
            또는, 이미 서브도메인 정보를 알고 있다면,
            'x-things-factory-domain': '[subdomain]'
            을 보낼 수 있다.
            관련 정보를 보내지 않는다면, 사용자가 권한을 가진 모든 도메인의 데이타를 수신하게 된다.
          */
          referer: location.href
        }
      }
    })

    this.client.onConnected(() => {
      const { unsubscribe } = this.client!.request({ query }).subscribe({
        next({ data }) {
          if (data) {
            self.data = data
          }
        }
      })

      this.unsubscribe = unsubscribe
    })
  }
}

Component.register('graphql-subscription', GraphqlSubscription)
