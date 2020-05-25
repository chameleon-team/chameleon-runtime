/* eslint-disable no-undef */
import '../../global/wx/index'

import * as mock from '../../mock/wx/app/options'
import { createApp } from '../../mock/wx/base'

import chai from 'chai'
const expect = chai.expect

const _case = mock.case1
const input = _case.get('in')
// const shouldOut = _case.get('out')

const app = createApp(input)
const actualOut = app.getOptions()

describe('【wx】-【createApp】', function () {
  describe('lifecycle unit test', function () {
    it('onLaunch', function () {
      const onLaunch = actualOut.onLaunch.bind(__CML__GLOBAL.App)
      onLaunch({
        scene: '1001',
        referinfo: {

        }
      })
    })
    it('onHide', function () {
      const onHide = actualOut.onHide.bind(__CML__GLOBAL.App)
      onHide()
    })
  })
})
