const icon = new URL('../../icons/scene-arview.png', import.meta.url).href

export default {
  type: 'arview',
  description: 'arview',
  group: '3D',
  /* line|shape|textAndMedia|chartAndGauge|table|container|dataSource|IoT|3D|warehouse|form|etc */
  icon: icon,
  model: {
    type: 'arview',
    left: 100,
    top: 100,
    width: 400,
    height: 300,
    fillStyle: '#00ff00'
  }
}
