import gql from 'graphql-tag'

import { Component, DataSource, RectPath, Shape } from '@hatiolab/things-scene'

import { getClient, subscribe } from './origin-client'

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [
    {
      type: 'select',
      label: 'connection-name',
      name: 'connectionName',
      property: {
        options: async () => {
          var response = await getClient().query({
            query: gql`
              query {
                connections {
                  items {
                    name
                  }
                }
              }
            `
          })
          if (response.errors) {
            return ['']
          }

          return [''].concat(response.data.connections.items.map((item: any) => item.name))
        }
      }
    }
  ],
  help: 'scene/component/connection-state-subscription'
}

export default class ConnectionStateSubscription extends DataSource(RectPath(Shape)) {
  static _image: HTMLImageElement
  static get image() {
    if (!ConnectionStateSubscription._image) {
      ConnectionStateSubscription._image = new Image()
      ConnectionStateSubscription._image.src = new URL(
        '../icons/symbol-connection-state-subscription.png',
        import.meta.url
      ).href
    }

    return ConnectionStateSubscription._image
  }

  private subscription?: {
    unsubscribe(): void
  }

  dispose() {
    super.dispose()

    this.subscription?.unsubscribe()
    delete this.subscription
  }

  render(context: CanvasRenderingContext2D) {
    var { left, top, width, height } = this.bounds

    context.beginPath()
    this.drawImage(context, ConnectionStateSubscription.image, left, top, width, height)
  }

  ready() {
    if (!this.app.isViewMode) return
    this._initConnectionStateSubscription()
  }

  get nature() {
    return NATURE
  }

  _initConnectionStateSubscription() {
    if (!this.app.isViewMode) return
    this.startSubscribe()
  }

  async startSubscribe() {
    var { connectionName } = this.state

    this.subscription = await subscribe(
      {
        query: gql`subscription {
          connectionState(name: "${connectionName}") {
            name
            state
            timestamp
          }
        }`
      },
      {
        next: async ({ data }: { data: any }) => {
          if (data) {
            this.data = data.connectionState
          }
        }
      }
    )
  }
}

Component.register('connection-state-subscription', ConnectionStateSubscription)
