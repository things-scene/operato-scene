const icon = new URL('../../icons/icon-data-aggregator.png', import.meta.url).href

export default {
  type: 'data-aggregator',
  description: 'data-aggregator',
  group: 'etc',
  /* line|shape|textAndMedia|chartAndGauge|table|container|dataSource|IoT|3D|warehouse|form|etc */
  icon,
  model: {
    type: 'data-aggregator',
    left: 10,
    top: 10,
    width: 100,
    height: 100,
    fillStyle: 'cyan',
    strokeStyle: 'darkgray'
  }
}
