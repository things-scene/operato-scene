# 克隆

克隆是复制组件的组件。

## properties
- 持续期间
  - 进行重复设置(以毫秒为单位)。
  - 最小值为500毫秒。
  - 一旦启动此组件，就会执行克隆。即，持续时间值不应用于初始组件复制的延迟。
- 目标
  - 输入要复制的组件的ID。
- 重复
  - 设置是否重复执行组件复制工作。
  - 如果设置为重复，则根据持续时间设置周期重复执行。
- 自动开始
  - 设置是否自动开始组件复制工作。
  - 如果未设置自动启动，则可以使用true / false启动或终止启动或值属性。
- 保留期间
  - 复制的组件保持活动状态的时间（毫秒）
  - 设置会传递到复制对象组件的保留期间属性中
- started (value property)
  - 不能在建模器属性窗口中设置，但是可以通过数据传播或点击事件处理来设置。