import '../../global/web/index'

import * as mock from '../../mock/web/options'
import { createApp, createPage, createComponent } from '../../mock/web/util'

import chai from 'chai'
const expect = chai.expect

const config = new Map([
  ['app', {
    ctor: createApp,
    mock
  }],
  ['page', {
    ctor: createPage,
    mock
  }],
  ['component', {
    ctor: createComponent,
    mock
  }]
])

config.forEach(function (v, k) {
  runTest(k, v)
})

function runTest (name, config) {
  const Ctor = config.ctor
  const mock = config.mock

  const _case = mock.case1
  const input = _case.get('in')
  const shouldOut = _case.get('out')
  const instance = Ctor(input)
  const actualOut = instance.getOptions()
  describe(`【web】-【base】-【${name}】`, function () {
    describe('test transform options', function () {
      it('should data return equal', function () {
        const data = actualOut.data()
        expect(data).to.deep.equal(input.data)
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

      it('[cmlType] should be "web"', function () {
        expect(instance.cmlType).to.equal('web')
      })

      it('[data] should fit "Function" type', function () {
        const _case = mock.case3
        const input = _case.get('in')
        const shouldOut = _case.get('out')
        const instance = Ctor(input)
        const actualOut = instance.getOptions()
        expect(actualOut.data()).to.deep.equal(shouldOut.data())
      })

      if (name === 'app' || name === 'component') {
        it('test input {props:{}}', function () {
          const _case = mock.case2
          const input = _case.get('in')
          const shouldOut = _case.get('out')
          const instance = Ctor(input)
          const actualOut = instance.getOptions()
          expect(actualOut).to.deep.equal(shouldOut)
        })

        it('test create without input', function () {
          const instance = Ctor()
          const actualOut = instance.getOptions()
          expect(actualOut).to.deep.equal({
            mixins: []
          })
        })
      }
    })
  })
}
