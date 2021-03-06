# table

여러개의 데이터를 테이블의 형태로 표현할 때 사용하는 컴포넌트.

- Category : Table
- 속성(테이블) :
1. Row & Column(Number) - 행과 열의 개수를 조절
![Table-행열 갯수][table-02]
1. Cell Width & Height - 테이블의 빨간 핸들러를 마우스로 드래그하면 각 셀마다 크기를 조절할 수 있다.  
![Table-행열의 크기][table-03]

- 속성(셀) :
1. Border Style - 선택된 셀의 테두리의 굵기 및 색상을 변경. 스타일 값을 입력 후 ![Table-셀 스타일 종류][table-04] 중 적용할 셀의 버튼을 누른다.
![Table-셀 스타일][table-05]
1. Border Type - 선택 된 셀의 선의 종류를 변경. 테두리 종류를 선택 후 ![Table-셀 스타일 종류][table-04] 중 적용할 셀의 버튼을 누른다.  
__(!!셀의 테두리와 테이블의 테두리는 서로 다르게 적용)__
1. Merge Cells - 선택된 셀을 병합(붙어있는 셀만 적용)
1. Split Cells - 셀의 병합을 해제
1. Delete Row - 선택된 행을 삭제
![Table-셀 행 삭제][table-06]
1. Delete Column - 선택된 열을 삭제
![Table-셀 열 삭제][table-07]
1. Insert Above - 선택된 셀의 위쪽에 새로운 셀 삽입
![Table-셀 위쪽 삽입][table-08]
1. Insert Below - 선택된 셀의 아래쪽에 새로운 셀 삽입
![Table-셀 아래쪽 삽입][table-09]
1. Insert Left - 선택된 셀의 왼쪽에 새로운 셀 삽입
![Table-셀 왼쪽 삽입][table-10]
1. Insert Right - 선택된 셀의 오른쪽에 새로운 셀 삽입
![Table-셀 오른쪽 삽입][table-11]
1. Distribute Horizontal - 선택된 열들의 넓이를 같게
![Table-셀 넓이 같게][table-12]
1. Distribute Vertical - 선택된 행들의 높이를 같게
![Table-셀 높이 같게][table-13]
1. Data Key - 테이블에 데이터를 매핑할 때 데이터 헤더의 필드명. DataKey는 열이 위치하는 번호가 아닌 반드시 필드명으로 입력한다.
1. Data Index - 테이블에 데이터를 매핑할 때 데이터 행의 위치. DataIndex는 헤더를 제외한 데이터의 시작번호를 0으로 한다.  
![Table-데이터 예시][table-14]  
위 사진과 같은 데이터가 왔을시 Date의 '01-03'의 데이터를 표시한다면 DataKey = Date, DataIndex = 2를 입력한다.



[table-01]: ../images/table-01.png

[table-02]: ../images/table-02.png

[table-03]: ../images/table-03.png

[table-04]: ../images/table-04.png

[table-05]: ../images/table-05.png

[table-06]: ../images/table-06.png

[table-07]: ../images/table-07.png

[table-08]: ../images/table-08.png

[table-09]: ../images/table-09.png

[table-10]: ../images/table-10.png

[table-11]: ../images/table-11.png

[table-12]: ../images/table-12.png

[table-13]: ../images/table-13.png

[table-14]: ../images/table-14.png