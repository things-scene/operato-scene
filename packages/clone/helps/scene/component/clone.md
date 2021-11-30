# Clone

It is a component that duplicates a component.

## properties

- duration
   - If "Repeat" is set, enter the "Repeat" period in milli-seconds.
   - The minimum value is 500ms.
   - Initial cloning is executed as soon as this component is started. That is, the duration value is not applied to the delay of the initial component replication.
- target
  - Enter the id of the component to be cloned.
- repeat
  - Set whether to repeatedly execute the component replication task.
  - If it is set to repeat, it is repeatedly executed according to the duration setting period.
- auto start
  - Set whether or not to automatically start component clone work.
  - If "auto start" is not set, the "started" or "value" attribute can be started or terminated with "true/false".
- target retention
  - How long to keep the cloned component alive (milli-seconds)
  - Set with the retention attribute of the cloned component
- started (value property)
  - It cannot be set in the modeler property window, but it can be set by data propagation or tap event handling.
