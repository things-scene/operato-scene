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
      type: 'select',
      label: 'scenario-name',
      name: 'scenarioName',
      property: {
        options: scenarios
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
            display: 'start',
            value: 'start'
          },
          {
            display: 'stop',
            value: 'stop'
          }
        ]
      }
    }
  ],
  'value-property': 'controlType',
  help: 'scene/component/scenario-control'
}

export default class ScenarioControl extends DataSource(RectPath(Shape)) {
  static _image: HTMLImageElement

  static get image() {
    if (!ScenarioControl._image) {
      ScenarioControl._image = new Image()
      ScenarioControl._image.src = new URL('../icons/symbol-scenario-control.png', import.meta.url).href
    }
    return ScenarioControl._image
  }

  private _client: any

  render(context: CanvasRenderingContext2D) {
    var { left, top, width, height } = this.bounds
    context.beginPath()
    this.drawImage(context, ScenarioControl.image, left, top, width, height)
  }

  ready() {
    super.ready()
    this._initScenario()
  }

  _initScenario() {
    if (!this.app.isViewMode) return

    this._client = getClient()
    this.requestData()
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
    if ('controlType' in after) {
      this.requestData()
    }
  }

  get client() {
    return this._client
  }

  get controlType() {
    return this.getState('controlType')
  }

  set controlType(controlType) {
    this.setState('controlType', controlType)
  }

  async requestData() {
    let { controlType, scenarioName } = this.state
    if (!controlType || !scenarioName || !this.app.isViewMode) return
    var client = this._client
    var query = ''
    if (controlType == 'start') {
      query = `mutation{
        ${controlType}Scenario(instanceName: "${scenarioName}", scenarioName: "${scenarioName}", variables: {}) {
          state
        }
      }`
    } else {
      query = `mutation{
        ${controlType}Scenario(instanceName: "${scenarioName}") {
          state
        }
      }`
    }

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

Component.register('scenario-control', ScenarioControl)
