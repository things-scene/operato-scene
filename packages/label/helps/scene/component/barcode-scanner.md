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

### properties

- without enter key (withoutEnter)

  When scanning barcodes using the camera, "Enter key" is not automatically added to the end of the barcode value.
  The default is to attach the Enter key.
  When the Enter key is pressed, a change event occurs immediately after scanning, and data spread begins.

- english input only (englishOnly)

  When inputting from the camera or keyboard, multi-byte (non-English characters) characters are not received, only English characters are input.
  Even if the IME mode is in multi-byte state, it is changed to English corresponding to each key.
  Multi-byte input is possible, but the change event occurs after the multi-byte characters are removed when the enter key occurs or when the blur event occurs.

- select over change (selectOverChange)

  When a change event occurs by the enter key or blur, the entire string is selected. In this case, when the next value is input, the existing value is deleted and a new value can be entered in the blank, so this operation is convenient in some cases.
