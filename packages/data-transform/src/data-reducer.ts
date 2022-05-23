import { Component, Properties, RectPath, Shape } from '@hatiolab/things-scene'

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [
    {
      type: 'string',
      label: 'accessor-target',
      name: 'accessorTarget'
    },
    {
      type: 'string',
      label: 'accessor-item',
      name: 'accessorItem'
    },
    {
      type: 'string',
      label: 'reducing-propname',
      name: 'reducingPropname'
    },
    {
      type: 'select',
      label: 'reducing-type',
      name: 'reducingType',
      property: {
        options: [
          {
            display: 'Sum',
            value: 'reduce_sum'
          },
          {
            display: 'Average',
            value: 'reduce_mean'
          },
          {
            display: 'Standard Deviation',
            value: 'reduce_sd'
          },
          {
            display: 'Variance',
            value: 'reduce_variance'
          }
        ]
      }
    }
  ],
  'value-property': 'source',
  help: 'scene/component/reducer'
}

export default class DataReducer extends RectPath(Shape) {
  static _image: HTMLImageElement

  static get image() {
    if (!DataReducer._image) {
      DataReducer._image = new Image()
      DataReducer._image.src = new URL('../icons/symbol-data-reducer.png', import.meta.url).href
    }

    return DataReducer._image
  }

  get nature() {
    return NATURE
  }

  render(context: CanvasRenderingContext2D) {
    var { left, top, width, height } = this.bounds

    context.beginPath()
    this.drawImage(context, DataReducer.image, left, top, width, height)
  }

  onchange(after: Properties, before: Properties) {
    if ('source' in after) {
      this._reduce()
    }
  }

  _reduce() {
    let { source, accessorTarget, accessorItem, reducingPropname, reducingType = 'reduce_sum' } = this.state

    if (accessorTarget && accessorTarget in source) {
      var source_target = source[accessorTarget]
      var target_item = source_target.map((m: any) => m[accessorItem])
      if (accessorItem && reducingPropname) {
        switch (reducingType) {
          case 'reduce_sum':
            source[reducingPropname] = target_item.reduce((partial_sum: number, a: number) => partial_sum + a)
            break

          case 'reduce_mean':
            source[reducingPropname] =
              target_item.reduce((partial_sum: number, a: number) => partial_sum + a) / target_item.length
            break

          case 'reduce_sd':
            var array_length = target_item.length
            var mean = target_item.reduce((partial_sum: number, a: number) => partial_sum + a) / array_length

            source[reducingPropname] = Math.sqrt(
              target_item.map((x: number) => Math.pow(x - mean, 2)).reduce((a: number, b: number) => a + b) /
                array_length
            )
            break

          case 'reduce_variance':
            var array_length = target_item.length
            var mean = target_item.reduce((partial_sum: number, a: number) => partial_sum + a) / array_length
            source[reducingPropname] =
              target_item
                .map((num: number) => Math.pow(num - mean, 2))
                .reduce((partial_sum: number, a: number) => partial_sum + a) / array_length
            break
        }

        this.setState('data', { ...source })
      }
    }
  }

  get source() {
    return this.getState('source')
  }

  set source(source) {
    this.setState('source', source)
  }

  get hasTextProperty() {
    return false
  }
}

Component.register('data-reducer', DataReducer)
