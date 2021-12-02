# scenario start

- 시나리오를 주어진 variables 로 시작시킨다.
- 현재 실행중인 동일한 이름(instance name)의 시나리오 인스턴스가 없는 경우에만 새로운 시나리오를 시작한다.
- variables(value 속성) 로 주어진 값이 시나리오 시작 시에 variables 변수로 주어진다. 이 값이 변화되거나, intent sensitive 가 설정된 경우에, 이 컴포넌트가 동작한다.

## properties
  - instance name : (선택값) 이 이름으로 새로 시작되는 시나리오 인스턴스의 이름을 주어진 instance name 값으로 유지한다.
    scenario-stop 시에 이 이름을 instance name으로 제공하면, 해당 시나리오 인스턴스를 종료시킨다.
    이 값을 설정하지 않으면, scenario name 속성값을 시나리오 인스턴스 이름으로 한다.
    만약, 동일한 instance name을 갖는 시나리오 인스턴스가 이미 존재하면, 새로운 시나리오 인스턴스가 시작되지 않는다.
  - scenario-name : (필수값) 시나리오 이름을 제공한다. instance name이 특별히 설정되지 않으면, scenario name이 instance name이 된다.
  - variables : (선택값) 시나리오에 전달된 variables 값. 시나리오에 제공되는 파라미터 값이다. 이 컴포넌트의 value 에 연결된 속성이다.

## data
  - scenario-start 로 실행된 scenario instance 의 상태값 : 'STARTED' | 'STOPPED' | 'HALTED'
