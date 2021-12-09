import icon from '../../assets/rack.png';

export default {
  type: 'rack',
  description: 'rack in warehouse',
  group: 'warehouse', /* line|shape|textAndMedia|chartAndGauge|table|container|dataSource|IoT|3D|warehouse|form|etc */
  icon,
  model: {
    type: 'rack',
    left: 100,
    top: 100,
    width: 100,
    height: 100,
    depth: 100,
    shelves: 1,
    locPattern: '{z}{s}-{u}-{sh}',
    shelfPattern: '#',
    fillStyle: '#ffffff',
    strokeStyle: '#999',
    lineWidth: 1,
    alpha: 1
  }
}
