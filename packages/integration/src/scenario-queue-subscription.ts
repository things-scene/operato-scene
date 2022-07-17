import gql from 'graphql-tag'

import { Component, ComponentNature, DataSource, RectPath, Shape } from '@hatiolab/things-scene'
import { subscribe } from '@operato/graphql'

const NATURE: ComponentNature = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [],
  help: 'scene/component/scenario-queue-subscription'
}

export default class ScenarioQueueSubscription extends DataSource(RectPath(Shape)) {
  static _image: HTMLImageElement

  static get image() {
    if (!ScenarioQueueSubscription._image) {
      ScenarioQueueSubscription._image = new Image()
      ScenarioQueueSubscription._image.src = new URL(
        '../icons/symbol-scenario-queue-subscription.png',
        import.meta.url
      ).href
    }

    return ScenarioQueueSubscription._image
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
    this.drawImage(context, ScenarioQueueSubscription.image, left, top, width, height)
  }

  ready() {
    if (!this.app.isViewMode) return
    this._initScenarioQueueSubscription()
  }

  get nature() {
    return NATURE
  }

  _initScenarioQueueSubscription() {
    if (!this.app.isViewMode) return
    this.startSubscribe()
  }

  async startSubscribe() {
    this.subscription = await subscribe(
      {
        query: gql`
          subscription {
            scenarioQueueState {
              queue {
                stuff
                due
                priority
                tag
              }
            }
          }
        `
      },
      {
        next: async ({ data }: { data: any }) => {
          if (data) {
            this.data = data.scenarioQueueState
          }
        }
      }
    )
  }
}

Component.register('scenario-queue-subscription', ScenarioQueueSubscription)
