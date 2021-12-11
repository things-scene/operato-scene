/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

import { Component, Container, Layout } from '@hatiolab/things-scene'

import DataCell from './data-cell'
import DataList from './data-list'

var DataListLayout = {
  reflow: function(container: Container) {
    var layoutConfig = container.get('layoutConfig')

    var columns = (layoutConfig && layoutConfig.columns) || container.get('columns')
    var rows = (layoutConfig && layoutConfig.rows) || container.get('rows')
    var widths = (layoutConfig && layoutConfig.widths) || container.get('widths')
    var heights = (layoutConfig && layoutConfig.heights) || container.get('heights')
    var { offset = { x: 0, y: 0 } } = container.state

    var widths_sum = widths ? widths.filter((width: number, i: number) => i < columns).reduce((sum: number, width: number) => sum + width, 0) : columns
    var heights_sum = heights ? heights.filter((height: number, i: number) => i < rows).reduce((sum: number, height: number) => sum + height, 0) : rows

    var inside = container.textBounds
    var paddingLeft = container.get('paddingLeft') || 0
    var paddingTop = container.get('paddingTop') || 0

    var width_unit = inside.width / widths_sum
    var height_unit = inside.height / heights_sum

    var x = offset.x
    var y = offset.y
    var components = container.components

    components.forEach((component, idx) => {
      let w = widths ? widths[idx % columns] : 1
      let h = heights ? heights[0] : 1

      let left = paddingLeft + x
      let top = paddingTop + y
      let width = width_unit * w
      let height = height_unit * h

      component.bounds = {
        left,
        top,
        width,
        height
      }
      component.set('rotation', 0)

      if (idx % columns == columns - 1) {
        x = 0
        y += h * height_unit
      } else {
        x += w * width_unit
      }
    })
  },

  capturables: function(container: Container) {
    return container.components
  },

  drawables: function(container: Container) {
    return container.components
  },

  isStuck: function(component: Component) {
    return true
  },

  /*
   * 레이아웃별로, 키보드 방향키 등을 사용해서 네비게이션 할 수 있는 기능을 제공할 수 있다.
   * 하나의 컴포넌트만 선택되어있고, 키보드 이벤트가 발생했을 때 호출되게 된다.
   * keyNavigate 메쏘드가 정의되어 있지 않으면, 'Tab' 키에 대한 네비게이션만 작동한다.
   * 'Tab'키에 의한 네비게이션은 모든 레이아웃에 공통으로 적용된다.
   */
  keyNavigate: function(container: Container, component: Component, e: KeyboardEvent) {
    var layoutConfig = container.get('layoutConfig')

    var columns = (layoutConfig && layoutConfig.columns) || container.get('columns')
    var rows = (layoutConfig && layoutConfig.rows) || container.get('rows')

    var { row, column } = (container as DataList).getRowColumn(component as DataCell)

    switch (e.code) {
      case 'ArrowUp':
        if (row > 0) return container.getAt((row - 1) * columns + column)
        break
      case 'ArrowDown':
        if (row < rows - 1) return container.getAt((row + 1) * columns + column)
        break
      case 'ArrowRight':
        if (column < columns - 1) return container.getAt(row * columns + column + 1)
        break
      case 'ArrowLeft':
        if (column > 0) return container.getAt(row * columns + column - 1)
        break
      default:
        return component
    }
  },

  /*
   * 하위 컴포넌트를 영역으로 선택하는 경우에, 바운드에 join만 되어도 선택된 것으로 판단하도록 한다.
   * joinType이 false이거나, 정의되어있지 않으면, 바운드에 포함되어야 선택된 것으로 판단한다.
   */
  joinType: true
}

Layout.register('data-list', DataListLayout)

export default DataListLayout
