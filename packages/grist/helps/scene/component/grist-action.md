# grist action

When a user's mouse click (or tap) event occurs when connected to a specific Grist component, the grist data is retrieved, or it is a component that directs the operation to grist.

그 밖의 일반적인 기능은 Rect(사각형) 컴포넌트와 동일하게 동작한다.

## Properties

- target grist
  - Set the ID of grist to connect to.
- action
  - Get page information
    - Get pagination information
    - Provided as processed data in the form of input variables that can be used directly in graphql query resolver
    ```js
    {
      page,
      limit,
      sorters
    }
    ```
  - Get all rows
    - Get all record data
  - Get selected rows
    - Get checked record data
    ```ts
    {
      patches, /* Processed data in patch data format that can be used directly in the graphql mutation resolver for multiple record updates. */
      original /* Checked record data */
    }
    ```
  - Get dirty rows
    - Get data with changes
    - Provided as processed data in patch data format that can be used directly in graphql mutation resolver for multi-record update
  - Add a row
    - Add a row
  - Delete selected rows
  - Commit
    - Apply changes to the data
- run at startup
  - Whether to run automatically when the viewer starts
- record adder format
  - data format when adding rows
