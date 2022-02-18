# Input

它是使用键盘或鼠标接收和处理来自用户的输入的组件。
当放置在表单容器中时，其操作与常规HTML表单中使用的各种类型的HTML输入元素相同。
[The Input (Form Input) element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)

## 种类

- input
- input-text
- input-password
- input-email
- input-search
- input-time
- input-datetime-local
- input-month
- input-week

## Properties

- name
  - type: string
  - 表单中元素的名称
- value
  - type: string
  - 输入元素值
- placeholder
  - type: string
  - 输入元素的占位符
- readonly
  - type: checkbox
  - 是否只读
- disabled
  - type: checkbox
  - 表格中的操作被禁用
- max-length
  - type: number
  - 输入的最大字符数
- submit-on-change
  - type: checkbox
  - 当按Enter键确认值更改或聚焦后，将自动发送表格。
- spread-on-init
  - type: checkbox
  - 设置是否从初始值传播数据
  - 如果设置为true，则将初始值设置为输入组件的数据，并且设置的数据扩展操作。
  - 如果设置为false，则初始值不设置为data。
- next-input
  - type: string
  - 将焦点设置为在按下回车键时自动移动到特定组件
- autofocus
  - type: checkbox
  - 设置加载电路板时是否自动具有输入焦点
- alltime-focus
  - type: checkbox
  - 当此组件失去焦点时，它将设置为在alltime-focus-pending中设置的时间后自动重新获得焦点。
- alltime-focus-pending
  - type: number
  - 当此组件失去焦点时，如果设置了alltime-focus，则在alltime-focus-pending中设置的时间（毫秒）后，它将自动再次获取焦点。
