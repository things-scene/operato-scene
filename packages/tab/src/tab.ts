/*
 * Copyright © HatioLab Inc. All rights reserved.
 */
import {
  Component,
  ComponentNature,
  Container,
  LinearHorizontalLayout,
  LinearVerticalLayout,
  Model,
  State,
  Style
} from '@hatiolab/things-scene'

const HANDLE_WIDTH = 25
const HANDLE_HEIGHT = 25

function rgba(r: number, g: number, b: number, a: number) {
  return `rgba(${r}, ${g}, ${b}, ${a})`
}

const NATURE: ComponentNature = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [
    {
      type: 'id-input',
      label: 'tab-reference',
      name: 'reference',
      property: {
        component: 'indoor-map'
      }
    },
    {
      type: 'number',
      label: 'tab-active-index',
      name: 'activeIndex',
      property: {
        min: 0,
        step: 1
      }
    },
    {
      type: 'color',
      label: 'active-fill-style',
      name: 'activeFillStyle',
      property: 'activeFillStyle'
    },
    {
      type: 'color',
      label: 'active-font-color',
      name: 'activeFontColor',
      property: 'activeFontColor'
    },
    {
      type: 'color',
      label: 'active-line-color',
      name: 'activeLineColor',
      property: 'activeLineColor'
    },
    {
      type: 'number',
      label: 'active-line-width',
      name: 'activeLineWidth',
      property: 'activeLineWidth'
    }
  ]
}

export default class Tab extends Container {
  get layout() {
    let { width, height } = this.model

    if (width >= height) {
      return LinearHorizontalLayout
    } else {
      return LinearVerticalLayout
    }
  }

  get nature() {
    return NATURE
  }

  // 컴포넌트를 임의로 추가 및 삭제할 수 있는 지를 지정하는 속성임.
  get focusible() {
    return false
  }

  get reference() {
    var { reference } = this.model
    if (!reference) return null

    if (!this._reference) {
      this._reference = this.root.findById(reference)
      if (this._reference) this._reference.on('change', this.onRefChanged, this)
    }

    return this._reference
  }

  get labelHeight() {
    var components = this.reference.components.length
    var height = this.model.height

    return (components > 0 && height / components) || height
  }

  get activeIndex() {
    return this.get('activeIndex')
  }

  private _reference: any

  set reference(reference) {
    if (this.reference) this.reference.off('change', this.onRefChanged, this)

    this._reference = null
    this.model.reference = reference
  }

  set activeIndex(index) {
    this.set('activeIndex', index)
    if (this.reference) {
      this.reference.activeIndex = index
    }
  }

  render(context: CanvasRenderingContext2D) {
    super.render(context)

    if (this.reference) {
      if (this.size() !== this.reference.size()) this.rebuildTabButtons()
    } else {
      // TODO reference 가 잘못되거나 안되어있다는 경고 의미로 뭔가 그려라..
      var componentsLength = this.components.length
      for (var i = componentsLength - 1; i >= 0; i--) {
        var tabBtn = this.components[i]
        this.removeComponent(tabBtn)
      }
    }
  }

  postrender(context: CanvasRenderingContext2D) {
    super.postrender(context)

    if (!this.app.isEditMode) return

    var { left, top, width, fillStyle } = this.model

    // 이동 핸들 그리기
    context.beginPath()

    context.rect(left + width, top, HANDLE_WIDTH, HANDLE_HEIGHT)

    let color = 255 - (20 % 255)
    context.fillStyle = rgba(color, color, color, 1)
    context.fill()

    context.closePath()
  }

  contains(x: number, y: number) {
    if (!this.app.isEditMode) return super.contains(x, y)

    if (super.contains(x, y)) return true

    var { left, top, width } = this.bounds

    var right = left + width

    var h = HANDLE_HEIGHT

    return (
      x < Math.max(right + HANDLE_WIDTH, right) &&
      x > Math.min(right + HANDLE_WIDTH, right) &&
      y < Math.max(top + h, top) &&
      y > Math.min(top + h, top)
    )
  }

