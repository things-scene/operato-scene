# grist

It is a component that expresses multiple record data in the form of a data grid or data list.
Data grid is suitable for web application UI, and data list is suitable for mobile application.
This can be set with the grist mode attribute.

## Properties

- grist mode
  - Grid: Data grid format that organizes multi-columns in a table format
  - list: Data list format that composes multi-column information in the form of an item block
  - Depends on device : Depending on the current display, it is automatically selected in the form of a data grid or a data list.
- config
  - Configuration for grist
  - It consists of column, header, record and pagination information.
- appendable
  - Set whether to provide UI function so that new record can be added
- paginatable
  - Set whether to provide the footer area UI function that provides pagination function in the footer area
- scale
  - Set scale of grist content
  - The minimum value is 0.1, and it can be increased by 0.1.
  - Default value is 1
- bound data
  - focused row : The current record selected or moved by the user with the mouse or keyboard is sent as the data attribute. Since only one record is focused, the data is in the form of a single object.
  - selected rows : Records selected by the user through the selection checkbox are sent as data attributes. Since multiple records can be selected, the data becomes an array of records.
