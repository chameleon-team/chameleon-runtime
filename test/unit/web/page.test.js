import '../../global/web/index'

import chai from 'chai';
const expect = chai.expect

import { resolveTestOutput } from '../../build/util'

const cmlPath = resolveTestOutput('index', 'web')

const {createPage} = require(cmlPath).default

import * as mock from '../../mock/web/options'

describe('createPage', function () {
  describe('page', function () {
      let _case = mock.case1
      let input = _case.get('in')
      let shouldOut = _case.get('out')
      
      let page = createPage(input)
      let actualOut = page.getOptions()

      
      it(`should data return equal`, function () {
        let data = actualOut['data']()
        expect(data).to.deep.equal(input['data'])
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
        expect(page).to.be.a('object');
      })

      it('should return page.cmlType is "web"', function () {
        expect(page.cmlType).to.equal('web');
      })

      it(`should return`, function () {
        let _case = mock.case2
        let input = _case.get('in')
        let shouldOut = _case.get('out')
        let page = createPage(input)
        let actualOut = page.getOptions()
        expect(actualOut).to.deep.equal(shouldOut)
      })

      it(`输入空options should `, function () {
        let page = createPage()
        let actualOut = page.getOptions()
        expect(actualOut).to.deep.equal({})
      })

      it('测试 beforeCreate hooksArgsMixin', function (done) {
        let _case = mock.case1
        let input = _case.get('in')
        let shouldOut = _case.get('out')
        
        let page = createPage(input)
        let actualOut = page.getOptions()

        let beforeCreateHook = actualOut['beforeCreate']
        
        // 与location.href绑定 以及 mock 的 beforeCreate
        let res = beforeCreateHook({ query: 'test' }, 'arg2')
        
        let shouldRes = Object.assign({}, { query: 'test'}, {a:'a',b:'b'}, {hash:'pa'})
        
        expect(res).to.be.deep.equal(shouldRes)
        
        setTimeout(() => {
          done()
        }, 300)
      })
  })
})