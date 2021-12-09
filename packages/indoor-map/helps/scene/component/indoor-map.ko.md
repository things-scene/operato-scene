# indoor-map

## example

사각형 컴포넌트에 이벤트를 걸어 인도어 층을 제어
> - **사각형 컴포넌트에 click이벤트를 걸어 Indoor에 전달**  
> - **Indoor의 value속성을 바꿔주면 Floor가 변경된다.**  

![gif][gif-01]  


[gif-01]: ../images/indoor-button-finish-01.gif

1. 3개의 층을 가진 Indoor를 생성한다.

![인도어][indoor-create]  

2. 구별을 위해 층마다 텍스트를 넣었다.

![인도어][indoor-text]  


3. 인도어맵의 아이디를 'indoor'로 지정한다.

![인도어][indoor-id]  

4. 버튼 이벤트 추가
- 사각형 3개를 그린 후, '효과 창'에서 변수정보에 indoor를 선택한다.  
(변수 정보에는 기본 이벤트와 컴포넌트들의 아이디 리스트가 나온다.)   
![버튼이벤트][button-02]

- 각 사각형마다 값을 매핑한다. (사각형을 클릭할 시, indoor 아이디를 가진 컴포넌트에 '0'이란 데이터를 넘겨주게 된다.)
  - 1층 - 0
  - 2층 - 1
  - 3층 - 2  

![버튼이벤트][button-03]  


[button-02]: ../images/button-evnet-mapping-02.png

[button-03]: ../images/button-evnet-mapping-03.png

5. indoor map 설정

- 인도어맵 컴포넌트의 데이터 바인딩 설정을 아래의 그림과 같이 설정한다.  
(데이터를 받을때 자신의 value 속성을 같이 바꿔주는 설정) 

![버튼이벤트][indoor-setting]

6.  결과 확인
  - 모든 설정이 완료되었다면 아래와 같이 **사각형을 클릭할 때마다 인도어 맵의 층이 바뀌는 것**을 확인할 수 있다.
  ![gif-01]

[gif-01]: ../images/indoor-button-finish-01.gif



[indoor-create]: ../images/indoor-create-01.png

[indoor-text]: ../images/indoor-create-02.png

[indoor-id]: ../images/indoor-create-03.png

[indoor-setting]: ../images/indoor-setting-01.png