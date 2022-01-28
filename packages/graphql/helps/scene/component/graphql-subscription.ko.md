# graphql subscription

Graphql publish 서비스로부터 푸시되는 메시지를 수신하고자하는 데이타소스 컴포넌트이다.

## properties

- endpoint
  - Graphql Service를 제공하는 서버의 접속 정보를 입력한다.
  - graphql-client 컴포넌트에서 설정한다.
  - 현재는 서버 인증에 대한 기능이 없으므로, 인증을 요구하지 않는 서비스나 이미 인증을 통과한 경우에 사용한다.(Origin 서버 등)
    - eg. 'ws://localhost:3000/subscriptions'
- query
  - subscription query를 설정한다.

## chrome 브라우저에서 데이타 수신 확인하기

- subscription 데이타는 바로 이 컴포넌트의 data속성이 되므로, 그 결과를 데이터바인딩에 적용할 수 있다.
- subscription 데이타의 형태는 query에 의해서 결정된다.
- 실제 subscription 데이터의 형태는 크롬 브라우저의 개발자 도구의 'Network' - 'WS'에서 확인할 수 있다.
