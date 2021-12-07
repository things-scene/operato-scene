import icon from '../../assets/grist-action.png'
import { ACTIONS } from '../grist-action'

export default {
  type: 'grist-action',
  description: 'grist-action',
  group: 'table',
  /* line|shape|textAndMedia|chartAndGauge|table|container|dataSource|IoT|3D|warehouse|form|etc */
  icon,
  model: {
    type: 'grist-action',
    left: 10,
    top: 10,
    width: 100,
    height: 100,
    strokeStyle: 'darkgray',
    action: ACTIONS.GET_SELECTED
  }
}
