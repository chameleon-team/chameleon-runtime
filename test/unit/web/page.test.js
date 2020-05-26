/* eslint-disable no-undef */
import '../../global/web/index'

import * as mock from '../../mock/web/options'
import { createPage } from '../../mock/web/util'

import chai from 'chai'
const expect = chai.expect

describe('【web】-【createPage】', function () {
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
