import './util'
import '../../bower_components/things-scene-core/things-scene-min'

import { Clone } from '../../src/index'
import { expect } from 'chai'

describe('Clone', function () {
  var board

  beforeEach(function () {
    board = scene.create({
      model: {
        components: [
          {
            id: 'clone',
            type: 'clone'
          }
        ]
      }
    })
  })

  it('component should be found by its id.', function () {
    var component = board.findById('clone')

    expect(!!component).not.to.equal(false)
  })
})
