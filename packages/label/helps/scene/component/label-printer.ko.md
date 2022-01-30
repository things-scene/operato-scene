# label printer

USB를 통해서 연결된 프린터에, 주어진 라벨보드를 프린트하는 컴포넌트이다.
현재, Zebra의 ZPL 중 이미지(GRF Format) 커맨드를 통해서 프린트하는 기능만을 지원한다.
따라서, 타겟 프린터는 Zebra 호환모델이어야 하면, ZPL의 이미지(GRF Format) 커맨드를 지원하여야 한다.

이 컴포넌트의 value 또는 data가 변경되는 경우에 프린트 출력 기능이 작동된다.
프린트시에 이 컴포넌트의 현재 data(또는 value) 오브젝트가 대상 보드의 data로 전달된다.

브라우저의 [WebUSB API](https://developer.mozilla.org/en-US/docs/Web/API/USB) 기능을 이용해서 출력하므로, HTTPS 로 연결된 경우에만 출력 기능이 동작한다.
(단, 호스트가 localhost인 경우에는 예외적으로 출력기능이 동작한다.)

## Browser Compatibility

현재 브라우저의 실험적 기능인 [WebUSB API](https://developer.mozilla.org/en-US/docs/Web/API/USB)를 활용하는 기능이므로, 다음 브라우저 버전에서만 작동한다.

- Chrome +61
- Edge +79
- Opera 48
- Chrome Android +61
- Opera Android +45
- Samsung Internet +8.0

## properties

- vendor id
  - USB 포트에 연결된 프린터 벤더의 ID를 설정한다.
    - 예를 들어, Zebra 의 Vendor ID는 '0x0A5F' 이다.
  - 필수 입력 항목이 아니며, 입력하지 않은 경우에는 기본으로 Zebra Vendor ID가 사용된다.
  - 프린트 시점에 브라우저에서 팝업되는 프린트연결 목록에서 대상 프린터를 선택할 수 있다.
- board id
  - 프린트하고자 하는 보드를 선택한다.
- value
  - 이 컴포넌트의 value와 연결된 속성은 'data' 이다.
  - value가 오브젝트가 아니거나, 비어있는 경우에는 프린트되지 않는다.
