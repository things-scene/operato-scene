const icon = new URL('../../icons/icon-scenario-queue-subscription.png', import.meta.url).href

export default {
  type: 'scenario-queue-subscription',
  description: 'scenario-queue-subscription',
  group: 'dataSource',
  /* line|shape|textAndMedia|chartAndGauge|table|container|dataSource|IoT|3D|warehouse|form|etc */
  icon,
  model: {
    type: 'scenario-queue-subscription',
    left: 10,
    top: 10,
    width: 100,
    height: 100,
    hidden: true
  }
}
