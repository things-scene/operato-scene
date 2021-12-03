# grist action

특정 Grist 컴포넌트에 연결되어 사용자의 마우스클릭(또는 탭) 이벤트가 발생했을 때, grist의 데이타를 가져오거나,
grist에 동작을 지시하는 컴포넌트이다.

그 밖의 일반적인 기능은 Rect(사각형) 컴포넌트와 동일하게 동작한다.

## Properties

- target grist
  - 연결하고자하는 grist의 아이디를 설정한다.
- action
  - Get page information
    - 페이지네이션 정보 가져오기
    - graphql query resolver 에 직접 사용될 수 있는 입력 변수 형식으로 가공된 데이타로 제공됨
    ```
    {
      page,
      limit,
      sorters
    }
    ```
  - Get all rows
    - 모든 레코드 데이터 가져오기
  - Get selected rows
    - 체크된 레코드 데이터 가져오기
    ```
    {
      patches, /* 다중 레코드 업데이트용 graphql mutation resolver에 직접 사용될 수 있는 patch 데이타 형식으로 가공된 데이타 */
      original /* 체크된 레코드 데이터 */
    }
    ```
  - Get dirty rows
    - 변경 사항이 있는 데이터 가져오기
    - 다중 레코드 업데이트용 graphql mutation resolver에 직접 사용될 수 있는 patch 데이타 형식으로 가공된 데이타로 제공됨
  - Add a row
    - 행 추가
  - Delete selected rows
    - 선택 행 삭제
  - Commit
    - 변경 사항을 데이터에 적용
- run at startup
  - 뷰어 시작 시 자동 실행 여부
- record adder format
  - 행 추가 시의 포맷
