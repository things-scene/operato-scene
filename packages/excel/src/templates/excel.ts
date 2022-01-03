const icon = new URL('../../icons/icon-excel.png', import.meta.url).href

export default {
  type: 'excel',
  description: 'excel',
  group: 'dataSource',
  /* line|shape|textAndMedia|chartAndGauge|table|container|dataSource|IoT|3D|warehouse|form|etc */
  icon,
  model: {
    type: 'excel',
    left: 10,
    top: 10,
    width: 100,
    height: 100,
    fillStyle: 'cyan',
    strokeStyle: 'darkgray'
  }
}
