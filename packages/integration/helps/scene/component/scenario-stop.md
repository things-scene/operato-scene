# scenario stop

- End the scenario.
- Finds the currently running scenario instance with the same name and terminates it. If there is no instance of the given name, nothing happens.
- value: Any value can be given, and the component operates when the value is set by data binding.

## properties
  - instance name: (optional value) Terminates the scenario instance that exists under this name. If this value is not set, the scenario name property value is used. If this value is not set, the scenario name property value is used as the scenario instance name.
  - scenario name: (optional value) Either of the instance name and the scenario name must be entered.

## data
   - Status value of the scenario instance terminated with scenario-stop : 'STOPPED' | 'HALTED'