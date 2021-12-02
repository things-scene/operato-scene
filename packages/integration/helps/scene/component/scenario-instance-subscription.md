# scenario instance subscription

- A component that subscribes to the state of a scenario instance
- Gets the current state of the scenario instance and changes the data property.

## properties
  - instance name : (optional)) Terminates the scenario instance that exists under this name. If this value is not set, the scenario name property value is used.
  - scenario name : (optional) If this value is not set, the scenario name property value is used as the scenario instance name.


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
