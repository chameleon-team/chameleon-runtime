/* eslint-disable no-undef */
import '../../global/wx/index'

import chai from 'chai'

import { resolveTestOutput } from '../../build/util'

import * as mock from '../../mock/wx/app/options'
const expect = chai.expect

const cmlPath = resolveTestOutput('index', 'wx')

const { createApp } = require(cmlPath).default
const _case = mock.case1
const input = _case.get('in')
const shouldOut = _case.get('out')

const app = createApp(input)
const actualOut = app.getOptions()

describe('createApp', function () {
  describe('transform options', function () {
    it('should data return equal', function () {
      expect(actualOut.data).to.deep.equal(shouldOut.data)
    })
    Object.keys(shouldOut).forEach(function (key) {
      it(`should has 【${key}】 property`, function () {
        expect(actualOut[key]).to.not.equal(undefined)
      })

      const type = typeof actualOut[key]
      it(`should 【${key}】 value type is 【${type}】`, function () {
        expect(type).to.equal(typeof shouldOut[key])
      })
    })

    it('should return an object', function () {
      expect(app).to.be.a('object')
    })

    it('should return app.cmlType is "wx"', function () {
      expect(app.cmlType).to.equal('wx')
    })
  })

  describe('runtime widgets', function () {
    describe('onLaunch', function () {
      const onLaunch = actualOut.onLaunch.bind(__CML__GLOBAL.App)
      onLaunch({
        scene: '1001',
        referinfo: {

        }
      })
    })
    describe('onHide', function () {
      const onHide = actualOut.onHide.bind(__CML__GLOBAL.App)
      onHide()
    })
  })
})
