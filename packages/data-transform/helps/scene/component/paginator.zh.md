# paginator
data-paginator根据`单页数据行数`的配置将对应的数据数量，按持续时间（秒）转换传播数据。
可以使用一下的Use Case为例配置提供下一页、上一页、最后一页、当前页等页面数据分页转换功能。

## properties
- 一般显性属性: 
  - 单页数据行数 : 每页数据大小
  - 持续时间 : 每页数据的保留时间，并在此时间之后交付新数据。

- 隐藏属性:
  -   source : 外部输入数据和外部数据必须传递到源。
  -   value : 当前页面
  -   data : 包含与分页相关的所有属性的数据对象
      -   ex)
         ```json
            {
               "list" : [{
                  "Item": "1",
                  "OrderDate": "2021-03-31",
                  "Region": "1",
                  "Rep": true,
                  "Total": 10,
                  "UnitCost": 5,
                  "Units": 2 
               },{
                  "Item": "1",
                  "OrderDate": "2021-03-31",
                  "Region": "1",
                  "Rep": true,
                  "Total": 10,
                  "UnitCost": 5,
                  "Units": 2 
               }...],
               //当前页面，与值相同
               "currentPage" : 1, 
               //根据页面大小和数据总数据计算的页面数
               "totalPage": 3, 
               //数据总数
               "totalRecords": 15, 
               //当前显示数据的第一个数据在所有数据的索引
               "startIndex": 1, 
               //当前显示数据的最后一个数据在所有数据的索引
               "endIndex": 1,
               //总页面
               "pageSize": 3
            }
         ```

## use case 
1. 作为准备步骤，请在Publisher中以数组形式创建数据，然后将其直接发送到data-paginator，或者使用excel组件以数组形式创建数据，然后将数据作为源属性发送到data-paginator组件。
   在此示例中，excel文件上传到了服务器上，并使用excel组件将其link作为数据源，传递到数据分页器。
   ![array 형식 데이터][data_paginator_1]

2. 创建data-paginator组件
   ![data paginator 컴포넌트 생성][data_paginator_2]

3. 在data-paginator组件属性窗口的第4个选项卡的`单页数据行数`属性中，输入要在一页上显示的数据数量，并且将`持续时间`设置为每几秒钟移至下一页。
   ![data paginator 속성 설정][data_paginator_3]

4. data-paginator提供的信息类型有：list（列表）是要在页面上显示的数据列表； currentPage（是当前页面）； totalPage（是要显示的页面总数）； totalRecords， startIndex和endIndex表示要给出的数据的索引，pageSize表示要在数据分页器属性值中输入的一页上显示的数据数。 其中，可以使用访问者的名称输入要使用的内容，并可以传输和显示数据。
   ![데이터 바인딩][data_paginator_4]

5. 确认数据
   ![data paginator 출력 확인][data_paginator_5]

[data_paginator_1]: ../images/data_paginator_1.png
[data_paginator_2]: ../images/data_paginator_2.png
[data_paginator_3]: ../images/data_paginator_3.png
[data_paginator_4]: ../images/data_paginator_4.png
[data_paginator_5]: ../images/data_paginator_5.png