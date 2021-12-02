# connection state subscription

- connection 상태를 subscribe 하는 컴포넌트
- connection 의 현재 상태를 가져와서 data 속성을 변화시킨다.

## properties
  - connection name : 커넥션의 이름을 설정함

## data scheme

```json
{
  "name": "mqtt1", /* connection name */
  "state": "CONNECTED", /* 'CONNECTED' | 'DISCONNECTED' */
  "timestamp": 4273809748
}
```
