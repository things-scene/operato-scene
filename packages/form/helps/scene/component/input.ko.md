# Input

키보드나 마우스를 사용해서 사용자로부터 입력을 받아서 처리하는 컴포넌트이다.
Form Container안에 배치되면, 일반적인 HTML Form에서 사용되는 다양한 종류의 HTML Input Element와 동일하게 동작한다.

[The Input (Form Input) element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)

## 종류

- input
- input-text
- input-password
- input-email
- input-search
- input-time
- input-datetime-local
- input-month
- input-week

## Properties

- name
  - type: string
  - form 안의 엘리먼트 이름
- value
  - type: string
  - input element의 값
- placeholder
  - type: string
  - input element의 플레이스홀더
- readonly
  - type: checkbox
  - 읽기 전용 여부
- disabled
  - type: checkbox
  - form 안에서의 동작 불가
- max-length
  - type: number
  - 최대 입력 글자 수
- submit-on-change
  - type: checkbox
  - 엔터키나 포커스 아웃 등으로 값 변경이 확정되면, 자동으로 폼 전송
- spread-on-init
  - type: checkbox
  - 초기값부터 데이타 스프레드되도록 할 것인지를 설정
  - true로 설정하면, 초기값이 input 컴포넌트의 data로 set되어 설정된 데이타 스프레드가 동작한다.
  - false로 설정하면, 초기값은 data로 set되지 않는다.
- next-input
  - type: string
  - 엔터키가 입력되었을 때 자동으로 포커스가 특정 컴포넌트로 이동되도록 설정
- autofocus
  - type: checkbox
  - 보드가 로드될 때, 자동으로 입력 포커스를 갖도록 할 것인지를 설정
- alltime-focus
  - type: checkbox
  - 이 컴포넌트가 포커스를 잃었을 때, alltime-focus-pending에 설정된 시간 후에 자동으로 다시 포커스를 획득하도록 하는 설정
- alltime-focus-pending
  - type: number
  - 이 컴포넌트가 포커스를 잃었을 때, alltime-focus가 설정되면, alltime-focus-pending에 설정된 시간(milli-seconds) 후에 자동으로 다시 포커스를 획득하도록 하는 설정
