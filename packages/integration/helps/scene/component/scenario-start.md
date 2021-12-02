# scenario start

- Start the scenario with the given variables.
- A new scenario is started only if there is no scenario instance with the same name currently being executed.
- Values ​​given as variables(value attribute) are given as variables variables at the beginning of the scenario. When this value is changed or intent sensitive is set, this component is activated.

## properties
  - instance name: (optional value) The name of the scenario instance that is started with this name is maintained as the given instance name value.
    If this name is provided as an instance name during scenario-stop, the scenario instance is terminated.
    If this value is not set, the scenario name property value is used as the scenario instance name.
    If a scenario instance with the same instance name already exists, a new scenario instance is not started.
  - scenario-name: (required) Provide the scenario name. If the instance name is not specifically set, the scenario name becomes the instance name.
  - variables: (optional value) Variable values ​​delivered to the scenario. This is a parameter value provided to the scenario. This property is connected to the value of this component.

## data
  - The status value of the scenario instance executed by scenario-start:'STARTED' | 'STOPPED' | 'HALTED'