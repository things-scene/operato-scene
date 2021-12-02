# scenario queue subscription

- A component that subscribes to the state of a scenario pending queue
- Gets the current state of the scenario pending queue and changes the data property.

## properties

## data scheme

```json
{
  "queue": [
    {
      "stuff": Object,
      "due": String,
      "priority": Int,
      "tag": String
    },
    {
      "stuff": Object,
      "due": String,
      "priority": Int,
      "tag": String
    }
  ]
}
```
