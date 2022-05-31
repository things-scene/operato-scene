# grist

데이타그리드 또는 데이타리스트 형태로 멀티플 레코드 데이타를 표현하는 컴포넌트이다.
데이타그리드는 웹어플리케이션 UI에 적합한 형태이며, 데이타리스트는 모바일 앱에 적합한 형태이다.
이는 grist mode 속성으로 설정할 수 있다.

grist 컴포넌트의 value 속성에 다음과 같은 형태의 데이타를 바인딩하면, grist에서 데이타를 각 레코드에 렌더링하는 것을 볼 수 있다.

```
[
  { name: "name 1", description: "record 1", ...  },
  { name: "name 2", description: "record 2", ...  },
  { name: "name 3", description: "record 3", ...  },
  { name: "name 4", description: "record 4", ...  },
]
```

## Properties

- grist mode
  - Grid: 멀티컬럼을 테이블형태로 구성하는 데이타그리드 형태
  - List: 멀티컬럼 정보를 아이템 블록 형태로 구성하는 데이타리스트 형태
  - Card: 카드 스타일의 리스트 형태
  - Depends on device : 현재 디스플레이에 따라 Grid 또는 List 형태로 자동 선택된다
- config
  - grist 구성을 위한 컨피규레이션
  - 컬럼정보, 헤더정보, 레코드 정보, 페이지네이션 정보로 구성된다.
- appendable
  - 새로운 레코드를 추가할 수 있도록 UI기능을 제공할 것인지 설정
- paginatable
  - footer영역에 페이지네이션 기능을 제공하는 footer 영역 UI 기능을 제공할 것인지 설정
- scale
  - grist 내부 내용의 크기 비율을 설정
  - 0.1부터 0.1단위로 설정할 수 있음
  - 기본값은 1
- bound data
  - focused row : 사용자가 마우스나 키보드로 선택 또는 이동한 현재 레코드가 데이타 속성으로 보내진다. 하나의 레코드만 포커스되므로 데이타는 단일 오브젝트 형태가 된다.
  - selected rows : 사용자가 선택 체크박스를 통해서 선택한 레코드들이 데이타 속성으로 보내진다. 여러 레코드가 선택될 수 있으므로 데이타는 레코드의 배열 형태가 된다.
