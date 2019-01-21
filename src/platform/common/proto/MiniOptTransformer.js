import BaseOptionsTransformer from './BaseOptionsTransformer'

import { extend, rename, enumerableKeys } from '../util/util'
import { type } from '../util/type'
import {mergeDefault, mergeHooks, mergeSimpleProps, mergeData, mergeWatch} from '../util/resolve'
import { extras } from 'mobx'
import lifecycle from '../util/lifecycle'
import KEY from '../util/KEY'

// 各种小程序options transform 基类
class MiniOptTransformer extends BaseOptionsTransformer {
  constructor(config) {
    super(config)
    
    //小程序特有
    this.needPropsHandler = config.needPropsHandler
    
    this.needResolveAttrs = config.needResolveAttrs
    this.needTransformProperties = config.needTransformProperties
  }

  init () {
    this.propsName = this.platform ? KEY.get(`${this.platform}.props`) : ''
    this.whitelist = this.platform ? lifecycle.get(`${this.platform}.${this.type}.whitelist`) : []
    
    this.needPropsHandler && this.propsHandler()
    // 生命周期映射
    this.lifecycleHandler()
    // 各端差异化生命周期
    this.extendWhitelistHooks()
    
    // init 顺序很重要
    this.mergeInjectedMixins()
    this.mergeBuiltinMixins()
    this.resolveOptions()
    this.transformHooks()
    this.needResolveAttrs && this.resolveAttrs()
    this.needTransformProperties && this.transformProperties()
  }

/**
   * 处理组件props属性
   * @param  {Object} obj 组件options
   * @return {[type]}     [description]
   */
  propsHandler () {
    let obj = this.options
    if (!obj['props']) {
      return
    }

    Object.getOwnPropertyNames(obj['props']).forEach((name) => {
      const self = this
      let prop = obj['props'][name]

      if (type(prop) === 'Object' && prop.hasOwnProperty('default')) {
        check(prop['default'], prop['type'])

        if (this.platform === 'alipay') {
          obj['props'][name] = prop['default']
          // todo 收集自定义事件
        } else {
          rename(prop, 'default', 'value')
        }
      }
    })

    if (this.platform !== 'alipay') {
      rename(obj, 'props', 'properties')
    }

    function check(value, type) {
      
      if (typeof value === 'undefined') {
        console.error(`${prop}需要传默认值`)
        return false
      }
      // todo type 校验

    }
  }

  /**
   * 生命周期映射
   * @param  {Object} obj 待添加属性对象
   * @param  {Object} map 映射表
   * @param  {Object} lifecycle 生命周期序列 确保顺序遍历
   * @return {Object}     修改后值
   */
  lifecycleHandler() {
    // 将生命周期 键名 处理成 ['_' + key]
    let cmlHooks = lifecycle.get('cml.hooks').map(key => '_' + key)
    let obj = this.options
    let _map = {}

    Object.keys(this.hooksMap).forEach(key => {
      _map['_' + key] = this.hooksMap[key]
      
      if (obj.hasOwnProperty(key)) {
        obj['_' + key] = obj[key]
        delete obj[key]
      }
    })

    cmlHooks.forEach(function(key) {
      var mapVal = _map[key]
      var objVal = obj[key]
  
      if (obj.hasOwnProperty(key)) {
        if (obj.hasOwnProperty(mapVal)) {
          if (type(obj[mapVal]) !== 'Array') {
            obj[mapVal] = [obj[mapVal], objVal]
          } else {
            obj[mapVal].push(objVal)
          }
        } else {
          obj[mapVal] = [objVal]
        }
        delete obj[key]
      }
    })
  }

