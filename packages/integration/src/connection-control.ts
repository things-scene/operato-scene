import { Component, RectPath, Shape } from '@hatiolab/things-scene'

import COMPONENT_IMAGE from '../assets/symbol-connection-control.png'
import { getClient } from './origin-client'
import gql from 'graphql-tag'

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
    },
    {
      type: 'select',
      label: 'control-type',
      name: 'controlType',
      property: {
        options: [
          {
            display: '',
            value: ''
          },
          {
            display: 'connect',
            value: 'connect'
          },
          {
            display: 'disconnect',
            value: 'disconnect'
          }
        ]
      }
    }
  ],
  'value-property': 'controlType',
  help: 'scene/component/connection-control'
}

export default class ConnectionControl extends RectPath(Shape) {
  static _image: HTMLImageElement

  static get image() {
    if (!ConnectionControl._image) {
      ConnectionControl._image = new Image()
      ConnectionControl._image.src = COMPONENT_IMAGE
    }
    return ConnectionControl._image
  }

  private _client: any

  render(context: CanvasRenderingContext2D) {
    var { left, top, width, height } = this.bounds
    context.beginPath()
    this.drawImage(context, ConnectionControl.image, left, top, width, height)
  }

  ready() {
    super.ready()
    this._init()
  }

  _init() {
    if (!this.app.isViewMode) return

    this._client = getClient()
  }

  dispose() {
    super.dispose()

    try {
      if (this._client) {
        this._client.stop()
      }
    } catch (e) {
      console.error(e)
    }
    delete this._client
  }

  get nature() {
    return NATURE
  }

  get client() {
    return this._client
  }

  get controlType() {
    return this.getState('controlType')
  }

  set controlType(controlType: string) {
    this.setState('controlType', controlType)
    this.controlConnect()
  }

  async controlConnect() {
    let { controlType, connectionName } = this.state

    if (!connectionName || !this.app.isViewMode) return

    switch (controlType) {
      case 'connect':
      case true:
      case 1:
        controlType = 'connect'
        break
      default:
        controlType = 'disconnect'
    }

    var client = this._client
    var query = ''

    query = `mutation{
      ${controlType}Connection(name: "${connectionName}") {
        status
      }
    }`

    if (client) {
      var response = await client.query({
        query: gql`
          ${query}
        `
      })

      this.data = response
    }
  }
}

Component.register('connection-control', ConnectionControl)
