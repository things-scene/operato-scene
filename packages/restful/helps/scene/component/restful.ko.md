# restful
URL를 제공 받고 URL로만 데이터를 조회할 경우 사용하는 컴포넌트.

## properties

  - url : 데이터 조회 URL
  - period : 데이터 조회 주기
  - data format : Plain Text, JSON, JSONP등 데이터 포멧
    - Plain Text : 서버에서 데이터를 Plain Text로 반환할 경우 사용
    - JSON : 서버에서 데이터를 JSON으로 제공할 경우 
    - JSONP : 데이터를 function형태로 전달 받을 경우 해당 function을 받아서 처리해 주는 기능
  - with credentials : Cross site request 설정