/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

import { Component, ComponentNature, Properties, RectPath, Shape } from '@hatiolab/things-scene'

import { BrowserPrinter } from './direct-print/browser-printer'
import { USBPrinter } from './direct-print/usb-printer'

const NATURE: ComponentNature = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [
    {
      type: 'select',
      label: 'direct-printer',
      name: 'directPrinter',
      property: {
        options: [
          {
            display: 'USB Connected Printer',
            value: 'direct-usb'
          },
          {
            display: 'Zebra Browser Print',
            value: 'zebra-browser-print'
          }
        ]
      }
    },
    {
      type: 'string',
      label: 'vendor id',
      name: 'vendorId',
      placeholder: '0x0A5F'
    },
    {
      type: 'board-selector',
      label: 'board id',
      name: 'boardId'
    }
  ],
  'value-property': 'data',
  help: 'scene/component/label-printer'
}

export default class LabelPrinter extends RectPath(Shape) {
  private static _image: HTMLImageElement
  private printer?: USBPrinter | BrowserPrinter

  static get nature() {
    return NATURE
  }

  static get image() {
    if (!LabelPrinter._image) {
      LabelPrinter._image = new Image()
      LabelPrinter._image.src = new URL('../icons/label-printer.png', import.meta.url).href
    }

    return LabelPrinter._image
  }

  dispose() {
    super.dispose()
  }

  render(context: CanvasRenderingContext2D) {
    /*
     * TODO printable 상태를 구분할 수 있는 표시를 추가할 것.
     */

    var { left, top, width, height } = this.bounds

    context.beginPath()
    this.drawImage(context, LabelPrinter.image, left, top, width, height)
  }

  onchange(after: Properties, before: Properties) {
    if ('data' in after) {
      this.print(after.data)
    }

    if ('directPrinter' in after) {
      delete this.printer
    }
  }

  async print(data: any) {
    if (!this.app.isViewMode || data.constructor !== Object || Object.keys(data).length === 0) {
      /* in cases of
       * - edit mode
       * - data is not a object
       * - data object is empty
       * we doesn't print
       */
      return
    }

    var { directPrinter, boardId, vendorId } = this.state

    var searchParams = new URLSearchParams()
    for (var key in data) {
      searchParams.append(key, data[key])
    }
    const response = await fetch(`label-command/${boardId}?${searchParams.toString()}`, {
      method: 'GET'
    })

    var command = await response.text()

    try {
      if (!this.printer) {
        this.printer =
          directPrinter == 'direct-usb'
            ? new USBPrinter(
                vendorId
                  ? [
                      {
                        vendorId: Number(vendorId)
                      }
                    ]
                  : undefined
              )
            : new BrowserPrinter()
      }

      await this.printer.print(command)
    } catch (err) {
      throw new Error(err as string)
    }
  }
}

Component.register('label-printer', LabelPrinter)
