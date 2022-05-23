# wrapper
Data-wrapper은 Array 형식의 데이터를 속성명으로 입력받은 값을 key값으로한 Object로 바꿔주는 컴포넌트이다.
## properties
- 속성명 : 생성할 object의 key값이다.
## use case 

1. 준비 단계로서 Publisher에서 데이터를 Array 형태로 만들어 직접 wrapper로 보내거나, excel 컴포넌트 등을 이용하여 Array 형식의 데이터를 생성하여 wrapper 컴포넌트에 데이터를 전달하도록 한다.
   사진에서는 rect 컴포넌트에서 2개의 object를 갖고 있는 Array 형식의 데이터를 만들어, wrapper에 value로 전달할 수 있도록 셋팅했다.
   ```json
   {
      "wrapper":[
         {
            "number" : 1,
            "english" : "a"
         },
         {
            "number" : 2,
            "english" : "b"
         },
         {
            "number" : 3,
            "english" : "c"
         },
         {
            "number" : 1,
            "english" : "c"
         }
      ]
   }
   ```
   ![array 형식 데이터][data_wrapper_1]

2. 모델링 화면 좌측의 컴포넌트 툴바의 Etc List내의 data-wrapper 컴포넌트를 생성한다.
   ![data wrapper 컴포넌트 생성][data_wrapper_2]

3. data-wrapper 컴포넌트 속성창의 4번째 탭의 속성명은 생성할 object의 key값이다.
   따라서 앞의 단계에서 data-wrapper 컴포넌트로 보낸 array 데이터를 value로 가질 key 값을 해당 필드에 입력한다.
   ![data wrapper의 key 값 입력][data_wrapper_3]

4. 해당 key 값을 통해 데이터 접근이 가능한지 확인하기 위해 접근자에 앞서 입력한 key 값을 입력하여, 데이터 전송을 한다.
   ![data wrapper key 값 확인][data_wrapper_4]

5. 데이터 값이 제대로 출력됨을 확인한다.
   ![data wrapper 출력 확인][data_wrapper_5]

[data_wrapper_1]: ../images/data_wrapper_1.png
[data_wrapper_2]: ../images/data_wrapper_2.png
[data_wrapper_3]: ../images/data_wrapper_3.png
[data_wrapper_4]: ../images/data_wrapper_4.png
[data_wrapper_5]: ../images/data_wrapper_5.png
