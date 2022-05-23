/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

import '@operato/data-grist'

import { Component, ComponentNature, error, HTMLOverlayElement, Properties } from '@hatiolab/things-scene'
import { DataGrist, FetchResult } from '@operato/data-grist'
import { FetchOption } from '@operato/data-grist/dist/src/types'

const NATURE: ComponentNature = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [
    {
      type: 'select',
      label: 'grist-mode',
      name: 'mode',
      property: {
        options: [
          {
            display: 'Grid',
            value: 'GRID'
          },
          {
            display: 'List',
            value: 'LIST'
          },
          {
            display: 'Depends on device',
            value: 'DEVICE'
          }
        ]
      }
    },
    {
      type: 'textarea',
      label: 'config',
      name: 'config'
    },
    {
      type: 'checkbox',
      label: 'appendable',
      name: 'appendable'
    },
    {
      type: 'checkbox',
      label: 'paginatable',
      name: 'paginatable'
    },
    {
      type: 'number',
      label: 'content-scale',
      name: 'contentScale',
      property: {
        step: 0.1,
        min: 0.1
      }
    },
    {
      type: 'select',
      label: 'bound-data',
      name: 'boundData',
      property: {
        options: [
          {
            display: '',
            value: ''
          },
          {
            display: 'Focused Row',
            value: 'focused-row'
          },
          {
            display: 'Selected Rows',
            value: 'selected-rows'
          }
        ]
      }
    }
  ],
  help: 'scene/component/grist'
}

const isMobileDevice = () => false

export default class SceneGrist extends HTMLOverlayElement {
  public beforeFetchFuncs: any = {}

  private __value: any = {}
  private _listenTo?: any
  private _listener?: any

  public grist?: DataGrist

  get nature() {
    return NATURE
  }

  ready() {
    super.ready()

    if (this.rootModel) {
      this._listenTo = this.rootModel
      this._listener = function (this: SceneGrist, after: Properties) {
        after.scale && this.rescale()
      }.bind(this)
      this.rootModel.on('change', this._listener)
    }
  }

  removed() {
    if (this._listenTo) {
      this._listenTo.off('change', this._listener)

      delete this._listenTo
      delete this._listener
    }
  }

  createElement() {
    super.createElement()

    this.grist = document.createElement('ox-grist') as DataGrist
    this.grist.style.setProperty('--grist-padding', '0')

    this.element.appendChild(this.grist)

    this.rescale()

    const grist = this.grist

    this.setGristConfig(grist)

    grist.fetchHandler = async ({ page, limit, sorters, options }: FetchOption): Promise<FetchResult> => {
      Object.values(this.beforeFetchFuncs).forEach((func: any) => func({ page, limit, sorters, options }))
      var { total = 0, records = [] } = grist.data || {}

      return {
        page,
        limit,
        total,
        records
      }
    }

    grist.addEventListener('select-record-change', e => {
      if (this.state.boundData === 'selected-rows') {
        this.data = (e.target as DataGrist)?.selected || []
      }
    })

    grist.addEventListener('select-all-change', e => {
      if (this.state.boundData === 'selected-rows') {
        this.data = (e.target as DataGrist)?.selected || []
      }
    })

    grist.addEventListener('focus-change', (e: Event) => {
      if (this.state.boundData === 'focused-row') {
        this.data = ((e.target as DataGrist)?.data?.records || [])[(e as CustomEvent).detail.row]
      }
    })
  }

  get value() {
    return this.__value
  }

  set value(value) {
    this.__value = value
    if (!this.grist || typeof value !== 'object') return

    var { page, limit } = this.config.pagination || {}

    this.grist.data =
      value instanceof Array
        ? {
            page,
            limit,
            ...this.grist._data,
            total: value.length,
            records: Array.from(value)
          }
        : {
            page,
            limit,
            ...this.grist._data,
            ...value
          }
  }

  onchange(after: Properties, before: Properties) {
    if ('mode' in after || 'appendable' in after || 'paginatable' in after || 'config' in after) {
      this.setGristConfig(this.grist)
    }

    this.rescale()
  }

  dispose() {
    super.dispose()

    delete this.grist
  }

  /*
   * 컴포넌트의 생성 또는 속성 변화 시에 호출되며,
   * 그에 따른 html element의 반영이 필요한 부분을 구현한다.
   *
   * ThingsComponent state => HTML element properties
   */
  setElementProperties(grist: DataGrist) {
    this.rescale()
  }

  setGristConfig(grist: DataGrist | undefined) {
    if (!grist) {
      return
    }

    var { mode } = this.state

    if (mode != 'DEVICE') {
      grist.mode = mode
    } else {
      grist.mode = isMobileDevice() ? 'LIST' : 'GRID'
    }

    grist.config = this.config
  }

  /*
   * 컴포넌트가 ready 상태가 되거나, 컴포넌트의 속성이 변화될 시 setElementProperties 뒤에 호출된다.
   * 변화에 따른 기본적인 html 속성이 super.reposition()에서 진행되고, 그 밖의 작업이 필요할 때, 오버라이드 한다.
   */
  reposition() {
    super.reposition()
  }

  /*
   * grist는 부모의 스케일의 역으로 transform해서, scale을 1로 맞춘다.
   */
  rescale() {
    var grist = this.grist
    if (!grist) {
      return
    }

    const scale = this.getState('contentScale') || 1

    const sx = scale
    const sy = scale

    const transform = `scale(${sx}, ${sy})`

    ;['-webkit-', '-moz-', '-ms-', '-o-', ''].forEach((prefix: string) => {
      grist!.style.setProperty(prefix + 'transform', transform)
      grist!.style.setProperty(prefix + 'transform-origin', '0px 0px')
    })

    const { width, height } = this.state
    grist.style.width = Math.round(width / scale) + 'px'
    grist.style.height = Math.round(height / scale) + 'px'
  }

  get config() {
    var { config, appendable, paginatable } = this.state

    if (typeof config !== 'object') {
      try {
        config = eval(`(${config})`)
      } catch (e) {
        error(e)
      }
    }

    if (paginatable) {
      if (config.pagination && !config.pagination.limit && config.pagination.pages && config.pagination.pages.length) {
        config.pagination.limit = config.pagination.pages[0]
      }
    }

    config.pagination = {
      ...config.pagination,
      infinite: !paginatable
    }

    config.rows = {
      ...config.rows,
      appendable: !!appendable
    }

    return config
  }

  get tagName() {
    return 'div'
  }
}

Component.register('grist', SceneGrist)
