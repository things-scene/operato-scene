# paginator
The data-paginator is a component that sets the number of pages to be displayed on a page as the page size and displays data for the number of seconds entered in the duration.
In addition, it is possible to move to the first page, to the last page, to the previous page, to the next page by using the tap event, and to move to the page that was directly entered.
## properties
- General properties:
   - Page size: Data size per page
   - Duration: The retention time of data per pay, and new data is delivered after that time.

- Hidden properties:
   - source: The received data and external data must be delivered to the source.
   - value: the page just delivered
   - data: Data Object that holds all the properties related to the page
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
               //page just delivered, same as value
               "currentPage" : 1, 
               //Number of pages calculated based on page size and total data
               "totalPage": 3, 
               //Total number of records
               "totalRecords": 15, 
               //The first data of the currently displayed data is the index of all data
               "startIndex": 1, 
               //The last data of the currently displayed data is the index of all data
               "endIndex": 1,
               //Total number of pages
               "pageSize": 3
            }
         ```

## use case 
1. As a preparatory step, make the data in the form of an array in Publisher and send it directly to the paginator, or create the data in the form of an array using an excel component, and send the data as a source property to the data-paginator component.
    In the picture, the excel file was imported and set to be delivered as a source to the data-paginator.
   ![array 형식 데이터][data_paginator_1]

2. Create a data-paginator component in the Etc List of the component toolbar on the left side of the modeling screen.
   ![data paginator 컴포넌트 생성][data_paginator_2]

3. In the page size property of the 4th tab of the data-paginator component property window, you can enter the number of data to be displayed on one page, and the duration can be set to move to the next page every few seconds in case of automatic page turning.
   ![data paginator 속성 설정][data_paginator_3]

4. The types of information provided by data-paginator are: list, which is the list of data to be displayed on the page, currentPage, which is the current page, totalPage, which is the total number of pages to be displayed, and totalRecords, which is the total number of data to be displayed. There are startIndex and endIndex indicating the index of the data being given, and pageSize indicating the number of data to be displayed on one page entered in the data-paginator property value. Among them, the content you want to use can be entered in the name of the accessor, and data can be transmitted and displayed.
   ![데이터 바인딩][data_paginator_4]

5. Check the data value
   ![data paginator 출력 확인][data_paginator_5]

[data_paginator_1]: ../images/data_paginator_1.png
[data_paginator_2]: ../images/data_paginator_2.png
[data_paginator_3]: ../images/data_paginator_3.png
[data_paginator_4]: ../images/data_paginator_4.png
[data_paginator_5]: ../images/data_paginator_5.png