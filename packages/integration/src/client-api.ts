import gql from 'graphql-tag'

import { getClient } from './origin-client'

export const scenarios = async () => {
  var response = await getClient().query({
    query: gql`
      query {
        scenarios {
          items {
            name
          }
        }
      }
    `
  })
  if (response.errors) {
    return ['']
  }

  const items = response.data.scenarios.items.map((item: any) => item.name)
  const sorted = items.sort()

  return [''].concat(sorted)
}
