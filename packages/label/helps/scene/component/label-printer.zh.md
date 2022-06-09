# label printer

它是将给定标签板打印到通过 USB 连接的打印机的组件。
当前，Zebra 的 ZPL 仅支持通过图像（GRF 格式）命令进行打印。
因此，如果目标打印机必须是 Zebra 兼容型号，则它必须支持 ZPL 的图像（GRF 格式）命令。

更改此组件的值或数据时，将激活打印输出功能。
打印时，此组件的当前数据（或值）对象将作为目标板的数据进行传输。

由于使用浏览器的[WebUSB API]（https://developer.mozilla.org/en-US/docs/Web/API/USB）函数进行输出，因此仅当通过HTTPS连接时，输出函数才起作用。
（如果主机是 localhost，则输出功能会异常运行。）

## Browser Compatibility

它是利用[WebUSB API](https://developer.mozilla.org/en-US/docs/Web/API/USB)的功能，该功能是当前浏览器的实验功能，因此仅在如下版本可用。

- Chrome +61
- Edge +79
- Opera 48
- Chrome Android +61
- Opera Android +45
- Samsung Internet +8.0

## properties

- 供应商 id (vendorId - optional)
  - 设置连接到 USB 端口的打印机供应商的 ID。
    - 例如，Zebra 的供应商 ID 为'0x0A5F'。
  - 这不是必填字段，如果未输入，则默认使用 Zebra 供应商 ID。
  - 可以从打印时在浏览器中弹出的打印连接列表中选择目标打印机。
- 看板 id (boardId)
  - 选择要打印的 Board.
- 印数 (copies)
  - 设置要打印的份数（默认值为 1）
- value
  - 连接到该组件的 Value 的属性是“data”。
  - 如果 value 不是对象或为空，则不打印。.
