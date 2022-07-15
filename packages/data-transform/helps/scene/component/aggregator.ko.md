# aggregator

data-aggregator은 입력받은 접근자 대상에 해당하는 데이터 중 접근 아이템 명으로 입력된 데이터들의 값을 처리해주는 기능을 갖고 있는 컴포넌트로서, 총합, 평균값, 표준편차, 분산 값 등 원하는 reducing 타입을 선택하면, 입력한 reducing 명을 key 값으로 처리된 값을 제공한다.

## properties

- 접근 대상 : Array가 value로 담겨있는 Object의 key 값을 입력
- 접근자 아이템명 : 처리할 데이터의 속성명을 입력하는 곳
- Reducing명 : 연산 처리 후의 value를 담을 object의 key값을 설정하는 곳
- Reducing타입 :
  - Sum(합계)
  - Average(평균)
  - Standard Deviation(표준편차)
  - Variance(평방 편차)

## use case

1. 준비 단계로 총합, 평균값등 복수의 데이터들에서 단일된 값을 내는 컴포넌트이므로 Publisher에서 Array 데이터를 만들어 data-wrapper에서 object 형태로 만들어 aggregator에 보내거나, excel 컴포넌트 등을 이용하여 Array를 value로 갖는 object 데이터를 생성하여 aggregator 컴포넌트에 데이터를 전달하도록 한다.
   사진에서는 excel파일을 임포트한 다음 wrapper를 통해서 array를 value로 갖는 object를 만들어 data-aggregator에 value로 전달할 수 있도록 셋팅했다.
   ![array 형식 데이터][data_aggregator_1]

1. 모델링 화면 좌측의 컴포넌트 툴바의 Etc List내의 data-aggregator 컴포넌트를 생성한다.
   ![aggregator 생성][data_aggregator_2]

1. data-aggregator 컴포넌트 속성창의 4번째 탭의 접근자 대상에 Array가 value로 담겨있는 Object의 key 값을 입력해준다. 접근자 아이템 명은 처리할 데이터의 속성명을 입력하는 곳이며, Reducing 명은 연산 처리 후의 value를 담을 object의 key값을 설정하는 곳이고, Reducing 타입은 Sum(총합), Average(평균값), Standard Deviation(표준편차), Variance(분산) 총 4개가 있고, 처리할 연산 종류를 고를 수 있다.
   ![data aggregator의 key 값 입력][data_aggregator_3]

1. 작업 확인을 위해 데이터 맵핑을 한다.
   ![data aggregator의 값 확인 ][data_aggregator_4]

1. 데이터 값이 제대로 출력됨을 확인한다.
   ![data aggregator 출력 확인][data_aggregator_5]

[data_aggregator_1]: ../images/data_aggregator_1.png
[data_aggregator_2]: ../images/data_aggregator_2.png
[data_aggregator_3]: ../images/data_aggregator_3.png
[data_aggregator_4]: ../images/data_aggregator_4.png
[data_aggregator_5]: ../images/data_aggregator_5.png
