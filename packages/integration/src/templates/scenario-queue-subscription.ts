const icon = new URL('../../icons/icon-scenario-instance-subscription.png', import.meta.url).href

export default {
  type: 'scenario-instance-subscription',
  description: 'scenario-instance-subscription',
  group: 'dataSource',
  /* line|shape|textAndMedia|chartAndGauge|table|container|dataSource|IoT|3D|warehouse|form|etc */
  icon,
  model: {
    type: 'scenario-instance-subscription',
    left: 10,
    top: 10,
    width: 100,
    height: 100,
    hidden: true
  }
}
