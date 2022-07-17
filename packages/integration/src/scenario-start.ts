import gql from 'graphql-tag'

import { Component, ComponentNature, DataSource, Properties, RectPath, Shape } from '@hatiolab/things-scene'
import { client } from '@operato/graphql'

import { scenarios } from './client-api'

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

  render(context: CanvasRenderingContext2D) {
    var { left, top, width, height } = this.bounds
    context.beginPath()
    this.drawImage(context, ScenarioStart.image, left, top, width, height)
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

  async requestData() {
    let { instanceName, scenarioName, variables } = this.state
    if (!scenarioName || !this.app.isViewMode) return

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
