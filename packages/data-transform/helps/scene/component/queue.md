# queque
It is a component that provides a function that adds input data to the queue and deletes the first data sequentially when the number of input data exceeds the queue size. Displayed only when the length of the queue is more than the minimum queue size.
## properties
- Queue size: The maximum number of data that can be put in the queue
- Minimum queue size: The minimum queue size to deliver data
- Queue name: Enter the key value to have the created data as value.
## use case

1. As a preparation step, the data is input through a publisher, considering the characteristics of the queue that receives data one by one and returns an array-type value. In the picture, the random component is used to put data into the data-queue over a certain interval.
   ![array 형식 데이터][data_queue_1]

2. Create a data-queue component in the Etc List of the component toolbar on the left side of the modeling screen.
   ![data queue 컴포넌트 생성][data_queue_2]

3. In the queue size of the 4th tab of the data-queue component property window, enter the maximum number of data that can be in the queue. In the Minimum queue size field, enter the minimum queue size to deliver data, and enter the queue name by selecting a key value to have the created data as value.
   ![data queue 컴포넌트 생성][data_queue_3]

4. Transmit data created in data-queue to other components. In the case of photos, I sent them to the chart component for display.
   ![데이터 바인딩][data_queue_4]

5. Put the queue name set before referring to the data in the 4th tab of the chart.
   ![데이터 바인딩][data_queue_5]

6. If data exceeding the minimum length of the data-queue is input, check that the data value is properly output.
   ![data queue 출력 확인][data_queue_6]

[data_queue_1]: ../images/data_queue_1.png
[data_queue_2]: ../images/data_queue_2.png
[data_queue_3]: ../images/data_queue_3.png
[data_queue_4]: ../images/data_queue_4.png
[data_queue_5]: ../images/data_queue_5.png
[data_queue_6]: ../images/data_queue_6.png