import '../../global/wx/index'

import chai from 'chai'

import { resolveTestOutput } from '../../build/util'
const expect = chai.expect

const stylPath = resolveTestOutput('src/platform/common/util/style', 'wx')

const util = require(stylPath)

const input = {
  a1: '8cpx',
  a2: '0.0cpx',
  a3: ' .8cpx',
  a4: ' 8.cpx',
  a5: '-21cpx',
  a6: ' -21cpx',
  a7: '.8cpx',
  a8: 'transform(8cpx)',
  a9: 'px 转 cpx',
  a10: 'px2cpx',
  a11: 'cpx 转 px',
  a12: 'cpx2px',
  a13: 'cpx',
  a: 'font-size:20cpx;margin: 4cpx;border:0cpx;padding:4rpx', // String
  b: { // Object
    b1: 'font-size:20cpx;margin: 4cpx;border:0cpx;padding:4rpx',
    b2: {
      b21: '3242',
      b22: [
        {
          b221: 'font-size:20cpx;margin: 4cpx;border:0cpx;padding:4rpx'
        },
        [
          {
            b222: 'font-size:20cpx;margin: 4cpx;border:0cpx;padding:4rpx'
          },
          'font-size:20cpx;margin: 4cpx;border:0cpx;padding:4rpx'
        ]
      ]
    }
  },
  c: ['font-size:20cpx;margin: 4cpx;border:0cpx;padding:4rpx', '1', 'fds'], // Array
  d: new Date(), // Date
  e: undefined,
  f: null,
  g: '213123cpx',
  h: false, // Boolean
  i: 3212, // Number
  j: '3212px', // Number
  k: 'px2cpx'
}

const output = {
  a1: '8rpx',
  a2: '0.0rpx',
  a3: ' .8rpx',
  a4: ' 8.cpx',
  a5: '-21rpx',
  a6: ' -21rpx',
  a7: '.8rpx',
  a8: 'transform(8rpx)',
  a9: 'px 转 cpx',
  a10: 'px2cpx',
  a11: 'cpx 转 px',
  a12: 'cpx2px',
  a13: 'cpx',
  a: 'font-size:20rpx;margin: 4rpx;border:0rpx;padding:4rpx', // String
  b: { // Object
    b1: 'font-size:20rpx;margin: 4rpx;border:0rpx;padding:4rpx',
    b2: {
      b21: '3242',
      b22: [
        {
          b221: 'font-size:20rpx;margin: 4rpx;border:0rpx;padding:4rpx'
        },
        [
          {
            b222: 'font-size:20rpx;margin: 4rpx;border:0rpx;padding:4rpx'
          },
          'font-size:20rpx;margin: 4rpx;border:0rpx;padding:4rpx'
        ]
      ]
    }
  },
  c: ['font-size:20rpx;margin: 4rpx;border:0rpx;padding:4rpx', '1', 'fds'], // Array
  d: new Date(), // Date
  e: undefined,
  f: null,
  g: '213123rpx',
  h: false, // Boolean
  i: 3212, // Number
  j: '3212px',
  k: 'px2cpx'
}

describe('【common】 style transform', function () {
  it('should cpx transform to rpx', function () {
    const actualOut = util.styleHandle(input)
    expect(actualOut).to.deep.equal(output)
  })
})
