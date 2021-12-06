# timer

세팅된 타임아웃값을 매초 카운트다운하는 컴포넌트이다.
타임아웃값은 days, hours, minutes, seconds 로 모델링시에 정적으로 설정할 수 있으며,
동적으로 설정하기 위해서는 실행중에 value 속성에 timeout(seconds)값을 설정하면 된다.

카운트다운 과정의 format-run, format-stop 에 의한 결과값이 data 속성에 설정된다.

또한, 타이머 컴포넌트는 심플한 수평형 프로그레스바의 표현기능을 제공한다.
fill-color에 설정된 색상이 카운트다운에 따라 표현된다.

![fill-color]

[fill-color]: ../images/timer-fill-color.png

## properties

- days
  - number
  - 타임아웃 날자 설정값(0- )
- hours
  - number
  - 타임아웃 시간 설정값(0-23)
- minutes
  - number
  - 타임아웃 분 설정값(0-59)
- seconds
  - number
  - 타임아웃 초 설정값(0-59)
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

- timeout

  - number (seconds)
  - 타이머의 (초단위) 세팅 값이다.
  - 타이머 컴포넌트의 value property 이므로, 타이머의 value 속성에 세팅값을 설정할 수 있다.

    > ex) tap event에서 "set value to target component"옵션 사용, 아래 셈플은 class를 통한 데이터 전달 사용

    ![button]

    > ex) 데이터 공유 옵션에서 timer의 value로 데이터 전달, 아래 셈플에서는 key를 사용한 데이터 전달 사용

    ![databind]

  [button]: ../images/rect-button.png
  [databind]: ../images/timer-data-bind.png

- countdown
  - readonly
  - number (seconds)
  - 타이머 설정값 세팅 시점부터 카운트다운된 현재 값을 가지고 있다.
