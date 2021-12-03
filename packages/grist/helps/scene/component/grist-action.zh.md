# grist action

当通过连接到特定的Grist组件而发生用户的Click（或Tap）Event时，获取grist数据或提供操作指示给grist。

其他功能与Rect（矩形）组件相同。

## Properties

- target grist
  - 设置要连接的grist的ID。
- action
  - Get page information
    - 获取分页信息
    - 提供可以在graphql query resolver上直接使用的已加工的数据
    ```js
    {
      page,
      limit,
      sorters
    }
    ```
  - Get all rows
    - 获取所有数据
  - Get selected rows
    - 获取已选择的数据
    ```ts
    {
      patches, /* 提供多行更新用的graphql mutation resolver上直接使用的已加工的数据*/
      original /* 获取已选择的数据 */
    }
    ```
  - Get dirty rows
    - 取得变更资料
    - 提供多行更新用的graphql mutation resolver上直接使用的已加工的数据
  - Add a row
    - 添加行
  - Delete selected rows
    - 删除选择行
  - Commit
    - 将数据
- run at startup
  - 是否在画面打开时执行
- record adder format
  - 添加新行时的Format
