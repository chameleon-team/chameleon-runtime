import '../../global/web/index'

import chai from 'chai';
const expect = chai.expect

import { resolveTestOutput } from '../../build/util'

const cmlPath = resolveTestOutput('index', 'web')

const {createComponent} = require(cmlPath).default

import * as mock from '../../mock/web/options'

describe('instance', function () {
  describe('component', function () {
      let _case = mock.case1
      let input = _case.get('in')
      let shouldOut = _case.get('out')

      let component = createComponent(input)
      let actualOut = component.getOptions()

      
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
        expect(component).to.be.a('object');
      })

      it('should return component.cmlType is "web"', function () {
        expect(component.cmlType).to.equal('web');
      })

      it(`should return`, function () {
        let _case = mock.case2
        let input = _case.get('in')
        let shouldOut = _case.get('out')
        let component = createComponent(input)
        let actualOut = component.getOptions()
        expect(actualOut).to.deep.equal(shouldOut)
      })

  })
})