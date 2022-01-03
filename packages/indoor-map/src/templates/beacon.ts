const icon = new URL('../../icons/beacon.png', import.meta.url).href

export default {
  type: 'beacon',
  description: 'beacon',
  group: 'IoT' /* line|shape|textAndMedia|chartAndGauge|table|container|dataSource|IoT|3D|warehouse|form|etc */,
  icon,
  model: {
    type: 'beacon',
    left: 100,
    top: 100,
    zPos: 0,
    width: 100,
    height: 100
  }
}
