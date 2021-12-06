import icon from '../../assets/scene-label.png'

export default {
  type: 'label',
  description: 'label',
  group: 'textAndMedia',
  /* line|shape|textAndMedia|chartAndGauge|table|container|dataSource|IoT|3D|warehouse|form|etc */
  icon,
  model: {
    type: 'label',
    left: 10,
    top: 10,
    width: 100,
    height: 20,
    strokeStyle: 'black'
  }
}
