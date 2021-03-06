import { ApolloClient, HttpLink, InMemoryCache, from } from '@apollo/client/core'
import { ErrorResponse, onError } from '@apollo/client/link/error'

import { DefaultOptions } from '@apollo/client'
import { SubscriptionClient } from 'subscriptions-transport-ws'

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

const ERROR_HANDLER = ({ graphQLErrors, networkError }: ErrorResponse) => {
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
    const code = (networkError as any).statusCode || ''
    const message = `[Response-${code}]: ${networkError.message}`

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

var client: ApolloClient<any>

export function getClient() {
  if (!client) {
    var cache = new InMemoryCache()
    client = new ApolloClient({
      defaultOptions,
      cache,
      link: from([
        onError(ERROR_HANDLER),
        new HttpLink({
          uri: '/graphql',
          credentials: 'include'
        })
      ])
    })
  }

  return client
}

/* SubscriptionClient */
var subscriptionClient: Promise<SubscriptionClient> | null

const getSubscriptionClient = async () => {
  if (!subscriptionClient) {
    subscriptionClient = new Promise((resolve, reject) => {
      var client = new SubscriptionClient(location.origin.replace(/^http/, 'ws') + '/subscriptions', {
        reconnect: true,
        connectionParams: {
          headers: {
            /* 
              특정 도메인의 데이타만 받고자 하는 경우에, referer 정보를 제공해서 서버에서 서브도메인 정보를 취득하도록 한다.
              referer: location.href
              또는, 이미 서브도메인 정보를 알고 있다면,
              'x-things-factory-domain': '[subdomain]'
              을 보낼 수 있다.
              관련 정보를 보내지 않는다면, 사용자가 권한을 가진 모든 도메인의 데이타를 수신하게 된다.
            */
            referer: location.href
          }
        }
      })

      client.onError(err => {
        //readyState === 3 인 경우 url을 잘 못 입력했거나, 서버에 문제가 있는 경우이므로 reconnect = false로 변경한다.
        if (client.status === 3) {
          // client.reconnect = false // reconnect is private property
          client.close(true)
        }
        reject(err)
      })

      client.onConnected(() => {
        resolve(client)
      })
    })
  }

  return await subscriptionClient
}

var subscriptions: (() => void)[] = []

export const subscribe = async (request: any, subscribe: any) => {
  var client = await getSubscriptionClient()
  var { unsubscribe } = client.request(request).subscribe(subscribe)

  subscriptions.push(unsubscribe)

  return {
    unsubscribe() {
      subscriptions.splice(subscriptions.indexOf(unsubscribe), 1)
      unsubscribe()

      if (subscriptions.length == 0) {
        client.unsubscribeAll()
        client.close(true)

        subscriptionClient = null
      }
    }
  }
}
