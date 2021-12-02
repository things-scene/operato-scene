# scenario stop

- 시나리오를 종료시킨다.
- 현재 실행중인 동일한 이름(instance name)의 시나리오 인스턴스를 찾아서 종료한다. 주어진 이름의 인스턴스가 없으면, 아무런 동작이 일어나지 않는다.
- value : 아무런 값이 주어져도 되며, 데이터 바인딩에 의해서 value값이 설정될 때 컴포넌트가 동작한다.

## properties
  - instance name : (선택값) 이 이름으로 존재하는 시나리오 인스턴스를 종료시킨다. 이 값을 설정하지 않으면, scenario name 속성값을 사용한다. 이 값을 설정하지 않으면, scenario name 속성 값을 시나리오 인스턴스 이름으로 한다.
  - scenario name : (선택값) instance name 과 scenario name 둘 중 하나는 입력되어야 한다.

## data
  - scenario-stop 으로 종료된 scenario instance 의 상태값 : 'STOPPED' | 'HALTED'
