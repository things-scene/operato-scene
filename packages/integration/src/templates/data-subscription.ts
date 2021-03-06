const icon = new URL('../../icons/icon-data-subscription.png', import.meta.url).href

export default {
  type: 'data-subscription',
  description: 'data-subscription',
  group: 'dataSource',
  /* line|shape|textAndMedia|chartAndGauge|table|container|dataSource|IoT|3D|warehouse|form|etc */
  icon,
  model: {
    type: 'data-subscription',
    left: 10,
    top: 10,
    width: 100,
    height: 100,
    hidden: true
  }
}
