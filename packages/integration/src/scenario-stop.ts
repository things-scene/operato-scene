import gql from 'graphql-tag'

import { Component, ComponentNature, DataSource, Properties, RectPath, Shape } from '@hatiolab/things-scene'

import { scenarios } from './client-api'
import { getClient } from './origin-client'

const NATURE: ComponentNature = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [
    {
      type: 'string',
      label: 'instance-name',
      name: 'instanceName'
    },
    {
      type: 'select',
      label: 'scenario-name',
      name: 'scenarioName',
      property: {
        options: scenarios
      }
    }
  ],
  'value-property': 'nothing',
  help: 'scene/component/scenario-stop'
}

export default class ScenarioStop extends DataSource(RectPath(Shape)) {
  static _image: HTMLImageElement

  static get image() {
    if (!ScenarioStop._image) {
      ScenarioStop._image = new Image()
      ScenarioStop._image.src = new URL('../icons/symbol-scenario-stop.png', import.meta.url).href
    }
    return ScenarioStop._image
  }

  private _client: any

  render(context: CanvasRenderingContext2D) {
    var { left, top, width, height } = this.bounds
    context.beginPath()
    this.drawImage(context, ScenarioStop.image, left, top, width, height)
  }

  ready() {
    super.ready()
    this._initScenario()
  }

  _initScenario() {
    if (!this.app.isViewMode) {
      return
    }
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

  onchange(after: Properties) {
    if ('nothing' in after) {
      this.requestData()
    }
  }

  get nothing() {
    return this.state.nothing
  }

  set nothing(nothing) {
    this.setState('nothing', nothing)
  }

  get client() {
    return this._client
  }

  async requestData() {
    let { instanceName, scenarioName } = this.state
    instanceName = instanceName || scenarioName
    if (!instanceName || !this.app.isViewMode) return

    var client = this._client
    if (client) {
      var response = await client.query({
        query: gql`
          mutation ($instanceName: String!) {
            stopScenario(instanceName: $instanceName) {
              state
              message
              data
            }
          }
        `,
        variables: {
          instanceName: instanceName
        }
      })

      this.data = response?.data?.stopScenario?.data
    }
  }
}

Component.register('scenario-stop', ScenarioStop)
