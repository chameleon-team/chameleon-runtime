import '../../global/web/index'
import chai from 'chai';
const expect = chai.expect

import { resolveTestSrc } from '../../build/util'

const modulePath = resolveTestSrc('platform/web/render/lib/gesture', 'web')

const mod = require(modulePath)

describe('module', function () {
  describe('child', () => {
    it('case1', () => {
      expect(mod).to.be.a('object')
    })
  })
})