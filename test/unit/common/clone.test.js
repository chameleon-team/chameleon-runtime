/* eslint-disable no-undef */
import chai from 'chai'

import {
  resolveTestSrc
} from '../../build/util'
const expect = chai.expect

const utilModulePath = resolveTestSrc('platform/common/util/clone', 'wx')

const deepClone = require(utilModulePath).deepClone
const deepClone2 = require(utilModulePath).deepClone2
const find = require(utilModulePath).find

describe('深拷贝clone', function () {
  it('find', () => {
    const list = [33, 22, 112, 222, 43]
    expect(find(list, function (a) {
      return a % 2 === 0
    })).to.deep.equal(22)
  })

  it('deepClone: nornal structure', () => {
    const original = {
      a: 1,
      b: 'string',
      c: true,
      d: null,
      e: undefined
    }
    const copy = deepClone(original)

    expect(copy).to.deep.equal(original)

    const copy2 = deepClone2(original)
    expect(copy2).to.deep.equal(original)
  })

  it('deepClone: nested structure', () => {
    const original = {
      a: {
        b: 1,
        c: [2, 3, {
          d: 4
        }]
      }
    }
    const copy = deepClone(original)

    expect(copy).to.deep.equal(original)

    const copy2 = deepClone2(original)
    expect(copy2).to.deep.equal(original)
  })

  it('deepClone: circular structure', () => {
    const original = {
      a: 1
    }
    original.circular = original

    const copy = deepClone(original)

    expect(copy).to.deep.equal(original)

    const copy2 = deepClone2(original)
    expect(copy2).to.deep.equal(original)
  })

  it('can deepClone with ArrayBuffer values', function () {
    var original = {
      hello: 1,
      value: new ArrayBuffer(32)
    }
    const copy = deepClone(original)
    expect(copy).to.deep.equal(original)

    const copy2 = deepClone2(original)
    expect(copy2).to.deep.equal(original)
  })

  it('Date objects', function () {
    var original = {
      d: new Date()
    }
    var copy = deepClone(original)
    expect(copy.d).to.be.instanceOf(Date)

    const copy2 = deepClone2(original)
    expect(copy2.d).to.be.instanceOf(Date)
  })

  it('Date object is cloned', function () {
    var original = {
      d: new Date()
    }
    var copy = deepClone(original)
    var c = (new Date()).getTime() + 100000
    copy.d.setTime(c)
    expect(copy.d.getTime()).to.equal(original.d.getTime())

    var copy2 = deepClone2(original)
    var c2 = (new Date()).getTime() + 100000
    copy2.d.setTime(c2)
    expect(copy2.d.getTime()).to.equal(original.d.getTime())
  })

  it('RegExp objects', function () {
    var original = {
      d: new RegExp()
    }
    var copy = deepClone(original)
    expect(copy.d).to.be.instanceOf(RegExp)

    var copy2 = deepClone2(original)
    expect(copy2.d).to.be.instanceOf(RegExp)
  })

  it('RegExp object is cloned', function () {
    var original = {
      d: new RegExp('b', 'g')
    }
    var copy = deepClone(original)
    copy.d = ''
    expect(copy).not.to.equal(original)

    var copy2 = deepClone2(original)
    copy2.d = ''
    expect(copy2).not.to.equal(original)
  })
})
