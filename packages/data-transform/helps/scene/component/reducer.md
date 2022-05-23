# reducer

The data-reducer is a component that has the function of processing the values of the data entered as the name of the access item among the data corresponding to the input accessor target. Provides the value processed by the input reducing name as the key value.

## properties

- Accessor's target: Enter the key value of the object that the array is contained in
- Accessor's item: A place to enter the attribute name of the data to be processed
- Reducing property name: A place to set the key value of the object that will contain the value after operation processing
- Reducing type:
   -Sum
   -Average
   -Standard Deviation
   -Variance

## use case

1. Since it is a component that generates a single value from multiple data such as total and average value as a preparatory step, make Array data in Publisher and make it in object form in data-wrapper and send it to reducer, or object having Array as value using excel component Create data and pass the data to the reducer component.
    In the photo, after importing the excel file, an object with an array as a value is created through a wrapper and set so that it can be passed to the data-reducer as a value.
   ![array 형식 데이터][data_reducer_1]

2. Create a data-reducer component in the Etc List of the component toolbar on the left side of the modeling screen.
   ![reducer 생성][data_reducer_2]

3. Enter the key value of the object whose Array value is contained in the accessor target of the 4th tab of the data-reducer component property window. The accessor item name is the place to enter the property name of the data to be processed, the reducing name is the place to set the key value of the object that will contain the value after operation processing, and the reducing type is Sum(total), Average(average value), Standard Deviation( There are a total of 4 standard deviation) and Variance, and you can choose the type of operation to be processed.
   ![data reducer의 key 값 입력][data_reducer_3]

4. Data mapping is performed to confirm the work.
   ![data reducer의 값 확인 ][data_reducer_4]

5. Check data value
   ![data reducer 출력 확인][data_reducer_5]

[data_reducer_1]: ../images/data_reducer_1.png
[data_reducer_2]: ../images/data_reducer_2.png
[data_reducer_3]: ../images/data_reducer_3.png
[data_reducer_4]: ../images/data_reducer_4.png
[data_reducer_5]: ../images/data_reducer_5.png
