const icon = new URL('../../icons/icon-data-reducer.png', import.meta.url).href

export default {
  type: 'data-reducer',
  description: 'data-reducer',
  group: 'etc',
  /* line|shape|textAndMedia|chartAndGauge|table|container|dataSource|IoT|3D|warehouse|form|etc */
  icon,
  model: {
    type: 'data-reducer',
    left: 10,
    top: 10,
    width: 100,
    height: 100,
    fillStyle: 'cyan',
    strokeStyle: 'darkgray'
  }
}
