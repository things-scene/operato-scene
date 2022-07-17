import gql from 'graphql-tag'

import { client } from '@operato/graphql'

export const scenarios = async () => {
  var response = await client.query({
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
