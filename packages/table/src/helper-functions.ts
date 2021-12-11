import { ApplicationContext, Component, Model, POINT, Style } from '@hatiolab/things-scene'
import { Table, TableCell } from '.'

export type WHERE = 'all' | 'in' | 'out' | 'left' | 'right' | 'center' | 'middle' | 'top' | 'bottom' | 'clear'

export const SIDES: {[key: string]: string[]} = {
  all: ['top', 'left', 'bottom', 'right'],
  out: ['top', 'left', 'bottom', 'right'],
  left: ['left'],
  right: ['right'],
  top: ['top'],
  bottom: ['bottom'],
  leftright: ['left', 'right'],
  topbottom: ['top', 'bottom']
}

export const CLEAR_STYLE = {
  strokeStyle: '',
  lineDash: 'solid',
  lineWidth: 0
}

export const DEFAULT_STYLE = {
  strokeStyle: '#999',
  lineDash: 'solid',
  lineWidth: 1
}

export function buildNewCell(type: string, app: ApplicationContext): TableCell {
  return Model.compile(
    {
      type,
      strokeStyle: 'blue',
      left: 0,
      top: 0,
      width: 1,
      height: 1,
      textWrap: true,
      border: buildBorderStyle(DEFAULT_STYLE, 'all')
    },
    app
  ) as TableCell
}

export function buildCopiedCell(copy: Model, app: ApplicationContext): TableCell {
  var obj = JSON.parse(JSON.stringify(copy))
  delete obj.text
  return Model.compile(obj, app) as TableCell
}

export function buildBorderStyle(style: Style, where: string) {
  return (SIDES[where] || []).reduce((border: { [key: string]: any }, side: string) => {
    border[side] = style
    return border
  }, {} as { [key: string]: any })
}

export function setCellBorder(cell: any, style: Style, where: string) {
  if (!cell) return
  cell.set('border', Object.assign({}, cell.get('border') || {}, buildBorderStyle(style, where)))
}

export function isLeftMost(total: number, columns: number, indices: number[], i: number) {
  return i == 0 || !(i % columns) || indices.indexOf(i - 1) == -1
}

export function isRightMost(total: number, columns: number, indices: number[], i: number) {
  return i == total - 1 || i % columns == columns - 1 || indices.indexOf(i + 1) == -1
}

export function isTopMost(total: number, columns: number, indices: number[], i: number) {
  return i < columns || indices.indexOf(i - columns) == -1
}

export function isBottomMost(total: number, columns: number, indices: number[], i: number) {
  return i > total - columns - 1 || indices.indexOf(i + columns) == -1
}

export function above(columns: number, i: number) {
  return i - columns
}

export function below(columns: number, i: number) {
  return i + columns
}

export function before(columns: number, i: number) {
  return !(i % columns) ? -1 : i - 1
}

export function after(columns: number, i: number) {
  return !((i + 1) % columns) ? -1 : i + 1
}

export function array(value: any, size: number) {
  var arr = []
  for (let i = 0; i < size; i++) arr.push(1)
  return arr
}

export var columnControlHandler = {
  ondragmove: function(point: POINT, index: number, component: Table) {
    var { left, width } = component.textBounds
    var widths_sum = component.widths_sum

    var widths = component.widths.slice()

    /* 컨트롤의 원래 위치를 구한다. */
    var origin_pos_unit = widths.slice(0, index + 1).reduce((sum: number, width: number) => sum + width, 0)
    var origin_offset = left + (origin_pos_unit / widths_sum) * width

    /*
     * point의 좌표는 부모 레이어 기준의 x, y 값이다.
     * 따라서, 도형의 회전을 감안한 좌표로의 변환이 필요하다.
     * Transcoord시에는 point좌표가 부모까지 transcoord되어있는 상태이므로,
     * 컴포넌트자신에 대한 transcoord만 필요하다.(마지막 파라미터를 false로).
     */
    var transcoorded = component.transcoordP2S(point.x, point.y)
    var diff = transcoorded.x - origin_offset

    var diff_unit = (diff / width) * widths_sum

    var min_width_unit = (widths_sum / width) * 10 // 10픽셀정도를 최소로

    if (diff_unit < 0) diff_unit = -Math.min(widths[index] - min_width_unit, -diff_unit)
    else diff_unit = Math.min(widths[index + 1] - min_width_unit, diff_unit)

    widths[index] = Math.round((widths[index] + diff_unit) * 100) / 100
    widths[index + 1] = Math.round((widths[index + 1] - diff_unit) * 100) / 100

    component.set('widths', widths)
  }
}

export var rowControlHandler = {
  ondragmove: function(point: POINT, index: number, component: Table) {
    var { top, height } = component.textBounds
    var heights_sum = component.heights_sum

    var heights = component.heights.slice()

    /* 컨트롤의 원래 위치를 구한다. */
    index -= component.columns - 1
    var origin_pos_unit = heights.slice(0, index + 1).reduce((sum: number, height: number) => sum + height, 0)
    var origin_offset = top + (origin_pos_unit / heights_sum) * height

    /*
     * point의 좌표는 부모 레이어 기준의 x, y 값이다.
     * 따라서, 도형의 회전을 감안한 좌표로의 변환이 필요하다.
     * Transcoord시에는 point좌표가 부모까지 transcoord되어있는 상태이므로,
     * 컴포넌트자신에 대한 transcoord만 필요하다.(마지막 파라미터를 false로).
     */
    var transcoorded = component.transcoordP2S(point.x, point.y)
    var diff = transcoorded.y - origin_offset

    var diff_unit = (diff / height) * heights_sum

    var min_height_unit = (heights_sum / height) * 10 // 10픽셀정도를 최소로

    if (diff_unit < 0) diff_unit = -Math.min(heights[index] - min_height_unit, -diff_unit)
    else diff_unit = Math.min(heights[index + 1] - min_height_unit, diff_unit)

    heights[index] = Math.round((heights[index] + diff_unit) * 100) / 100
    heights[index + 1] = Math.round((heights[index + 1] - diff_unit) * 100) / 100

    component.set('heights', heights)
  }
}
