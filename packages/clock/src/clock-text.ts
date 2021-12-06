/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

import 'dayjs/esm/locale/ko'
import 'dayjs/esm/locale/zh-cn'
import 'dayjs/esm/locale/ja'

import dayjs from 'dayjs/esm/index'
import utc from 'dayjs/esm/plugin/utc'

import { Component, Text } from '@hatiolab/things-scene'

dayjs.extend(utc)

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [
    {
      type: 'string',
      label: 'time-format',
      name: 'timeFormat'
    },
    {
      type: 'checkbox',
      label: 'is-local-time',
      name: 'localTime'
    },
    {
      type: 'number',
      label: 'utc',
      name: 'utc'
    },
    {
      type: 'select',
      label: 'week-language',
      name: 'weekLanguage',
      property: {
        options: [
          {
            display: 'English',
            value: 'en'
          },
          {
            display: 'Korean',
            value: 'ko'
          },
          {
            display: 'Chinese',
            value: 'zh-cn'
          },
          {
            display: 'Japanese',
            value: 'ja'
          }
        ]
      }
    }
  ],
  help: 'scene/component/clock-text'
}

export default class ClockText extends Text {
  private _raf?: number

  is3dish() {
    return false
  }

  get nature() {
    return NATURE
  }

  render(ctx: CanvasRenderingContext2D) {
    super.render(ctx)

    this._raf = requestAnimationFrame(() => {
      setTimeout(() => {
        this._timer()
      }, 1000)
    })
  }

  _timer() {
    this.set('data', this._getTimeStamp())
  }

  _getTimeStamp() {
    var d = dayjs()

    var utc = this.get('utc')
    var formatStr = this.get('timeFormat') || 'YYYY-MM-DD HH:mm:ss'
    var week_lang = this.get('weekLanguage')
    if (!this.get('weekLanguage')) {
      week_lang = 'en'
    }
    if (this.get('localTime')) {
      return d.local().locale(week_lang).format(formatStr)
    } else {
      return d.utc().utcOffset(Number(utc)).locale(week_lang).format(formatStr)
    }
  }

  dispose() {
    super.dispose()
    this._raf !== undefined && cancelAnimationFrame(this._raf)
  }
}

Component.register('clock-text', ClockText)
