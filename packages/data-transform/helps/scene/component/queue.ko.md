# queque
입력받은 데이터를 Queue에 추가하고, 입력받은 데이터의 수가 큐 사이즈를 초과할 경우, 먼저 들어온 데이터부터 순차적으로 삭제해주는 기능을 제공하는 컴포넌트이다. Queue의 길이가 최소 큐 사이즈 이상일 때만 표시하여 준다.

## properties
- 큐 사이즈 : 큐에 들어갈 수 있는 최대의 데이터 갯수
- 최소 큐 사이즈 : 데이터를 전달할 최소의 큐의 사이즈
- 큐 이름 : 만들어진 데이터를 value로 가질 key값을 정하여 입력한다.

## use case

1. 준비 단계로서 데이터를 하나씩 받아서 array형태의 value를 리턴하는 queue의 특성을 고려해 publisher등을 통해서 데이터를 입력해준다. 사진에서는 random 컴포넌트를 활용해서 일정 간격에 걸쳐 데이터를 data-queue에 넣고 있다.
   ![array 형식 데이터][data_queue_1]

2. 모델링 화면 좌측의 컴포넌트 툴바의 Etc List내의 data-queue 컴포넌트를 생성한다.
   ![data queue 컴포넌트 생성][data_queue_2]

3. data-queue 컴포넌트 속성창의 4번째 탭의 큐 사이즈에는 큐에 들어갈 수 있는 최대의 데이터 갯수를 입력하면 된다. 최소 큐 사이즈 필드에는 데이터를 전달할 최소의 큐의 사이즈를 입력하고, 큐 이름은 만들어진 데이터를 value로 가질 key값을 정하여 입력한다.
   ![data queue 컴포넌트 생성][data_queue_3]

4. data-queue에서 만든 데이터를 다른 컴포넌트에 전송한다. 사진의 경우에는 chart 컴포넌트로 보내어 표시하도록 했다.
   ![데이터 바인딩][data_queue_4]

5. chart의 4번째 탭의 데이터 참조에 앞서 설정했던 큐 이름을 넣어준다.
   ![데이터 바인딩][data_queue_5]

6. data-queue가 최소 길이를 넘는 데이터가 입력되었을 경우 데이터 값이 제대로 출력됨을 확인한다.
   ![data queue 출력 확인][data_queue_6]

[data_queue_1]: ../images/data_queue_1.png
[data_queue_2]: ../images/data_queue_2.png
[data_queue_3]: ../images/data_queue_3.png
[data_queue_4]: ../images/data_queue_4.png
[data_queue_5]: ../images/data_queue_5.png
[data_queue_6]: ../images/data_queue_6.png