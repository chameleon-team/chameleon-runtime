import '../../global/wx/index'

import chai from 'chai';
const expect = chai.expect

import { resolveTestOutput } from '../../build/util'

const cmlPath = resolveTestOutput('index', 'wx')

const {createComponent} = require(cmlPath).default

import * as mock from '../../mock/wx/component/options'
const _case = mock.case1
const input = _case.get('in')
const shouldOut = _case.get('out')

const component = createComponent(input)
const actualOut = component.getOptions()

describe('createComponent', function () {
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
          expect(component).to.be.a('object');
        })
  
        it('should return component.cmlType is "wx"', function () {
          expect(component.cmlType).to.equal('wx');
        })
    })

    describe('runtime widgets', function () {
      describe('created', function() {
         const created = actualOut.created.bind(__CML__GLOBAL.Component)
        created()
      })

      describe('attached', function() {
        const attached = actualOut.attached.bind(__CML__GLOBAL.Component)
        attached()
      })

      describe('ready', function() {
        const ready = actualOut.ready.bind(__CML__GLOBAL.Component)
        ready()
      })

      describe('detached', function() {
        const detached = actualOut.detached.bind(__CML__GLOBAL.Component)
        detached()
      })
    })
  })