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

  render(context: CanvasRenderingContext2D) {
    var { left, top, width, height } = this.bounds
    context.beginPath()
    this.drawImage(context, ScenarioStop.image, left, top, width, height)
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

  async requestData() {
    let { instanceName, scenarioName } = this.state
    instanceName = instanceName || scenarioName
    if (!instanceName || !this.app.isViewMode) return

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
