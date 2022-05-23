# queque
它是提供将输入数据添加到队列并在输入数据的数量超过队列大小时顺序删除第一个数据的功能的组件。 仅在队列长度大于最小队列大小时显示。

## properties
- 最大队列大小：可以放入队列的最大数据数
- 最小队列大小：传递数据的最小队列大小
- 队列名称：输入键值以将创建的数据作为值。

## use case

1. 作为准备步骤，通过发布者输入数据，考虑队列的特性，该队列一个接一个地接收数据并返回数组类型的值。 在图片中，随机分量用于在特定间隔内将数据放入数据队列。
   ![array 형식 데이터][data_queue_1]

2. 在建模屏幕左侧的组件工具栏的“其他列表”中创建一个数据队列组件。
   ![data queue 컴포넌트 생성][data_queue_2]

3. 在数据队列组件属性窗口的第4个选项卡的最大队列大小中，输入可以在队列中的最大数据数。 在最小队列大小字段中，输入传递数据的最小队列大小，然后通过选择键值以将创建的数据作为值来输入队列名称。
   ![data queue 컴포넌트 생성][data_queue_3]

4. 将在数据队列中创建的数据传输到其他组件。 对于照片，我将它们发送到了图表组件以进行显示。
   ![데이터 바인딩][data_queue_4]

5. 在引用图表第四选项卡中的数据之前，请输入设置的队列名称。
   ![데이터 바인딩][data_queue_5]

6. 如果输入的数据超过了数据队列的最小长度，请检查是否正确输出了数据值。
   ![data queue 출력 확인][data_queue_6]

[data_queue_1]: ../images/data_queue_1.png
[data_queue_2]: ../images/data_queue_2.png
[data_queue_3]: ../images/data_queue_3.png
[data_queue_4]: ../images/data_queue_4.png
[data_queue_5]: ../images/data_queue_5.png
[data_queue_6]: ../images/data_queue_6.png