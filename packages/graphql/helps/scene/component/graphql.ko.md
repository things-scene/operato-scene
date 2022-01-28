# graphql

Graphql API를 사용할 수 있는 데이타소스 컴포넌트 패미리이다.

- graphql-client
  - Graphql 컴포넌트 패미리에서 사용할 서버를 연결하는 컴포넌트이다.
- graphql-query
- graphql-mutation

## properties for graphql-client

- endpoint
  - Graphql Service를 제공하는 서버의 접속 정보를 입력한다.
  - graphql-client 컴포넌트에서 설정한다.
  - 현재는 서버 인증에 대한 기능이 없으므로, 인증을 요구하지 않는 서비스나 이미 인증을 통과한 경우에 사용한다.(Origin 서버 등)
    - '/graphql'
    - 'http://localhost:3000/graphql'
  - 이 컴포넌트는 graphql-query 또는 graphql-mutation 컴포넌트의 client component ID 속성에 설정되는 용도이다.

## properties for graphql-query/mutation

- client component ID
  - endpoint가 설정된 graphql-client의 ID를 설정한다.
- period
  - 주기적인 query/mutation 호출이 필요한 경우에 그 주기를 second 단위로 설정한다.
- query
  - 호출하고자 하는 graphql query를 설정한다.
- auto start
  - 보드가 시작될 때 자동으로 호출할 지 여부를 설정한다.

## chrome 브라우저에서 데이타 수신 확인하기

- query/mutation 결과는 바로 이 컴포넌트의 data속성이 되므로, 그 결과를 데이터바인딩에 적용할 수 있다.
- 데이타의 형태는 query에 의해서 결정된다.
- 실제 데이터의 형태는 크롬 브라우저의 개발자 도구의 'Network' - 'XHR'에서 확인할 수 있다.
