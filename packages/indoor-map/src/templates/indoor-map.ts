const icon = new URL('../../icons/indoor-map.png', import.meta.url).href

export default {
  type: 'indoor map',
  description: 'indoor map',
  group: 'container' /* line|shape|textAndMedia|chartAndGauge|table|container|dataSource|IoT|3D|warehouse|form|etc */,
  icon,
  model: {
    type: 'indoor-map',
    left: 100,
    top: 100,
    width: 200,
    height: 200,
    fontSize: 80,
    lineWidth: 1
  }
}
