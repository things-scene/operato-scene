# scenario run

- scenario-run 은 시나리오를 주어진 variables 로 시작시키고, 종료된 후에 결과값을 가져온다.
  (반면에 scenario-start는 시나리오를 시작시키고 바로 리턴된다.)
- scenario-run 은 단기간에 종료가 보장되는 시나리오를 대상으로 하는 것이 좋다.
- scenario-run 으로 실행되는 시나리오 인스턴스는 {scenario-name}-{timestamp} 형식의 instnace 이름이 부여된다.
- variables(value 속성) 로 주어진 값이 시나리오 시작 시에 variables 변수로 주어진다. 이 값이 변화되거나, intent sensitive 가 설정된 경우에, 이 컴포넌트가 동작한다.

## properties
  - scenario-name : (필수값) 실행될 시나리오 이름.
  - variables : 시나리오에 전달된 variables 값. 시나리오에 제공되는 파라미터 값이다. 이 컴포넌트의 value 에 연결된 속성이다.

## data scheme
  - 실행 완료 후 시나리오의 최종 context를 제공받게 된다.

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
