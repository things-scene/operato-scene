# scenario instance subscription

- 시나리오 인스턴스 상태를 subscribe 하는 컴포넌트
- 시나리오 인스턴스의 현재 상태를 가져와서 data 속성을 변화시킨다.

## properties
  - instance name : (선택값) 이 이름으로 존재하는 시나리오 인스턴스를 종료시킨다. 이 값을 설정하지 않으면, scenario name 속성값을 사용한다.
  - scenario name : (선택값) 이 값을 설정하지 않으면, scenario name 속성 값을 시나리오 인스턴스 이름으로 한다.

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
