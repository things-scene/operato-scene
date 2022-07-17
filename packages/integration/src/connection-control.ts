import gql from 'graphql-tag'

import { Component, ComponentNature, RectPath, Shape } from '@hatiolab/things-scene'
import { client } from '@operato/graphql'

const NATURE: ComponentNature = {
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
          var response = await client.query({
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
      ConnectionControl._image.src = new URL('../icons/symbol-connection-control.png', import.meta.url).href
    }
    return ConnectionControl._image
  }

  render(context: CanvasRenderingContext2D) {
    var { left, top, width, height } = this.bounds
    context.beginPath()
    this.drawImage(context, ConnectionControl.image, left, top, width, height)
  }

  get nature() {
    return NATURE
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
