# aggregator

data-aggregator 是具有处理与输入访问者目标相对应的数据之中作为访问项名称输入的数据的值的功能的组件。
选择所需的 data-aggregator 类型(总和，平均值，标准偏差和方差)，会以输入的 reducing 名为 key 提供结果。

## properties

- 提取目标 : 输入包含数组的对象的键名称
- 提取路径 : 在何处输入要处理的数据的属性名称
- 数据简化属性名 : 设置对象的键的名称，最终对象将包含键值
- 数据简化方式 :
  - 总和、平均值、标准偏差、方差

## use case

1.由于它是可以在从多个数据（例如合计和平均值）生成单个值的一个组件，因此在 Publisher 中制作 Array 数据，并在数据包装器中将其制成对象形式，然后将其发送给 aggregator 或 excel 组件作为值创建数据并将数据传递给 aggregator 组件。
在照片中，导入 excel 文件后，通过 wrapper 创建并设置了一个值为数组的对象，以便可以将其作为值传递给 data-aggregator。
![array 형식 데이터][data_aggregator_1]

2. 在建模屏幕左侧的组件工具栏的“其他列表”中创建一个 data-aggregator 组件。
   ![aggregator 생성][data_aggregator_2]

3. data-aggregator 组件属性页面上的提取目标中输入`值为Array`的对象的`key`。
   提取目标是数组中单一对象的`Key`，数据简化属性名是计算后创建的的`Key`名称, 数据简化方式有总和、平均值、标准偏差、方差 4 总，可以其中选择方式。
   ![data aggregator의 key 값 입력][data_aggregator_3]

4. 传递数据到对象组件中
   ![data aggregator의 값 확인 ][data_aggregator_4]

5. 确认数据
   ![data aggregator 출력 확인][data_aggregator_5]

[data_aggregator_1]: ../images/data_aggregator_1.png
[data_aggregator_2]: ../images/data_aggregator_2.png
[data_aggregator_3]: ../images/data_aggregator_3.png
[data_aggregator_4]: ../images/data_aggregator_4.png
[data_aggregator_5]: ../images/data_aggregator_5.png
