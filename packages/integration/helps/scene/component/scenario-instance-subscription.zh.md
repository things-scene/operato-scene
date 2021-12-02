# scenario instance subscription

- 订阅方案实例状态的组件
- 获取方案实例的当前状态并更改数据属性。

## properties
  - instance name : 终止以该名称存在的方案实例。 如果未设置此值，则使用方案名称属性值。
  - scenario name : 如果未设置此值，那么方案名称属性值将作为方案实例名称。

## data scheme

```json
{
  variables: {
    ... /* parameters when instance start*/
  },
  data: {
    [each step name]: { /* step result */ }
  },
  state: 'STARTED' | 'STOPPED' | 'HALTED', /* senario status*/
  timestamp: 4273809748
}
```
