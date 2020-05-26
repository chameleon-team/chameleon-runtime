import { resolveTestOutput, resolveTestSrc } from '../../build/util'

const protoModulePath = resolveTestSrc('platform/common/util/proto', 'web')
const copyProtoProperty = require(protoModulePath).copyProtoProperty

const cloneModulePath = resolveTestSrc('platform/common/util/clone', 'web')
const deepClone = require(cloneModulePath).deepClone

const cmlPath = resolveTestOutput('index', 'web')
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
