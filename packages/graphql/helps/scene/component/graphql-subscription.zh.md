# graphql subscription

它是一个数据源组件，接收从Graphql发布服务推送的消息。

## properties

- endpoint
  - 输入提供Graphql服务的服务器的连接信息。
  - 在graphql-client组件中配置。
  - 当前，尚无用于服务器身份验证的功能，因此它用于不需要身份验证或已通过身份验证的服务（原始服务器等）。
    - eg. 'ws://localhost:3000/subscriptions'
- query
  - subscription query를 설정한다.

## 在Chrome浏览器中确认收到数据

- 由于订阅数据成为该组件的数据属性，因此可以将结果应用于数据绑定。
- 订阅数据的类型由graphql query确定。
- 您可以在Chrome浏览器的开发人员工具的“网络”-“ WS”中检查实际的订阅数据形态。