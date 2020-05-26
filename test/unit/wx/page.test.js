import '../../global/wx/index'

import * as mock from '../../mock/wx/page/options'
import { createPage } from '../../mock/wx/util'

import chai from 'chai'
const expect = chai.expect

const _case = mock.case1
const input = _case.get('in')
const shouldOut = _case.get('out')

const page = createPage(input)
const actualOut = page.getOptions()

describe('【wx】-【createPage】', function () {
  describe('lifecycle unit test', function () {
    it('onLoad', function () {
      const onLoad = actualOut.onLoad.bind(__CML__GLOBAL.Page)

      const query = {
        a: 'a'
      }

      expect(onLoad(query)).to.equal(shouldOut.onLoad(query))
    })

    it('onShow', function () {
      const onShow = actualOut.onShow.bind(__CML__GLOBAL.Page)
      onShow()
    })

    it('onReady', function () {
      const onReady = actualOut.onReady.bind(__CML__GLOBAL.Page)

      expect(onReady()).to.equal(shouldOut.onReady())
    })

    it('onShareAppMessage', function () {
      const onShareAppMessage = actualOut.onShareAppMessage.bind(__CML__GLOBAL.Page)

      expect(onShareAppMessage()).to.equal(shouldOut.onShareAppMessage())
    })

    it('onHide', function () {
      const onHide = actualOut.onHide.bind(__CML__GLOBAL.Page)
      expect(onHide()).to.equal(shouldOut.onHide())
    })

    it('onUnload', function () {
      const onUnload = actualOut.onUnload.bind(__CML__GLOBAL.Page)
      expect(onUnload()).to.equal(shouldOut.onUnload())
    })
  })
})
