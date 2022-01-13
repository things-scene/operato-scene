import gql from 'graphql-tag'

import { Component, DataSource, RectPath, Shape } from '@hatiolab/things-scene'

import { scenarios } from './client-api'
import { subscribe } from './origin-client'

const NATURE = {
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
      type: 'string',
      label: 'instance-name',
      name: 'instanceName'
    }
  ],
  help: 'scene/component/scenario-instance-subscription'
}

export default class ScenarioInstanceSubscription extends DataSource(RectPath(Shape)) {
  static _image: HTMLImageElement

  static get image() {
    if (!ScenarioInstanceSubscription._image) {
      ScenarioInstanceSubscription._image = new Image()
      ScenarioInstanceSubscription._image.src = new URL(
        '../icons/symbol-scenario-instance-subscription.png',
        import.meta.url
      ).href
    }

    return ScenarioInstanceSubscription._image
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
    this.drawImage(context, ScenarioInstanceSubscription.image, left, top, width, height)
  }

  ready() {
    if (!this.app.isViewMode) return
    this._initScenarioInstanceSubscription()
  }

  get nature() {
    return NATURE
  }

  _initScenarioInstanceSubscription() {
    if (!this.app.isViewMode) return
    this.startSubscribe()
  }

  async startSubscribe() {
    var { instanceName, scenarioName = '' } = this.state

    instanceName = instanceName || scenarioName

    this.subscription = await subscribe(
      {
        query: gql`
        subscription {
          scenarioInstanceState(instanceName: "${instanceName}", scenarioName: "${scenarioName}") {
            instanceName
            scenarioName
            state
            variables
            progress{
              rounds
              rate
              steps
              step
            }
            data
            message
            timestamp
          }
        }
      `
      },
      {
        next: async ({ data }: { data: any }) => {
          if (data) {
            this.data = data.scenarioInstanceState
          }
        }
      }
    )
  }
}

Component.register('scenario-instance-subscription', ScenarioInstanceSubscription)
