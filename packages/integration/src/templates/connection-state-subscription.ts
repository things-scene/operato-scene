const icon = new URL('../../icons/icon-connection-state-subscription.png', import.meta.url).href

export default {
  type: 'connection-state-subscription',
  description: 'connection-state-subscription',
  group: 'dataSource',
  /* line|shape|textAndMedia|chartAndGauge|table|container|dataSource|IoT|3D|warehouse|form|etc */
  icon,
  model: {
    type: 'connection-state-subscription',
    left: 10,
    top: 10,
    width: 100,
    height: 100,
    hidden: true
  }
}
