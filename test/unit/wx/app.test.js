import '../../global/wx/index'

import chai from 'chai';
const expect = chai.expect

import { resolveTestOutput } from '../../build/util'

const cmlPath = resolveTestOutput('index', 'wx')

const {createApp} = require(cmlPath).default

import * as mock from '../../mock/wx/app/options'
const _case = mock.case1
const input = _case.get('in')
const shouldOut = _case.get('out')

const app = createApp(input)
const actualOut = app.getOptions()

describe('createApp', function () {
  describe('transform options', function () {
      it(`should data return equal`, function () {
        
        expect(actualOut['data']).to.deep.equal(shouldOut['data'])
      })
      
      Object.keys(shouldOut).forEach(function(key) {
        it(`should has ${key} property`, function () {
          expect(actualOut[key]).to.not.equal(undefined)
        })

        let type = typeof actualOut[key]
        it(`should ${key} value type is ${type}`, function () {
          expect(type).to.equal(typeof shouldOut[key])
        })
      })

      it('should return an object', function () {
        expect(app).to.be.a('object');
      })

      it('should return app.cmlType is "wx"', function () {
        expect(app.cmlType).to.equal('wx');
      })
  })

  describe('runtime widgets', function () {
    describe('onLaunch', function() {
       const onLaunch = actualOut.onLaunch()
    })
    describe('onHide', function() {
      const onHide = actualOut.onHide.bind(__CML__GLOBAL.App)
      onHide()
    })
  })
})