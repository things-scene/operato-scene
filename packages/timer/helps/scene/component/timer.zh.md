# 计时器

它是每秒对设置的时间值进行递减计数的组件。

- 静态 ： 可以在建模时以天，小时，分钟和秒为单位静态设置时间值。
- 动态 ： 在运行时在 value 属性中设置时间（seconds）值。
- 在数据属性中设置倒计时过程的按格式运行和按格式停止的结果值。
- 时间格式， 停止格式在运行和结束时以对应的格式设置为 data
- 另外，计时器组件提供了简单的水平进度条功能。填充填充颜色中设置的颜色将会表示对应时间的进度条。

  ![fill-color]

  [fill-color]: ../images/timer-fill-color.png

## 属性

- 天
  - number
  - 计时日期配置(0- )
- 时间
  - number
  - 计时时间配置(0-23)
- 分
  - number
  - 计时分配置(0-59)
- 秒
  - number
  - 计时秒配置(0-59)
- 时间格式
  - string
  - format : hh:mm:ss
  - 计时结果表现格式
- 停止格式
  - string
  - format : --:--:--
  - 计时结束后显示的时间格式
- 背景颜色
  - string, rgb color
  - 组件背景颜色

## 隐藏属性

- timeout

  - number (seconds)
  - 计时器的 value 属性(秒).
  - 因为是计时器的 value 属性, 可以把数据传递到 value 属性中

    > ex) 在点击事件中选择"set value to target component", 使用 class 传递数据

    ![button]

    > ex) 在数据源的数据共享属性中将数据传递到计时器的 value 中, 使用(key)传递数据

    ![databind]

  [button]: ../images/rect-button.png
  [databind]: ../images/timer-data-bind.png

- countdown
  - readonly： 只读属性
  - number (seconds) 
  - 从设置定时器设置值开始，它就将当前值递减计数。
