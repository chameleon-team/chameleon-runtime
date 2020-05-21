import '../../global/wx/index'

import chai from 'chai'

import { resolveTestOutput } from '../../build/util'

import * as mock from '../../mock/wx/page/options'
const expect = chai.expect

const cmlPath = resolveTestOutput('index', 'wx')

const { createPage } = require(cmlPath).default
const _case = mock.case1
const input = _case.get('in')
const shouldOut = _case.get('out')

const page = createPage(input)
const actualOut = page.getOptions()

describe('createPage', function () {
  describe('transform options', function () {
    it('should data return equal', function () {
      expect(actualOut.data).to.deep.equal(shouldOut.data)
    })

    Object.keys(shouldOut).forEach(function (key) {
      it(`should has ${key} property`, function () {
        expect(actualOut[key]).to.not.equal(undefined)
      })

      const type = typeof actualOut[key]
      it(`should ${key} value type is ${type}`, function () {
        expect(type).to.equal(typeof shouldOut[key])
      })
    })

    it('should return an object', function () {
      expect(page).to.be.a('object')
    })

    it('should return page.cmlType is "wx"', function () {
      expect(page.cmlType).to.equal('wx')
    })
  })

  describe('runtime widgets', function () {
    describe('onLoad', function () {
      const onLoad = actualOut.onLoad.bind(__CML__GLOBAL.Page)

      const query = {
        a: 'a'
      }

      expect(onLoad(query)).to.equal(shouldOut.onLoad(query))
    })

    describe('onShow', function () {
      const onShow = actualOut.onShow.bind(__CML__GLOBAL.Page)
      onShow()
    })

    describe('onReady', function () {
      const onReady = actualOut.onReady.bind(__CML__GLOBAL.Page)

      expect(onReady()).to.equal(shouldOut.onReady())
    })

    describe('onShareAppMessage', function () {
      const onShareAppMessage = actualOut.onShareAppMessage.bind(__CML__GLOBAL.Page)

      expect(onShareAppMessage()).to.equal(shouldOut.onShareAppMessage())
    })

    describe('onHide', function () {
      const onHide = actualOut.onHide.bind(__CML__GLOBAL.Page)
      expect(onHide()).to.equal(shouldOut.onHide())
    })

    describe('onUnload', function () {
      const onUnload = actualOut.onUnload.bind(__CML__GLOBAL.Page)
      expect(onUnload()).to.equal(shouldOut.onUnload())
    })
  })
})
