import '../../global/web/index'

import chai from 'chai'

import { resolveTestOutput } from '../../build/util'

import * as mock from '../../mock/web/options'
const expect = chai.expect

const cmlPath = resolveTestOutput('index', 'web')

const { createComponent } = require(cmlPath).default

describe('【web】-【createComponent】', function () {
  const _case = mock.case1
  const input = _case.get('in')
  const shouldOut = _case.get('out')

  const component = createComponent(input)
  const actualOut = component.getOptions()

  it('should data return equal', function () {
    const data = actualOut.data()
    expect(data).to.deep.equal(input.data)
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
    expect(component).to.be.a('object')
  })

  it('should return component.cmlType is "web"', function () {
    expect(component.cmlType).to.equal('web')
  })

  it('should return', function () {
    const _case = mock.case2
    const input = _case.get('in')
    const shouldOut = _case.get('out')
    const component = createComponent(input)
    const actualOut = component.getOptions()
    expect(actualOut).to.deep.equal(shouldOut)
  })
})
