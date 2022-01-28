# graphql subscription

It is a data source component that wants to receive messages pushed from the Graphql publish service.

## properties

- endpoint
  - Enter the connection information of the server providing the Graphql Service.
  - Configured in the graphql-client component.
  - Currently, there is no function for server authentication, so it is used for services that do not require authentication or when authentication has already passed (Origin server, etc.).
    - eg. 'ws://localhost:3000/subscriptions'
- query
  - Set the subscription query.
  
## Confirm receipt of data in the chrome browser

- Since the subscription data becomes the data property of this component, the result can be applied to data binding.
- The type of subscription data is determined by query.
- You can check the actual subscription data type in'Network'-'WS' of the developer tool of Chrome browser.
