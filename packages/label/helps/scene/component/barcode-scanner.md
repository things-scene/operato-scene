# barcode scanner

It is an input component that can scan barcodes through a camera connected to the device.

If the device has a camera that can be used, barcode input through the camera or keyboard are possible.
If the camera is not available, only input through the keyboard is possible.

If there is a camera available for the device, a barcode scan icon is displayed at the far right of the input field.
You can start the camera input mode by clicking or touching the icon.

When the input is complete, the input value is applied to the data so that data can be bound with a data spread.

Since the browser uses the camera device, the barcode scanning function using the camera works only when connected via HTTPS.
(if the host is localhost, the output function works exceptionally.)

## 바코드 호환성

This function utilizes [ZXing ("zebra crossing") library](https://github.com/zxing/zxing),
The following barcode formats can be scanned.

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
