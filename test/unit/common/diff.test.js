import '../../global/web/index'
import chai from 'chai';
const expect = chai.expect

import { resolveTestSrc } from '../../build/util'

const utilModulePath = resolveTestSrc('platform/common/util/diff', 'wx')

const diff = require(utilModulePath).default

import * as mock from '../../mock/common/diff'

describe('common diff 工具方法', function () {
  it('should correct out diff', function () {
    
    for (let key in mock) {
      let input = mock[key].get('in')
      let output = mock[key].get('out')
      debugger
      let act = diff(input['new'], input['old'])

      expect(output).to.deep.equal(act)
    }
  })
  // 0 new old path result
  // 1.new = old
  // new = 'a' old = 'a' return 
  // new = { a: 'a', b: 'b'} old = { a: 'a', b: 'b'}
  // new = ['a', 'b'] old = ['a', 'b']
  //
  // 2. new != old 
  // 2.1 nType、oType
  // nType = obj oType = obj
  //
  // new.len >= old.len
  // new = { a: 'a', b: 'b', c: 'c', d: 'd'} old = { a: 'a', b: 'b', e: 'e'}
  // new = { a: 'a', b: {b1: 'b.b1',b2: 'b.b2'}, c: 'c', d: 'd'} old = { a: 'a', b: {b1: 'b.b1',b3: 'b.b3'}, e: 'e'}

  // for in new 回到0
  // 
  // new.len < old.len
  // new = { a: 'a', b: ['b[0]','b[1]'], d: 'd'} old = { a: 'a', b: ['b[0]','b[1]','b[2]'], c: 'c', e: 'e'}
  // set path new 
  //
  // nType = arr oType = arr
  // new = [ 'a', 'b', 'c', 'd'] old = [ 'a', 'b', 'e']
  // new = [ 'a', {b: '[0].b', c: '[1].c'}, 'c', 'd'] old = [ 'a', {b: '[0].b', d: '[1].d'}, 'e']
  //
  // new = [ 'a', 'b'] old = [ 'a', 'b', 'e']
  // new = [ 'a', {b: '[0].b', c: '[1].c'}] old = [ 'a', {b: '[0].b', d: '[1].d'}, 'e']

  // nType = obj oType != obj
  // set path new
  
  // nType = arr oType != arr
  // set path new

  // nType = others oType = all
  // set path new

  // new = { a: 'a'} old = { a: 'a'}
})


