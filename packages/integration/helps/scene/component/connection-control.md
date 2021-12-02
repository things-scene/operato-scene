# connection control

- A component that controls the connection of the given name.
- If the value given as controlType (value attribute) is'connect', connection is attempted. If it is'disconnect', the connection is terminated.

## properties
  - connection-name: (required) Set the connection name.
  - controlType (specified as a value attribute): Specifies whether the connection is terminated.
    - This attribute modeling has no meaning and is intended to guide the recommended value when assigning to the value attribute of this component.
    - As a valid value for this component,'connect' or'disconnect' is recommended.
    - If'connect', 1, or true is passed as the value value, connection connection is attempted, otherwise, the connection is terminated.

## data
  - It has the connection related information and status returned as a result of connection control.
  - To monitor the real-time status of a connection, it is recommended to use the connection-data-subscription component.