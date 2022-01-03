const icon = new URL('../../icons/icon-data-list.png', import.meta.url).href

export default {
  type: 'data-list',
  description: 'data list',
  group: 'table',
  /* line|shape|textAndMedia|chartAndGauge|table|container|dataSource|IoT|3D|warehouse|form|etc */
  icon,
  model: {
    type: 'data-list',
    top: 100,
    left: 100,
    width: 500,
    height: 200,
    strokeStyle: '#999',
    fillStyle: 'white',
    lineWidth: 2,
    columns: 5
  }
}
