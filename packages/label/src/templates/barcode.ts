const icon = new URL('../../icons/barcode-template.png', import.meta.url).href

export default {
  type: 'barcode',
  description: 'barcode',
  group: 'IoT',
  /* line|shape|textAndMedia|chartAndGauge|table|container|dataSource|IoT|3D|warehouse|form|etc */
  icon,
  model: {
    type: 'barcode',
    symbol: 'code39',
    text: '1234567890',
    left: 10,
    top: 10,
    width: 500,
    height: 100
  }
}
