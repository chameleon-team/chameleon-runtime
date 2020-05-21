/* eslint-disable no-undef */
import '../../global/web/index'

import chai from 'chai'

import { resolveTestOutput } from '../../build/util'

import * as mock from '../../mock/web/options'
const expect = chai.expect

const cmlPath = resolveTestOutput('index', 'web')

const { createPage } = require(cmlPath).default

describe('createPage', function () {
  describe('page', function () {
    const _case = mock.case1
    const input = _case.get('in')
    const shouldOut = _case.get('out')

    const page = createPage(input)
    const actualOut = page.getOptions()

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
      expect(page).to.be.a('object')
    })

    it('should return page.cmlType is "web"', function () {
      expect(page.cmlType).to.equal('web')
    })

    it('default options should have mounted and beforeDestroy methods', function () {
      const page = createPage({ props: {} })
      const actualOut = page.getOptions()
      // expect(actualOut).to.deep.equal(shouldOut)
      expect(actualOut).to.be.an('object').that.respondsTo('mounted').and.respondsTo('beforeDestroy')
    })

    it('undefined input and options.mixins should be array', function () {
      const page = createPage()
      const actualOut = page.getOptions()
      expect(actualOut.mixins).to.a('array')
    })

    it('测试 beforeCreate hooksArgsMixin', function (done) {
      const _case = mock.case1
      const input = _case.get('in')
      const shouldOut = _case.get('out')

      const page = createPage(input)
      const actualOut = page.getOptions()

      const beforeCreateHook = actualOut.beforeCreate

      // 与location.href绑定 以及 mock 的 beforeCreate
      const res = beforeCreateHook({ query: 'test' }, 'arg2')

      const shouldRes = Object.assign({}, { query: 'test' }, { a: 'a', b: 'b' }, { hash: 'pa' })

      expect(res).to.be.deep.equal(shouldRes)

      setTimeout(() => {
        done()
      }, 300)
    })
  })
})