  dispose() {
    if (this.reference) this.reference.off('change', this.onRefChanged, this)

    super.dispose()
  }

  rebuildTabButtons() {
    var {
      tabIndex = 0,
      left,
      top,
      width,
      height,
      fillStyle,
      activeFillStyle,
      activeLineColor,
      activeLineWidth,
      strokeStyle,
      fontColor,
      activeFontColor,
      fontFamily,
      fontSize,
      lineHeight,
      italic,
      bold,
      lineWidth = 0
    } = this.model

    var reference = this.reference
    let children = []

    let components = reference.components
    let label_height = this.labelHeight

    let componentsLength = this.components.length

    for (var i = componentsLength - 1; i >= 0; i--) {
      this.removeComponent(this.components[i])
    }

    for (let i = 0; i < components.length; i++) {
      if (components[i].model.type != 'floor') continue

      let floorText = components[i].text || ''

      children.push(
        Model.compile({
          type: 'tab-button',
          index: i,
          text: floorText || String(i + 1),
          fillStyle: fillStyle || 'transparent',
          activeFillStyle: activeFillStyle,
          activeLineColor: activeLineColor,
          activeLineWidth: activeLineWidth,
          fontColor: fontColor,
          activeFontColor: activeFontColor || fontColor,
          fontFamily: fontFamily,
          fontSize: fontSize,
          lineHeight: lineHeight,
          italic: italic,
          bold: bold,
          strokeStyle: strokeStyle,
          lineWidth: lineWidth,
          left: 0,
          top: 0,
          width: width,
          height: height
        })
      )
    }

    this.add(children)

    this.reflow()

    this.activeIndex = this.model.activeIndex || 0
  }

  setTabButtonsStyle(style: Style) {
    // var {
    //   fillStyle,
    //   activeFillStyle,
    //   fontColor,
    //   activeFontColor,
    //   strokeStyle,
    //   lineWidth = 0,
    //   fontFamily,
    //   fontSize,
    //   lineHeight,
    //   italic,
    //   bold
    // } = style

    var children = this.components

    for (var i in children) {
      var tabBtn = children[i]
      tabBtn.set(style)
      // tabBtn.set({
      //   fillStyle: fillStyle,
      //   activeFillStyle: activeFillStyle,
      //   fontColor: fontColor,
      //   activeFontColor: activeFontColor,
      //   strokeStyle: strokeStyle,
      //   lineWidth: lineWidth,
      //   fontFamily: fontFamily,
      //   fontSize: fontSize,
      //   lineHeight: lineHeight,
      //   italic: italic,
      //   bold: bold
      // })
    }
  }

  // reference가 변했을 때 (tab에 변화를 주기위해)
  onRefChanged(after: any, before: any, hint: any) {
    // let sourceIndex = hint.deliverer.indexOf(hint.origin)
    // if(this.components[sourceIndex]) {
    //   this.components[sourceIndex].set(after)
    //   this.invalidate()
    // }
  }

  onchange(after: State, before: State) {
    if (after.hasOwnProperty('reference')) {
      this.reference = after.reference
      this.invalidate()
    }

    // if(after.hasOwnProperty("activeFillStyle")
    //   || after.hasOwnProperty("activeFontColor")
    //   || after.hasOwnProperty("fillStyle")
    //   || after.hasOwnProperty("fontColor")
    //   || after.hasOwnProperty("strokeStyle")
    //   || after.hasOwnProperty("lineWidth")
    //   || after.hasOwnProperty("fontFamily")
    //   || after.hasOwnProperty("fontSize")
    //   || after.hasOwnProperty("lineHeight")
    //   || after.hasOwnProperty("italic")
    //   || after.hasOwnProperty("bold")) {
    //
    // }
    this.setTabButtonsStyle(after)
  }
}

Component.register('tab', Tab)
