import icon from '../../assets/duetimer.png'

export default {
  type: 'duetimer',
  description: 'duetimer',
  group: 'etc',
  /* line|shape|textAndMedia|chartAndGauge|table|container|dataSource|IoT|3D|warehouse|form|etc */
  icon,
  model: {
    type: 'duetimer',
    left: 10,
    top: 10,
    width: 100,
    height: 100,
    strokeStyle: 'darkgray',
    text: '#{data}',
    'format-run': 'mm:ss',
    'format-stop': '--:--'
  }
}
