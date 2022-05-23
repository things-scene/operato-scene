# wrapper
`Data-wrapper`是将输入的值作为属性名称作为键值将Array数据转换为Object的组件。
## properties
- 属性名称 : 需创建object的key
## use case 

1. 作为准备步骤，请在Publisher中以数组的形式制作数据，然后将其直接发送到`data-wrapper`，或者使用excel组件以数组的形式创建数据，然后将数据传递到`data-wrapper`组件。
   在照片中，创建了具有rect组件中多个对象的Array格式的数据，并将其设置为作为值传递给`data-wrapper`。
   ```json
   [
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
   ```
   ![array 형식 데이터][data_wrapper_1]

2. 在建模屏幕左侧的组件工具栏的“其他列表”中创建数据`data-wrapper`组件。
   ![data wrapper 컴포넌트 생성][data_wrapper_2]

3. `data-wrapper`组件属性窗口的第4个选项卡的属性名称是要创建的对象的键。
   因此，输入在在上一步中创建的data的名称
   ![data wrapper의 key 값 입력][data_wrapper_3]

4. 为了检查是否可以通过相应的键值进行数据访问，通过输入在访问器之前输入的键值来传输数据。
   ![data wrapper key 값 확인][data_wrapper_4]

5. 检查数据值是否正确输出。
   ![data wrapper 출력 확인][data_wrapper_5]

[data_wrapper_1]: ../images/data_wrapper_1.png
[data_wrapper_2]: ../images/data_wrapper_2.png
[data_wrapper_3]: ../images/data_wrapper_3.png
[data_wrapper_4]: ../images/data_wrapper_4.png
[data_wrapper_5]: ../images/data_wrapper_5.png
