# duetimer

세팅된 타임아웃값을 매초 카운트다운하는 컴포넌트이다.
타임아웃값은 days, hours, minutes, seconds 로 모델링시에 정적으로 설정할 수 있으며,
동적으로 설정하기 위해서는 실행중에 value 속성에 timeout(seconds)값을 설정하면 된다.

카운트다운 과정의 format-run, format-stop 에 의한 결과값이 data 속성에 설정된다.

또한, 듀타이머 컴포넌트는 심플한 수평형 프로그레스바의 표현기능을 제공한다.
fill-color에 설정된 색상이 카운트다운에 따라 표현된다.

![fill-color]

[fill-color]: ../images/timer-fill-color.png

## properties

- due
  - timestamp (UTC 기준으로 1970년 1월 1일 0시 0분 0초부터 현재까지 경과된 밀리 초) : 듀 타이머 컴포넌트의 종료시간 타임스탬프 값이다.
  - 듀 타이머 컴포넌트의 value property 이므로, 듀 타이머의 value 속성(due)에 세팅값을 설정할 수 있다.
  - getter: 타이머 종료시간을 가지고 있다.
  - setter: 타이머 종료시간을 설정할 수 있다.
- format-run
  - string
  - format : hh:mm:ss
  - 카운트다운 결과 표현형식
- format-stop
  - string
  - format : --:--:--
  - 카운트다운이 종료되었을 때 표현형식
- background color
  - string, rgb color
  - 컴포넌트의 배경 색상

## hidden properties

- countdown

  - readonly
  - number (seconds)
  - 타이머 설정값 세팅 시점부터 카운트다운된 현재 값을 가지고 있다.
