const icon = new URL('../../icons/icon-scenario-start.png', import.meta.url).href

export default {
  type: 'scenario-start',
  description: 'scenario-start',
  group: 'dataSource',
  /* line|shape|textAndMedia|chartAndGauge|table|container|dataSource|IoT|3D|warehouse|form|etc */
  icon,
  model: {
    type: 'scenario-start',
    left: 10,
    top: 10,
    width: 100,
    height: 100,
    hidden: true
  }
}
