# rack

창고용 랙을 표현할 때 사용하는 컴포넌트. 높이와 층을 적용할 수 있으며 랙과 층마다 고유 ID를 부여할 수 있다.

## properties

1. Depth(Number) - 3D 모델링으로 전환되었을 때, 한 층의 높이
2. Shelves(Number) - 3D 모델링으로 전환되었을 때, 층의 개수
3. Location Pattern(String) - 랙의 위치 및 층에 고유한 ID를 부여할 때 정의하는 패턴. {}안에 Z(Zone), S(Selection), U(Unit), Sh(Shelf)의 패턴을 정의한다.
4. Zone(String) - 패턴에 적용 될 Zone의 값
5. Selection(String) - 패턴에 적용 될 Selection 값
6. Unit(String) - 패턴에 적용 될 Unit 값
7. Shelf Pattern(String) - 패턴에 적용 될 Shelf Pattern 값  
   \# - 층의 숫자가 동적으로 적용  
   0 - 층의 숫자가 0의 갯수대로 자릿수 고정(ex. 0 = 0~9 / 00 = 00~99)


