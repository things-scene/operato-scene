# wrapper
Data-wrapper is a component that converts Array data into an Object with the value input as a property name as a key value.
## properties
-property name: This is the key value of the object to be created.
## use case 

1. As a preparatory step, make data in the form of an array in Publisher and send it to the wrapper directly, or create data in the form of an array using an excel component and deliver the data to the wrapper component.
   In the photo, data in an Array format with two objects in the rect component was created and set to be passed to the wrapper as a value.
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

2. Create the data-wrapper component in Etc List of the component toolbar on the left side of the modeling screen.
   ![data wrapper 컴포넌트 생성][data_wrapper_2]

3. The property name of the 4th tab of the data-wrapper component property window is the key value of the object to be created.
   Therefore, enter the key value that will have the array data sent to the data-wrapper component as the value in the previous step in the relevant field.
   ![data wrapper의 key 값 입력][data_wrapper_3]

4. In order to check whether data access is possible through the key value, data is transmitted by entering the key value entered before the accessor.
   ![data wrapper key 값 확인][data_wrapper_4]

5. Check data value is properly output.
   ![data wrapper 출력 확인][data_wrapper_5]

[data_wrapper_1]: ../images/data_wrapper_1.png
[data_wrapper_2]: ../images/data_wrapper_2.png
[data_wrapper_3]: ../images/data_wrapper_3.png
[data_wrapper_4]: ../images/data_wrapper_4.png
[data_wrapper_5]: ../images/data_wrapper_5.png
