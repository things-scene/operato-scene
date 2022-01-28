const icon = new URL('./icons/mqtt.png', import.meta.url).href

var templates = [
  {
    type: 'mqtt',
    description: 'mqtt client',
    group:
      'dataSource' /* line|shape|textAndMedia|chartAndGauge|table|container|dataSource|IoT|3D|warehouse|form|etc */,
    icon,
    model: {
      type: 'mqtt',
      left: 10,
      top: 10,
      width: 100,
      height: 100,
      hidden: true,
      dataFormat: 'json'
    }
  }
]

export default {
  templates
}
