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
    },
    {
      type: 'checkbox',
      label: 'run-on-start',
      name: 'runOnStart'
    }
  ],
  'value-property': 'variables',
  help: 'scene/component/scenario-run'
}

export default class ScenarioRun extends DataSource(RectPath(Shape)) {
  static _image: HTMLImageElement

  static get image() {
    if (!ScenarioRun._image) {
      ScenarioRun._image = new Image()
      ScenarioRun._image.src = new URL('../icons/symbol-scenario-run.png', import.meta.url).href
    }
    return ScenarioRun._image
  }

  render(context: CanvasRenderingContext2D) {
    var { left, top, width, height } = this.bounds
    context.beginPath()
    this.drawImage(context, ScenarioRun.image, left, top, width, height)
  }

  ready() {
    super.ready()

    if (this.app.isViewMode) {
      if (this.state.runOnStart) {
        this.requestData()
      }
    }
  }

  get nature() {
    return NATURE
  }

  onchange(after: Properties) {
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
    let { scenarioName, variables } = this.state
    if (!scenarioName || !this.app.isViewMode) {
      return
    }

    try {
      variables = typeof variables == 'string' ? JSON.parse(variables) : variables
    } catch (e) {
      console.warn('runScenario mutation variable is not an object')
    }

    if (client) {
      var response = await client.query({
        query: gql`
          mutation ($scenarioName: String!, $variables: Object) {
            runScenario(scenarioName: $scenarioName, variables: $variables) {
              state
              message
              data
            }
          }
        `,
        variables: {
          scenarioName: scenarioName,
          variables
        }
      })

      this.data = response?.data?.runScenario?.data
    }
  }
}

Component.register('scenario-run', ScenarioRun)
