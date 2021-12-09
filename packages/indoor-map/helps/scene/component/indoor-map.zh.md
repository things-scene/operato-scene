# indoor-map

## example

通过触发矩形组件上的事件来控制室内层
> - **将矩形组件的click事件传递到Indoor组件**  
> - **更改Indoor组件的value属性Floor会发生变化**  

![gif][gif-01]  


[gif-01]: ../images/indoor-button-finish-01.gif

1. 创建具有三层的indoor map

  ![indoor][indoor-create]  

2. 为了区分为每层更改显示层数

  ![indoor][indoor-text]  


3. 指定室内地图的ID。

  ![indoor][indoor-id]  

4. 增加按钮
   - 绘制3个矩形后，在“效果窗口”中的点击事件中indoor作为变量信息。
   (在变量信息中，显示基本事件处理方法和组件的ID的列表。)   
   ![buttonEvent][button-02]

   - 每个矩形的地图值。 （单击矩形时，数据“0”将传递到具有室内ID的组件。）
     - 1층 - 0
     - 2층 - 1
     - 3층 - 2  

  ![buttonEvent][button-03]  


  [button-02]: ../images/button-evnet-mapping-02.png

  [button-03]: ../images/button-evnet-mapping-03.png

5. indoor map配置

   - 如下图设置室内地图组件的数据绑定设置。
    （设置为在接收数据时更改其value属性）

   ![buttonEvent][indoor-setting]

6.  确认结果
    - 如果所有设置均已完成，则每次单击矩形时，都可以看到室内地图图层发生变化，如下所示。
    ![gif-01]

    [gif-01]: ../images/indoor-button-finish-01.gif



[indoor-create]: ../images/indoor-create-01.png

[indoor-text]: ../images/indoor-create-02.png

[indoor-id]: ../images/indoor-create-03.png

[indoor-setting]: ../images/indoor-setting-01.png