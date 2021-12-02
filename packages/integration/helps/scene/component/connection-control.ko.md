# connection control

- 주어진 이름의 커넥션을 연결을 컨트롤하는 컴포넌트이다.
- controlType(value 속성) 로 주어진 값이 'connect' 이면 연결을 시도하며, 'disconnect'이면 연결종료가 실행된다.
- properties

  - connection-name : (필수값) 커넥션 이름을 설정한다.
  - controlType (value 속성으로 지정됨) : 커넥션의 연결 종료 여부를 지정함.
    - 이 속성 모델링은 아무런 의미가 없으며, 이 컴포넌트의 value 속성에 지정할 때 권장되는 값을 안내하기 위한 용도이다.
    - 이 컴포넌트의 유효한 value로는 'connect' 또는 'disconnect' 가 권장된다.
    - 만약, value값으로 'connect', 1 또는 true 가 전달되면 커넥션 연결이 시도되며, 그 외 값인 경우에는 커넥션 종료가 실행된다.

- data
  - connection control결과로 반환된 connection 관련 정보와 상태를 갖게된다.
  - connection의 실시간 상태를 모니터링 하기 위해서는 connection-data-subscription 컴포넌트를 사용하기를 권장한다.
