import '../../global/wx/index'

import * as appMock from '../../mock/wx/app/options'
import * as pageMock from '../../mock/wx/page/options'
import * as componentMock from '../../mock/wx/component/options'
import * as baseMock from '../../mock/wx/base'
import { createApp, createPage, createComponent } from '../../mock/wx/util'

import chai from 'chai'
const expect = chai.expect

const config = new Map([
  ['app', {
    ctor: createApp,
    mock: appMock,
    baseMock
  }],
  ['page', {
    ctor: createPage,
    mock: pageMock,
    baseMock
  }],
  ['component', {
    ctor: createComponent,
    mock: componentMock,
    baseMock
  }]
])

config.forEach(function (v, k) {
  runTest(k, v)
})

function runTest (name, config) {
  const Ctor = config.ctor
  const mock = config.mock
  const baseMock = config.baseMock

  const _case = mock.case1
  const input = _case.get('in')
  const shouldOut = _case.get('out')
  const instance = Ctor(input)
  const actualOut = instance.getOptions()
  describe(`【wx】-【base】-【${name}】`, function () {
    describe('test transform options', function () {
      it('should data return equal', function () {
        expect(actualOut.data).to.deep.equal(shouldOut.data)
      })
      Object.keys(shouldOut).forEach(function (key) {
        it(`should has ${key} property`, function () {
          expect(actualOut[key]).to.not.equal(undefined)
        })
  
        const type = typeof shouldOut[key]
        it(`should ${key} value type is ${type}`, function () {
          expect(typeof actualOut[key]).to.equal(type)
        })
      })
  
      it('Creator should return an object', function () {
        expect(instance).to.be.a('object')
      })
  
      it('[cmlType] should be "wx"', function () {
        expect(instance.cmlType).to.equal('wx')
      })
  
      it('[data] should fit "Function" type', function () {
        const _case = baseMock.case1
        const input = _case.get('in')
        const shouldOut = _case.get('out')
        const page = createPage(input)
        const actualOut = page.getOptions()
  
        const shouldData = shouldOut.data
        const actualData = actualOut.data
  
        Object.keys(shouldData).forEach(function (key) {
          expect(actualData[key]).to.equal(shouldData[key])
        })
      })
    })
  })
}
