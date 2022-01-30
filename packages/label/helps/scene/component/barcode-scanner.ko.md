# barcode scanner

디바이스에 연결된 카메라를 통해서 바코드를 스캔할 수 있는 입력 컴포넌트이다.

디바이스에 사용할 수 있는 카메라가 있는 경우에는 카메라를 통한 바코드 입력과 키보드를 통한 입력이 가능하며,
카메라를 사용할 수 없는 경우에는 키보드를 통한 입력만 가능하다.

디바이스에 사용할 수 있는 카메라가 있는 경우에는 입력 필드의 오른쪽 끝에 바코드 스캔 아이콘이 표시되며,
아이콘을 클릭 또는 터치하여 카메라 입력 모드를 시작할 수 있다.

입력이 완료되면, 입력값은 data에 적용되어 데이타 스프레드로 데이타바인딩을 할 수 있다.

브라우저에서 카메라 장치를 사용하므로, HTTPS 로 연결된 경우에만 카메라를 이용한 바코드 스캔 기능이 작동한다.
(단, 호스트가 localhost인 경우에는 예외적으로 출력기능이 작동한다.)

## 바코드 호환성

이 기능은 [ZXing ("zebra crossing") 라이브러리](https://github.com/zxing/zxing) 를 활용하므로,
다음의 바코드 형식을 스캔할 수 있다.

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
