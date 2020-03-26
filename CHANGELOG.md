## [1.0.1]
### Features
- 支持小程序 options 不覆盖 multipleSlots 字段 issue:363
- 支持头条小程序

## [1.0.0]
### Features
- 发布1.0正式版本

## [0.4.0]
### Features
- update mobx@3.x to mobx@4.x

## [0.3.3]
### Bug Fixes
- 解决组件mixins的computed 合并不生效问题
  
## [0.3.2]
### Features
- web 根节点字体添加 'PingFang SC'
  
## [0.3.2-alpha.1]
### Bug Fixes
- 修复组件无computed mixins无效问题
  
## [0.3.2-alpha.0]
### Bug Fixes
- 修复多组件 mixins 串扰问题 
  
## [0.3.1]
### Bug Fixes
- 修复props watch不到问题

## [0.3.0]
### Features
- 0.3.0-alpha.0灰度完成发正式版

## [0.3.0-alpha.0]
### Features
- 微信小程序基础样式区分page、component

## [0.2.3-alpha.0]
### Bug Fixes
- 修复微信小程序 mixins 中 computed 和 watch 不工作的问题

## [0.2.2]
- 0.2.2-alpha.0灰度完成发正式版

## [0.2.2-alpha.0]
### Features
- watch 属性支持配置项`handler、deep、immediate`能力，如，`watch = {a: { handler: function(){}, deep: true, immediate: true }}`

含义如下：
- handler：回调函数
- deep：深度监听，默认为false
- immediate：立即执行，默认为false

## [0.2.1]
### Features
- 支持点击 Android 物理返回键返回上级页面
- 支持 qq 小程序
- 基础样式字符间距letter-space默认变为初始值

## [0.2.0]
### Features
- 新增 Page 页面独有生命周期 onShow、onHide，升级后请将页面的 mounted 改成 onShow
- 优化运行代码性能

## [0.1.3]
### Bug Fixes
- 修复百度小程序生命周期 mouted先于created执行问题
### Features
- 支持[生命周期多态](https://cml.js.org/doc/logic/lifecycle.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%A4%9A%E6%80%81)

## [0.1.1]
### Bug Fixes
- 修复web props 类型type为Array 时报错

## [0.1.0]
### Features
- 优化 数据diff 性能
- 新增 数据diff 单元测试
- 新增微信 Promise shim，支持 `Promise.finally` 、`Promise.done`
- 全局class `border-1px` 换名字， border-* -> cml-border-*
- 支持页面 created、beforeMount 获取页面 [query](https://cml.js.org/doc/logic/lifecycle.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%9B%9E%E8%B0%83%E5%87%BD%E6%95%B0)

## [0.0.12]
### Bug Fixes
- 修复微信 Component created 获取不到props
- 兼容打包多份runtime，点击事件多次触发问题
- 优化微信rpx to px

### Features
- options 对象支持mixins能力，例如：`{ methods:{} , mixins=[{methods:{}}] }`

## [0.0.6]
###Bug Fixes
- 修复 数据diff bug
- 修复 web border-1px 隐藏 bug

## [0.0.5]
### Features
- web&wx 根节点添加基础样式

## [0.0.4]
### Features
- 优化 wx style rpx transform
- 新增 百度小程序 page hook
- 新增 支付宝小程序 event mixins
- 新增 支付宝小程序 组件属性update监听
- 新增 数据diff 性能优化

## [0.0.3]
### Features
- wx 自定义组件的选项默认启用多slot支持
### Bug Fixes
- beforecreate 时机路由query修正