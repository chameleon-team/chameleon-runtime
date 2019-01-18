import '../../global/web/index'

import chai from 'chai';
const expect = chai.expect

import { resolveTestOutput } from '../../build/util'

const cmlPath = resolveTestOutput('index', 'web')

const cml = require(cmlPath).default

import * as mock from '../../mock/web/options'

describe('render 模块', function () {
  let _case = mock.case1
  let input = _case.get('in')
  let shouldOut = _case.get('out')

  let page = cml.createPage(input)
  let actualOut = page.getOptions()

  describe('chameleon 模块', function () {
    it('chameleon should init', function () {
      expect(chameleon._inited).to.equal(true);
    })

    it('chameleon.requireModule should', function () {
      
      expect(chameleon._inited).to.equal(true);
    })
  })

  describe('Vue', function () {
    it('Vue should set global', function () {
      expect(Vue).to.not.equal(undefined);
    })
    it('Vue.config.isReservedTag should return', function () {
      let isReservedTag = Vue.config.isReservedTag('html:input')
      expect(isReservedTag).to.equal(true);
    })

    it('Vue.config.parsePlatformTagName should return', function () {
      let res = Vue.config.parsePlatformTagName('html:input')
      
      expect(res).to.equal('input');
    })

    it('Vue.config.getTagNamespace should return undefined', function () {
      let res = Vue.config.getTagNamespace('video')
      expect(res).to.equal(undefined);
    })

    it('Vue.config.getTagNamespace should return', function () {
      let res = Vue.config.getTagNamespace('form')
      
      expect(res).to.equal(undefined);
    })
  })

})