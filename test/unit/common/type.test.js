import '../../global/web/index'
import chai from 'chai';
const expect = chai.expect

import { resolveTestSrc } from '../../build/util'

const utilModulePath = resolveTestSrc('platform/common/util/type', 'wx')

const utils = require(utilModulePath)

describe('common utils 工具方法', function () {
  describe('utils.type', function () {
    it('should judge {} is Object', function () {
      expect(utils.type({})).to.equal('Object');
    })
  
    it('should judge null is Null', function () {
      expect(utils.type(null)).to.equal('Null');
    })

    it('should judge function is Function', function () {
      expect(utils.type(function(){})).to.equal('Function');
    })

    it('should judge [] is Array', function () {
      expect(utils.type([])).to.equal('Array');
    })

    it('should judge new Date is Date', function () {
      expect(utils.type(new Date)).to.equal('Date');
    })
  })
})


