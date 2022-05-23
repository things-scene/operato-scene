# paginator
data-paginator는 한 페이지에 표시될 갯수를 페이지 사이즈로 설정하여 해당 갯수만큼, 지속시간에 입력된 초의 시간 동안 데이터를 표시해주는 컴포넌트이다.
또한 탭 이벤트를 이용해 처음 페이지로 이동, 마지막 페이지로 이동, 전 페이지, 다음 페이지 이동이 가능하며, 직접 입력받은 페이지로 이동하는 것 또한 가능하다.
## properties
- 일반 속성: 
  - 페이지 사이즈 : 페이지당 데이터 사이즈
  - 지속시간 : 페이지당 데이터의 유지 시간, 해당 시간이 지나면 신규 데이터가 전달된다.

- 숨은 속성:
  -   source : 입력 받은 데이터, 외부 데이터는 source에 전달이 되어야 한다.
  -   value : 방금 전달한 페이지
  -   data : 페이지 관련된 모든 속성을 보유한 Data Object
      -   ex)
         ```json
            {
               "list" : [{
                  "Item": "1",
                  "OrderDate": "2021-03-31",
                  "Region": "1",
                  "Rep": true,
                  "Total": 10,
                  "UnitCost": 5,
                  "Units": 2 
               },{
                  "Item": "1",
                  "OrderDate": "2021-03-31",
                  "Region": "1",
                  "Rep": true,
                  "Total": 10,
                  "UnitCost": 5,
                  "Units": 2 
               }...],
               //방금 전달한 페이지, value와 같음
               "currentPage" : 1, 
               //페이지 사이즈와 전체 데이터를 기준으로 계산한 페이지 수
               "totalPage": 3, 
               //총 레코드 수 
               "totalRecords": 15, 
               //현재 표시중인 데이타의 첫 데이터가 전체 데이터에서의 index
               "startIndex": 1, 
               //현재 표시중인 데이타의 마지막 데이터가 전체 데이터에서의 index
               "endIndex": 1,
               //총 페이지 수 
               "pageSize": 3
            }
         ```

## use case 
1. 준비 단계로서 Publisher에서 데이터를 Array 형태로 만들어 직접 paginator로 보내거나, excel 컴포넌트 등을 이용하여 Array 형식의 데이터를 생성하여 data-paginator 컴포넌트에 source 속성으로 데이터를 전달하도록 한다.
   사진에서는 excel파일을 임포트하여 data-paginator에 source로 전달할 수 있도록 셋팅했다.
   ![array 형식 데이터][data_paginator_1]

2. 모델링 화면 좌측의 컴포넌트 툴바의 Etc List내의 data-paginator 컴포넌트를 생성한다.
   ![data paginator 컴포넌트 생성][data_paginator_2]

3. data-paginator 컴포넌트 속성창의 4번째 탭의 페이지 사이즈 속성에는 한 페이지에 표시할 데이터의 갯수를 입력해주고, 지속시간은 자동으로 페이지 넘김을 할 경우 몇 초를 주기로 다음 페이지로 넘어갈 것인지를 설정할 수 있다.
   ![data paginator 속성 설정][data_paginator_3]

4. data-paginator에서 제공하는 정보의 종류는 가장 기본이 해당 페이지에 표시되어야할 데이터 리스트인 list, 현재 페이지를 뜻하는 currentPage, 총 표시할 페이지 수인 totalPage와 총 표시될 데이터의 갯수를 뜻하는 totalRecords, 보여주고 있는 데이터의 인덱스를 나타내는 startIndex와 endIndex, 그리고 data-paginator의 속성값에 입력한 한 페이지에 표시할 데이터의 갯수를 뜻하는 pageSize가 있다. 그 중에서 사용하고 싶은 내용을 접근자 명에 입력하여, 데이터를 전송하여 표시할 수 있다.
   ![데이터 바인딩][data_paginator_4]

5. 데이터 값이 제대로 출력됨을 확인한다.
   ![data paginator 출력 확인][data_paginator_5]

[data_paginator_1]: ../images/data_paginator_1.png
[data_paginator_2]: ../images/data_paginator_2.png
[data_paginator_3]: ../images/data_paginator_3.png
[data_paginator_4]: ../images/data_paginator_4.png
[data_paginator_5]: ../images/data_paginator_5.png