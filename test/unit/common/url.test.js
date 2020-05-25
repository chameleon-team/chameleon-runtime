import '../../global/web/index'
import chai from 'chai'

import { resolveTestSrc } from '../../build/util'
const expect = chai.expect

const urlModulePath = resolveTestSrc('platform/common/util/url', 'web')

const url = require(urlModulePath)

describe('【common】 url 工具方法', function () {
  describe('url.isObject', function () {
    it('should judge {} is an object', function () {
      expect(url.isObject({})).to.equal(true)
    })

    it('should judge null is not an object', function () {
      expect(url.isObject(null)).to.equal(false)
    })

    it('should judge function is not an object', function () {
      expect(url.isObject(function () {})).to.equal(false)
    })
  })

  describe('url.json2query', function () {
    it('should transfrom object to url querystring', function () {
      const obj = {
        a: 'a',
        b: 'b',
        c: 'c',
        d: 'd='
      }

      expect(url.json2query(obj)).to.equal('a=a&b=b&c=c&d=d%3D')
    })

    it('should transfrom object to url querystring without encodeURIComponent', function () {
      const obj = {
        a: 'a',
        b: 'b',
        c: 'c',
        d: 'd='
      }

      expect(url.json2query(obj, false)).to.equal('a=a&b=b&c=c&d=d=')
    })

    it('should transfrom string to ""', function () {
      expect(url.json2query('obj')).to.equal('')
    })
  })

  describe('url.query2json', function () {
    it('should transfrom url querystring to an object', function () {
      const obj = {
        a: 'a',
        b: 'b',
        c: 'c',
        d: 'd='
      }

      expect(url.query2json('http://www.baidu.com?a=a&b=b&c=c&d=d%3D')).to.deep.equal(obj)
    })

    it('should transfrom empty string to {}', function () {
      expect(url.query2json('')).to.deep.equal({})
    })
  })
})
