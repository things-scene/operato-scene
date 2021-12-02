# scenario run

- scenario-run使用给定的变量启动方案，并在完成后获取结果值。
   （另一方面，scenario-start将启动该方案并立即返回处理结果。）
- scenario-run建议运行在短时间内终止的方案作为目标方案。
- scenario-run执行时将自动赋予一个实例名称，格式为{scenario-name}-{timestamp}。
- 如果提供variables发生变化时或设置意图敏感后，此组件将被激活。

## properties
  - scenario-name : (必要值) 要运行的方案的名称
  - variables : 变量值传递给场景。 这是提供给方案的参数值。 此属性连接到该组件的value。
  
## data scheme
  - 执行完成后，将提供方案的Context
  
```json
{
  variables: {
    ... /* parameters when instance start*/
  },
  data: {
    [each step name]: { /* step result */ }
  },
  state: 'STARTED' | 'HALTED', /* senario status*/
  timestamp: 4273809748
}
```
