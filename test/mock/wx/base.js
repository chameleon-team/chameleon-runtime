import Config from '../lib/config'
import { resolveTestOutput, resolveTestSrc } from '../../build/util'

const protoModulePath = resolveTestSrc('platform/common/util/proto', 'wx')
const copyProtoProperty = require(protoModulePath).copyProtoProperty

const cloneModulePath = resolveTestSrc('platform/common/util/clone', 'wx')
const deepClone = require(cloneModulePath).deepClone

const cmlPath = resolveTestOutput('index', 'wx')
const { createApp: _createApp, createPage: _createPage, createComponent: _createComponent } = require(cmlPath).default

// 由于createApp会修改input的键值，导致二次使用mock会出问题，需要深拷贝代理，以及拷贝原型链上属性
export const createApp = function (obj) {
  return _createApp(deepClone(copyProtoProperty(obj)))
}

export const createPage = function (obj) {
  return _createPage(deepClone(copyProtoProperty(obj)))
}
export const createComponent = function (obj) {
  return _createComponent(deepClone(copyProtoProperty(obj)))
}

class Button {
  constructor (props) {
    this.data = function () {
      return {
        checkedImg1: 'checkedImg1'
      }
    }
    this.mixins = [
      {
        data: {
          checkedImg2: 'checkedImg2'
        }
      },
      {
        data: function () {
          return {
            checkedImg3: 'checkedImg3'
          }
        }
      }
    ]
  }
}

export const case1 = new Config({
  in: new Button(),
  out: {
    data: {
      checkedImg1: 'checkedImg1',
      checkedImg2: 'checkedImg2',
      checkedImg3: 'checkedImg3'
    }
  }
})