  /**
   * 小程序端差异化生命周期 hooks mixins
   */
  extendWhitelistHooks() {
    let allHooks = this.hooks.concat(this.whitelist)
    let methods = this.options.methods

    if (!methods) {
      return
    }

    allHooks.forEach((hook) => {
      if (type(methods[hook]) === 'Function') {
        if (this.options[hook]) {
          this.options[hook].push(methods[hook])
        } else {
          this.options[hook] = [methods[hook]]
        }
        delete methods[hook]
      }
    })
  }

  mergeInjectedMixins () {
    this.options.mixins = this.options.mixins
      ? this.options.mixins.concat(this.injectMixins)
      : this.injectMixins
  }
  
  mergeBuiltinMixins () {
    const btMixin = [
      this.baseMixins,
      this.builtinMixins
    ].filter(item => item)
  
    this.options.mixins = this.options.mixins
      ? this.options.mixins.concat(btMixin)
      : btMixin
  }
  
  
  resolveOptions () {
    const self = this
    let extractMixins = function (mOptions, options) {
      if (options.mixins) {
        for (const mix of options.mixins) {
          extractMixins(mOptions, mix)
        }
      }
      mergeMixins(mOptions, options)
    }
  
    let mergeMixins = function (parent, child) {
      for (let key in child) {
        if (self.hooks.indexOf(key) > -1) {
          mergeHooks(parent, child, key)
        } else if (key === 'data') {
          mergeData(parent, child, key)
        } else if (testProps(key)) {
          mergeSimpleProps(parent, child, key)
        } else if (key === 'watch') {
          mergeWatch(parent, child, key)
        } else if (key !== 'mixins') {
          mergeDefault(parent, child, key)
        }
      }
    }

    let testProps = function (key) {
      let regExp = new RegExp('computed|methods|proto|' + self.propsName)
      return regExp.test(key)
    }  
  
    const newOptions = {}
    extractMixins(newOptions, this.options)
    this.options = newOptions
  }
  
  transformHooks () {
    if (!this.hooks || !this.hooks.length) return
  
    const self = this
    this.hooks.forEach(key => {
      const hooksArr = self.options[key]
      hooksArr && (self.options[key] = function (...args) {
        let result
        let asyncQuene = []
        for (let i = 0; i < hooksArr.length; i++) {
          if (type(hooksArr[i]) === 'Function') {
            // page 的 onload 生命周期，获取页面参数处理下
            if (key === 'onload') {
  
            }
  
            result = hooksArr[i].apply(this, args)
  
            if (result && result.enableAsync) {
              asyncQuene = hooksArr.slice(i + 1)
              break
            }
          }
        }
        Promise.resolve().then(() => {
          asyncQuene.forEach(fn => {
            fn.apply(this, args)
          })
        })
        return result
      })
    })
  }
  
  resolveAttrs () {
    if (!this.needResolveAttrs.length) return
    const self = this
    let keys = this.needResolveAttrs
    if (type(keys) === 'String') {
      keys = [keys]
    }
    const newOptions = extend({}, self.options)
    keys.forEach(key => {
      const value = self.options[key]
      if (type(value) !== 'Object') return
      delete newOptions[key]
      extend(newOptions, value)
    })
    this.options = newOptions
  }
  
  transformProperties () {
    let originProperties = this.options[this.propsName]
    const newProps = {}
    enumerableKeys(originProperties).forEach(key => {
      const rawFiled = originProperties[key]
      const rawObserver = rawFiled.observer
      let newFiled = null
      if (typeof rawFiled === 'function') {
        newFiled = {
          type: rawFiled
        }
      } else {
        newFiled = extend({}, rawFiled)
      }
      newFiled.observer = function(value, oldValue) {
        // 小程序内部数据使用了JSON.parse(JSON.stringify(x))的方式，导致每次引用都会变化
        if (extras.deepEqual(value, oldValue)) return
        this[key] = value
        typeof rawObserver === 'function' && rawObserver.call(this, value, oldValue)
      }
      newProps[key] = newFiled
    })
  
    this.options[this.propsName] = newProps
  }
}

export default MiniOptTransformer
