import '../../global/web/index'
import chai from 'chai';
const expect = chai.expect

import { resolveTestSrc } from '../../build/util'

const utilModulePath = resolveTestSrc('platform/common/util/util', 'wx')

const utils = require(utilModulePath)

describe('common diff 工具方法', function () {
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

  describe('utils.normalizeMap', function () {
    it('should transfrom array to map', function () {
      let obj = {
        a: 'a',
        b: 'b',
        c: 'c',
        d: 'd=',
      }

      let arr = ['a', 'b', 'c', 'd']

      expect(utils.normalizeMap(arr)).to.deep.equal({
        a: 'a',
        b: 'b',
        c: 'c',
        d: 'd'
      });
    })
  
    it('should transfrom object return itself', function () {
      let obj = {
        a: 'a',
        b: 'b',
        c: 'c',
        d: 'd='
      }

      expect(utils.normalizeMap(obj)).to.deep.equal(obj);
    })
  })

  describe('utils.merge', function () {
    it('should merge deeply', function () {
      let to = {
        a: 'a',
        b: 'b',
        c: 'c',
        d: 'd=',
        f: {
          f1: 'f1',
          f2: 'f2'
        }
      }

      let from = {
        a: 'a',
        b: 'c',
        c: 'd',
        d: 'd=',
        e: 'e',
        f: {
          f1: '1f'
        }
      }

      let ret = {
        a: 'a',
        b: 'c',
        c: 'd',
        d: 'd=',
        e: 'e',
        f: {
          f1: '1f',
          f2: 'f2'
        }
      }

      expect(utils.merge(to, from)).to.deep.equal(ret);
    })

    it('should return empty string', function () {
      expect(utils.merge('')).to.equal('');
    })
  })

  describe('utils.extend', function () {
    it('should extend', function () {
      let to = {
        a: 'a',
        b: 'b',
        c: 'c',
        d: 'd=',
        f: {
          f1: 'f1',
          f2: 'f2'
        }
      }

      let from1 = {
        a: 'a',
        b: 'c',
        c: 'd',
        d: 'd=',
        e: 'e',
        f: {
          f1: 'from1_f'
        }
      }

      let from2 = {
        a: 'a',
        b: 'c',
        c: 'd',
        d: 'd=',
        e: 'e',
        f: {
          f2: 'from2_f'
        }
      }

      let ret = {
        a: 'a',
        b: 'c',
        c: 'd',
        d: 'd=',
        e: 'e',
        f: {
          f2: 'from2_f'
        }
      }

      expect(utils.extend(to, from1, from2)).to.deep.equal(ret);
    })

    it('should return self', function () {
      let to = {
        a: 'a',
        b: 'b',
        c: 'c',
        d: 'd=',
        f: {
          f1: 'f1',
          f2: 'f2'
        }
      }

      expect(utils.extend(to, '')).to.deep.equal(to);
    })
  })

})


