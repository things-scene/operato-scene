/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

import { ServerParseError } from '@apollo/client'
import {
  ApolloClient,
  DefaultOptions,
  from,
  HttpLink,
  HttpOptions,
  InMemoryCache,
  NormalizedCacheObject
} from '@apollo/client/core'
import { ErrorLink, onError } from '@apollo/client/link/error'
import { Component, DataSource, RectPath, Shape } from '@hatiolab/things-scene'

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore'
  },
  query: {
    fetchPolicy: 'no-cache', //'network-only'
    errorPolicy: 'all'
  },
  mutate: {
    errorPolicy: 'all'
  }
}

const ERROR_HANDLER: ErrorLink.ErrorHandler = ({ operation, graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    document.dispatchEvent(
      new CustomEvent('notify', {
        detail: {
          level: 'error',
          message: graphQLErrors[0].message,
          ex: graphQLErrors
        }
      })
    )
  }

  if (networkError) {
    /* networkError가 ServerParseError 이거나 ServerError 인 경우에만 statusCode를 갖는다. */
    switch ((networkError as ServerParseError).statusCode) {
      case undefined /* in case this error is not a server side error */:
        document.dispatchEvent(
          new CustomEvent('notify', {
            detail: {
              level: 'error',
              message: networkError.message,
              ex: networkError
            }
          })
        )
        break

      case 401:
        /* 401 에러가 리턴되면, 인증이 필요하다는 메시지를 dispatch 한다. 이 auth 모듈 등에서 이 메시지를 받아서 signin 프로세스를 진행할 수 있다. */
        document.dispatchEvent(new CustomEvent('auth-required'))
        break

      case 403:
        /* 403 에러가 리턴되면, 도메인 정보가 필요하다는 메시지를 dispatch 한다. 이 auth 모듈 등에서 이 메시지를 받아서 domain-register 프로세스 등을 진행할 수 있다. */
        document.dispatchEvent(new CustomEvent('domain-required'))
        break

      default:
        var { name, response, statusCode, bodyText, message } = networkError as ServerParseError
        if (name == 'ServerParseError') {
          message = `[ ${statusCode || ''} : ${response.statusText} ] ${bodyText}`
        } else {
          /* in case this error is instanceof ServerError */
          message = `[ ${statusCode || ''} : ${response.statusText} ] ${message}`
        }

        document.dispatchEvent(
          new CustomEvent('notify', {
            detail: {
              level: 'error',
              message,
              ex: networkError
            }
          })
        )
    }
  }
}

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [
    {
      type: 'string',
      label: 'endpoint',
      name: 'endpoint'
    }
  ],
  help: 'scene/component/graphql'
}

export default class GraphqlClient extends DataSource(RectPath(Shape)) {
  private static _image: HTMLImageElement
  private _client?: ApolloClient<NormalizedCacheObject>

  static get image() {
    if (!GraphqlClient._image) {
      GraphqlClient._image = new Image()
      GraphqlClient._image.src = new URL('../icons/symbol-graphql-client.png', import.meta.url).href
    }

    return GraphqlClient._image
  }

  ready() {
    super.ready()

    this.init()
  }

  init() {
    var { endpoint } = this.state

    if (!endpoint) {
      console.warn('endpoint not defined')
      return
    }

    var cache = new InMemoryCache()
    const httpOptions: HttpOptions = {
      uri: endpoint,
      credentials: 'include'
    }

    const client = new ApolloClient({
      defaultOptions,
      cache,
      link: from([onError(ERROR_HANDLER), new HttpLink(httpOptions)])
    })

    this._client = client
  }

  get client(): ApolloClient<NormalizedCacheObject> | undefined {
    return this._client
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

  render(context: CanvasRenderingContext2D) {
    /*
     * TODO role이 publisher 인지 subscriber 인지에 따라서 구분할 수 있는 표시를 추가할 것.
     */

    var { left, top, width, height } = this.bounds

    context.beginPath()
    this.drawImage(context, GraphqlClient.image, left, top, width, height)
  }

  onchangeData(data: any, before: any) {
    super.onchangeData(data, before)
  }

  get nature() {
    return NATURE
  }
}

Component.register('graphql-client', GraphqlClient)
