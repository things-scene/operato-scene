# grist

它是一个以数据网格或数据列表的形式表示多个记录数据的组件。
数据网格适用于 Web 应用程序 UI，数据列表适用于移动应用程序。
可以使用 grist 模式属性进行移动端应用设置。

如果将以下类型的数据绑定到 grist 组件的 value 属性上，可以看到 grist 中的每条记录都呈现了数据。

```
[
  { name: "name 1", description: "record 1", ...  },
  { name: "name 2", description: "record 2", ...  },
  { name: "name 3", description: "record 3", ...  },
  { name: "name 4", description: "record 4", ...  },
]
```

## Properties

- 模式
  - Grid: 数据网格格式，以表格格式组织多列
  - List: 以项目块的形式组成多列信息的数据列表格式
  - Card: 卡片式数据列表
  - Depends on device : 根据当前设备自动选择数据网格或数据列表
- 配置
  - 用于 grist 的配置
  - 包含表列、表头、数据、分页信息
- 可增加新行
  - 设置是否提供 UI 功能，以便可以添加新记录
- 可分页
  - 设置是否提供在页脚区域中提供分页功能的页脚区域 UI 功能
- scale
  - Set scale of grist content
  - The minimum value is 0.1, and it can be increased by 0.1.
  - Default value is 1
- 绑定数据
  - focused row : 用户选择的或移动数据的属性将会传递出去，只传递一行数据
  - selected rows : 用户选择的所有数据会将会传递出去，数据将会作为 Array 发送。
