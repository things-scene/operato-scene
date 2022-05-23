# enhancer
The data-enhancer is a component that adds a property that plays an index role as a value input to the array corresponding to the key of the accessor target in the object.
   
## properties
 - Index name: The name of the property to act as an index
 - Accessor target: The key value containing the object of the Array
 - Index type: Provided in the form of alternately inserting 0 and 1 as an index and sequentially inserting the index number of data from 0
## use case
1. Create a data-enhancer component in Etc List of the component toolbar on the left side of the modeling screen.
   ![enhancer 생성][data_enhancer_1]

2. Through data-wrapper, data created in object form is delivered as value to enhancer.
   ```json
   {
      "in_wrapper":[
         {
            "number" : 1,
            "english" : "a",
            "idx" : 0,
         },
         {
            "number" : 2,
            "english" : "b",
            "idx" : 1,
         },
         {
            "number" : 3,
            "english" : "c",
            "idx" : 2,
         },
         {
            "number" : 1,
            "english" : "c",
            "idx" : 3,
         }
      ]
   }
   ```
   ![데이터 전달][data_enhancer_2]
   
3. Enter enhancer's properties
- Enter the key value containing the object of the array in the accessor target of the properties tab of the data-enhancer component property window.
- in the index name, set the name of the property that will serve as the index.
- There are two types of index types: 0 and 1 are alternately entered as an index, and data index numbers are sequentially inserted from 0.
- please select the index type to be used.
   ![data enhancer의 key 값 입력][data_enhancer_3]

4. To confirm the work, data mapping is performed by entering the key value entered before the accessor.
   ![data enhancer의 값 확인 ][data_enhancer_4]

5. Check that the data value is properly output.
   ![data enhancer 출력 확인][data_enhancer_5]

6. For reference, if the index type is set to standard that selects indexes in sequence from 0, the data values are displayed as follows.
   ![data enhancer 출력 확인][data_enhancer_6]

[data_enhancer_1]: ../images/data_enhancer_1.png
[data_enhancer_2]: ../images/data_enhancer_2.png
[data_enhancer_3]: ../images/data_enhancer_3.png
[data_enhancer_4]: ../images/data_enhancer_4.png
[data_enhancer_5]: ../images/data_enhancer_5.png
[data_enhancer_6]: ../images/data_enhancer_6.png