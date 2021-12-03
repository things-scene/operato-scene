import './util'
import '../../bower_components/things-scene-core/things-scene-min'

import { Random } from '../../src/index'
import { expect } from 'chai'

describe('Random', function () {
  var board

  beforeEach(function () {
    board = scene.create({
      model: {
        components: [
          {
            id: 'random',
            type: 'random'
          }
        ]
      }
    })
  })

  it('component should be found by its id.', function () {
    var component = board.findById('random')

    expect(!!component).not.to.equal(false)
  })
})
