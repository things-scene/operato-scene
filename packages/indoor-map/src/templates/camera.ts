import icon from '../../assets/no-image.png';

export default {
  type: 'camera',
  description: 'camera',
  group: 'IoT', /* line|shape|textAndMedia|chartAndGauge|table|container|dataSource|IoT|3D|warehouse|form|etc */
  icon,
  model: {
    type: 'camera',
    left: 100,
    top: 100,
    width: 600,
    height: 400,
    lineWidth: 1,
    strokeStyle: 'black',
    fillStyle: 'yellow',
    yaw: 0.2,
    pitch: 0.2,
    roll: 0.2
  }
}
