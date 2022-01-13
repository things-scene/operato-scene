import gql from 'graphql-tag'

import { Component, DataSource, Properties, RectPath, Shape } from '@hatiolab/things-scene'

import { scenarios } from './client-api'
import { getClient } from './origin-client'

const NATURE = {
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
    },
    {
      type: 'data',
      label: 'variables',
      name: 'variables'
    }
  ],
  'value-property': 'variables',
  help: 'scene/component/scenario-start'
}

export default class ScenarioStart extends DataSource(RectPath(Shape)) {
  static _image: HTMLImageElement

  static get image() {
    if (!ScenarioStart._image) {
      ScenarioStart._image = new Image()
      ScenarioStart._image.src = new URL('../icons/symbol-scenario-start.png', import.meta.url).href
    }
    return ScenarioStart._image
  }

  private _client: any

  render(context: CanvasRenderingContext2D) {
    var { left, top, width, height } = this.bounds
    context.beginPath()
    this.drawImage(context, ScenarioStart.image, left, top, width, height)
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

  async onchange(after: Properties) {
    if ('variables' in after) {
      this.requestData()
    }
  }

  get variables() {
    return this.state.variables
  }

  set variables(variables) {
    this.setState('variables', variables)
  }

  get client() {
    return this._client
  }

  async requestData() {
    let { instanceName, scenarioName, variables } = this.state
    if (!scenarioName || !this.app.isViewMode) return

    var client = this._client
    try {
      variables = typeof variables == 'string' ? JSON.parse(variables) : variables
    } catch (e) {
      console.error(e)
    }

    if (client) {
      var response = await client.query({
        query: gql`
          mutation ($instanceName: String, $scenarioName: String!, $variables: Object) {
            startScenario(instanceName: $instanceName, scenarioName: $scenarioName, variables: $variables) {
              state
              message
              data
            }
          }
        `,
        variables: {
          instanceName: instanceName,
          scenarioName: scenarioName,
          variables
        }
      })

      this.data = response?.data?.startScenario?.data
    }
  }
}

Component.register('scenario-start', ScenarioStart)
