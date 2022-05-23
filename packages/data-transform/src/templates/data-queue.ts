const icon = new URL('../../icons/icon-data-queue.png', import.meta.url).href

export default {
  type: 'data-queue',
  description: 'data-queue',
  group: 'etc',
  /* line|shape|textAndMedia|chartAndGauge|table|container|dataSource|IoT|3D|warehouse|form|etc */
  icon,
  model: {
    type: 'data-queue',
    left: 10,
    top: 10,
    width: 100,
    height: 100,
    fillStyle: 'cyan',
    strokeStyle: 'darkgray'
  }
}
