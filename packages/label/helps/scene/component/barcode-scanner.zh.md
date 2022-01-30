# barcode scanner

它是一个输入组件，可以通过连接到设备的摄像头扫描条形码。

如果有可以使用的摄像头，则可以通过摄像头输入条形码，也可以通过键盘输入条形码。
如果没有相机，则只能通过键盘输入。

如果该设备有可用的摄像头，则在输入字段的最右侧显示条形码扫描图标。
可以通过单击或触摸图标来启动摄像头输入模式。

输入完成后，会将输入值应用于数据，以便可以将数据与数据散布绑定。

如果通过浏览器使用摄像头设备，因此使用摄像头的条形码扫描功能仅在通过HTTPS连接时有效。
（所以，如果主机是localhost，则输出功能会异常工作。）

## 条形码兼容性

此功能利用 [ZXing ("zebra crossing") Library](https://github.com/zxing/zxing)，
可以扫描以下条形码格式。

### Supported Formats

| 1D product            | 1D industrial | 2D           |
| :-------------------- | :------------ | :----------- |
| UPC-A                 | Code 39       | QR Code      |
| UPC-E                 | Code 93       | Data Matrix  |
| EAN-8                 | Code 128      | Aztec        |
| EAN-13                | Codabar       | PDF 417      |
| UPC/EAN Extension 2/5 | ITF           | MaxiCode     |
|                       |               | RSS-14       |
|                       |               | RSS-Expanded |
