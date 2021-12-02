# connection control

控制给定名称连接的组件。
如果作为controlType（值属性）给出的值是`connect`，则尝试连接。 如果是`disconnect`，则连接终止。

## properties

  - connection-name ：（必需）设置连接名称。
  - controlType（指定为值属性）：指定连接是否终止。
    - 此属性建模没有意义，旨在在分配给该组件的value属性时指导建议的值。
    - 作为此组件的有效值，建议使用“连接”或“断开连接”。
    - 如果将'connect'，1或true用作值值，则尝试建立连接，否则连接终止。

## data
  - 获取connection control结果，内容为连接信息和状态
  - 如果是为了实时确认connection的状态，建议使用connection-data-subscription组件。