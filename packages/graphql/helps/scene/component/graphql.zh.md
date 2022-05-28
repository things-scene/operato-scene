# graphql

它是可以使用 Graphql API 的一系列数据源组件。

- graphql-client
  - Graphql 组件这是连接要在系列中使用的服务器的组件。
- graphql-query
- graphql-mutation

## properties for graphql-client

- endpoint
  - 输入提供 Graphql 服务的服务器的连接信息。
  - 在 graphql-client 组件中配置。
  - 当前，尚无用于服务器身份验证的功能，因此它用于不需要身份验证或已通过身份验证的服务（原始服务器等）。
    - '/graphql'
    - 'http://localhost:3000/graphql'
  - 该组件用于在 graphql-query 或 graphql-mutation 组件的客户端组件 ID 属性中进行设置。

## properties for graphql-query/mutation

- client component ID
  - 设置配置端点的 graphql-client 的 ID。如果未设置，则使用源服务器的 graphql 客户端。
- period
  - 需要定期执行 query/mutation 时，请以秒为单位设置周期。
- query
  - 设置要调用的 graphql 查询。
- auto start
  - 看板启动时是否自动调用。

## 在 Chrome 浏览器中确认收到数据

- 由于`query/mutation`结果成为该组件的数据属性，因此该结果可以应用于数据绑定。
- 数据类型由查询确定。
- 实际数据形态可以在 Chrome 浏览器的开发人员工具的“network”-“ XHR”中查看。
