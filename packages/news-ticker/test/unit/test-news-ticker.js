/*
 * Copyright © 2017 HatioLab Inc. All rights reserved.
 */

import './util'

import { expect } from 'chai'

import '../../bower_components/things-scene-core/things-scene-min'
import { NewsTicker } from '../../src/index'

describe('news-ticker', function() {
  var board

  beforeEach(function() {
    board = scene.create({
      model: {
        components: [
          {
            id: 'news-ticker',
            type: 'news-ticker'
          }
        ]
      }
    })
  })

  it('component should be found by its id.', function() {
    var component = board.findById('news-ticker')

    expect(!!component).not.to.equal(false)
  })
})
