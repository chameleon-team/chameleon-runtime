import '../../global/web/index'

import chai from 'chai'

import { resolveTestOutput } from '../../build/util'

import * as mock from '../../mock/web/options'
const expect = chai.expect

const cmlPath = resolveTestOutput('index', 'web')

const cml = require(cmlPath).default

describe('render 模块', function () {
  const _case = mock.case1
  const input = _case.get('in')
  const shouldOut = _case.get('out')

  const page = cml.createPage(input)
  const actualOut = page.getOptions()

  describe('chameleon 模块', function () {
    it('chameleon should init', function () {
      expect(chameleon._inited).to.equal(true)
    })

    it('chameleon.requireModule should', function () {
      expect(chameleon._inited).to.equal(true)
    })
  })

  describe('Vue', function () {
    it('Vue should set global', function () {
      expect(Vue).to.not.equal(undefined)
    })
    it('Vue.config.isReservedTag should return', function () {
      const isReservedTag = Vue.config.isReservedTag('html:input')
      expect(isReservedTag).to.equal(true)
    })

    it('Vue.config.parsePlatformTagName should return', function () {
      const res = Vue.config.parsePlatformTagName('html:input')

      expect(res).to.equal('input')
    })

    it('Vue.config.getTagNamespace should return undefined', function () {
      const res = Vue.config.getTagNamespace('video')
      expect(res).to.equal(undefined)
    })

    it('Vue.config.getTagNamespace should return', function () {
      const res = Vue.config.getTagNamespace('form')

      expect(res).to.equal(undefined)
    })
  })
})
