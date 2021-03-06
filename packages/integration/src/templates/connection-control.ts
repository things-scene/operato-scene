const icon = new URL('../../icons/icon-connection-control.png', import.meta.url).href

export default {
  type: 'connection-control',
  description: 'connection-control',
  group: 'dataSource',
  /* line|shape|textAndMedia|chartAndGauge|table|container|dataSource|IoT|3D|warehouse|form|etc */
  icon,
  model: {
    type: 'connection-control',
    left: 10,
    top: 10,
    width: 100,
    height: 100,
    hidden: true
  }
}
