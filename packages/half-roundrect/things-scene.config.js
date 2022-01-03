const icon = new URL('./icons/half-round-rect.png', import.meta.url).href

var templates = [
  {
    type: 'half round rect',
    description: 'half round rect',
    group: 'shape' /* line|shape|textAndMedia|chartAndGauge|table|container|dataSource|IoT|3D|warehouse|form|etc */,
    icon,
    model: {
      type: 'half-roundrect',
      left: 100,
      top: 100,
      width: 100,
      height: 100,
      round: 30,
      fillStyle: '#fff',
      strokeStyle: '#000',
      alpha: 1,
      hidden: false,
      lineWidth: 1,
      lineDash: 'solid',
      lineCap: 'butt'
    }
  }
]

export default {
  templates
}
