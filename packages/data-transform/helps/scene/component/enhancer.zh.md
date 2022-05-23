# enhancer
data-enhancer是一个组件，该组件将与索引有关的属性作为值输入添加到与对象中访问者目标的键相对应的数组中。
   
## properties
 - 索引名称 : 用作索引的属性的名称
 - 提取目标 : 包含数组对象的键值
 - 索引类型 : 它提供交替输入0和1作为索引的形式和以从0开始依次增加索引的形式

## use case
1. 在建模屏幕左侧的组件工具栏的`ETC`中创建一个`data-enhancer`组件。
   ![enhancer 생성][data_enhancer_1]

2. 通过`data-wrapper`，以对象形式创建的数据作为值传输到增强器。
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
   
3. 在数据data-enhancer属性窗口的属性选项卡的`提取目标`中，输入包含数组对象的键值。
   在`索引名称`中，设置将用作索引的属性的名称。
   有两种类型的`索引类型`：交替输入0和1作为索引或从0开始顺序插入数据索引号，并从这两种类型中选择要使用的索引类型。
   ![data enhancer의 key 값 입력][data_enhancer_3]

4. 为了确认结果，输入在之前输入的`提取目标`的`键值`来执行数据映射。
   ![data enhancer의 값 확인 ][data_enhancer_4]

5. 确认数据
   ![data enhancer 출력 확인][data_enhancer_5]

6. 如果使用增量索引结果如下.
   ![data enhancer 출력 확인][data_enhancer_6]

[data_enhancer_1]: ../images/data_enhancer_1.png
[data_enhancer_2]: ../images/data_enhancer_2.png
[data_enhancer_3]: ../images/data_enhancer_3.png
[data_enhancer_4]: ../images/data_enhancer_4.png
[data_enhancer_5]: ../images/data_enhancer_5.png
[data_enhancer_6]: ../images/data_enhancer_6.png