# graphql

It is a family of data source components that can use Graphql API.

- graphql-client
  - Graphql component This is a component that connects the server to be used in the family.
- graphql-query
- graphql-mutation

## properties for graphql-client

- endpoint
  - Enter the connection information of the server providing the Graphql Service.
  - Configured in the graphql-client component.
  - Currently, there is no function for server authentication, so it is used for services that do not require authentication or when authentication has already passed (Origin server, etc.).
    - '/graphql'
    - 'http://localhost:3000/graphql'
  - This component is for setting in the client component ID property of the graphql-query or graphql-mutation component.

## properties for graphql-query/mutation

- client component ID
  - Set the ID of the graphql-client where the endpoint is configured. If not set, the graphql client for the origin server is used.
- period
  - When periodic query/mutation call is needed, set the period in second unit.
- query
  - Set the graphql query to be called.
- auto start
  - Set whether to call automatically when the board starts.

## Confirm receipt of data in the chrome browser

- Since the query/mutation result becomes the data property of this component, the result can be applied to data binding.
- The type of data is determined by query.
  - For example, if the query is as follows, the accessor to access boards is 'data.boards'

```
query {
  boards {
    items {
      id
      name
      description
      thumbnail
      createdAt
      updatedAt
    }
    total
  }
}
```

- The actual data format can be checked in'Network'-'XHR' of the developer tools of the Chrome browser.
