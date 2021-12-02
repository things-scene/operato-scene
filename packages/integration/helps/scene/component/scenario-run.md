# scenario run

- scenario-run starts the scenario with the given variables and gets the result value after it is finished.
   (On the other hand, scenario-start starts the scenario and returns immediately.)
- It is recommended that scenario-run target scenarios that are guaranteed to be terminated in a short period of time.
- The scenario instance executed by scenario-run is given an instnace name in the format {scenario-name}-{timestamp}.
- Values given as variables(value attribute) are given as variables variables at the beginning of the scenario. When this value is changed or intent sensitive is set, this component is activated.

## properties
  - scenario-name : (required) Name of the scenario to be run.
  - variables : Variable values passed to the scenario. This is a parameter value provided to the scenario. This property is connected to the value of this component. 

## data scheme
  - After execution is completed, the final context of the scenario is provided.

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
