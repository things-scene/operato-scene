/*
 * Copyright © HatioLab Inc. All rights reserved.
 */
import './util'

import { expect } from 'chai'

import '../../bower_components/things-scene-core/things-scene-min'
import { Conveyor } from '../../src/index'

describe('Conveyor', function () {

  var board;

  beforeEach(function () {
    board = scene.create({
      model: {
        components: [{
          id: 'conveyor',
          type: 'conveyor',
          rows: 2,
          columns: 2
        }]
      }
    })
  });

  it('XXXX.', function () {

    var conveyor = board.findById('conveyor')

    expect(conveyor.get('id')).to.equal('conveyor')
  });

});
