import BaseVmAdapter from './BaseVmAdapter'

import { hasOwn, transferLifecycle, extend, extendWithIgnore, rename, enumerableKeys } from '../util/util'
import { type } from '../util/type'
import {mergeDefault, mergeHooks, mergeSimpleProps, mergeData, mergeWatch} from '../util/resolve'
import { comparer } from 'mobx'
import KEY from '../util/KEY'
import lifecycle from '../util/lifecycle'
import { deepClone } from '../util/clone'

const KEY_COMPUTED = KEY.get('computed')

// 各种小程序options transform 基类
class MiniVmAdapter extends BaseVmAdapter {
  constructor(config) {
    super(config)
    
    //小程序特有
    this.needPropsHandler = config.needPropsHandler
    
    this.needResolveAttrs = config.needResolveAttrs
    this.needTransformProperties = config.needTransformProperties
  }

  init () {
    this.propsName = this.platform ? KEY.get(`${this.platform}.props`) : ''

    // 处理 CML hooks
    this.initHooks(this.options)

    this.initOptions(this.options)
    // 处理 mixins 
    this.initMixins(this.options)
    
    // 处理 生命周期多态
    this.extendPolyHooks()
    
    // init 顺序很重要、

    // 添加各种mixins
    // this.mergeInjectedMixins()
    this.mergeBuiltinMixins()
    // 处理 mixins
    this.resolveOptions()
    // 添加 生命周期代理
    this.transformHooks()
    // 处理 methods
    this.needResolveAttrs && this.resolveAttrs()
    // 处理 props 添加监听
    this.needTransformProperties && this.transformProperties()
  }

  /**
   * merge cml hooks from mixins
   * handle hooks include:
   * 1. cml hooks
   * 2. platforms hooks in resolveOptions function
   * @param {Object} options 
   */
  initHooks(options) {
    if (!options.mixins) return
    options.mixins = deepClone(options.mixins)

    const cmlHooks = lifecycle.get('cml.hooks')
    const mixins = options.mixins

    for (let i = mixins.length - 1; i >= 0; i--) {
      const mix = mixins[i]

      Object.keys(mix).forEach(key => {
        if (cmlHooks.indexOf(key) !== -1) {
          !Array.isArray(mix[key]) && (mix[key] = [mix[key]])

          if (hasOwn(options, key)) {
            !Array.isArray(options[key]) && (options[key] = [options[key]])

            options[key] = mix[key].concat(options[key])
          } else {
            options[key] = mix[key]
          }
          delete mix[key]
        }
      })
    }
  }

  initOptions(options) {
    // 处理 props
    this.needPropsHandler && this.handleProps(options)
    // 处理 生命周期映射
    transferLifecycle(options, this.hooksMap)
    this.handleComputed(options)
  }

  /**
   * 处理组件props属性
   * @param  {Object} options 组件options
   * @return {[type]}     [description]
   */
  handleProps (options) {
    if (!options['props']) return
    
    Object.getOwnPropertyNames(options['props']).forEach((name) => {
      let prop = options['props'][name]
      // Number: 0
      // Boolean: false
      // Array: false
      // String: ''
      // Object: null
      // null: null
      function make(type) {
        if (!knowType(type)) {
          return
        }

        switch (type) {
          case Number:
            prop = options['props'][name] = {
              type: Number,
              default: 0
            }
            break
          case Boolean:
            prop = options['props'][name] = {
              type: Boolean,
              default: false
            }
            break
          case Array:
            prop = options['props'][name] = {
              type: Array,
              default: []
            }
            break
          case String:
            prop = options['props'][name] = {
              type: String,
              default: ''
            }
            break
          case Object:
            prop = options['props'][name] = {
              type: Object,
              default: null
            }
            break
          case null:
            prop = options['props'][name] = {
              type: null,
              default: null
            }
            break
          default:
            break
        }
      }

      function knowType(type) {
        return type === Number || type === Boolean || type === Array || type === String || type === Object || type === null
      }
      
      // 处理 props = { a: String, b: Boolean }
      make(prop)

      if (type(prop) === 'Object') {
        if (this.platform === 'alipay') {
          if (!prop.hasOwnProperty('default')) {
            // alipay 处理 // 处理 props = { a: {type:String}, b: {type:Boolean} }
            make(prop.type)
          }
          
          options['props'][name] = prop['default']
          
        } else {
          rename(options['props'][name], 'default', 'value')
        }
      }
    })

    if (this.platform !== 'alipay') {
      rename(options, 'props', 'properties')
    }

    function check(value, type) {
      
      if (typeof value === 'undefined') {
        console.error(`${prop}需要传默认值`)
        return false
      }
      // todo type 校验

    }
  }

  handleComputed (options) {
    options.computed = options.computed || {}
    // handle computed to $cmlComputed
    rename(options, 'computed', KEY_COMPUTED)
  }

  initMixins (options) {
    if (!options.mixins) return

    const mixins = options.mixins

    mixins.forEach((mix) => {
      this.initOptions(mix)
    })
  }

  /**
   * 小程序端差异化生命周期 hooks mixins
   */
  extendPolyHooks() {
    let methods = this.options.methods

    if (!methods) {
      return
    }

    this.polyHooks.forEach((hook) => {
      if (type(methods[hook]) === 'Function') {
        if (type(this.options[hook]) === 'Array') {
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
      this.runtimeMixins
    ].filter(item => item)
  
    this.options.mixins = this.options.mixins
      ? btMixin.concat(this.options.mixins)
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
      let regExp = new RegExp(KEY_COMPUTED + '|methods|proto|' + self.propsName)
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
        
        // 多态生命周期需要统一回调参数
        // if (self.polyHooks.indexOf(key) > -1) {
        //   let res = args[0]
        //   if (type(res) !== 'Object') {
        //     res = {
        //       'detail': args[0]
        //     }
        //   }
        //   args = [res]
        // }

        if (type(hooksArr) === 'Function') {
          result = hooksArr.apply(this, args)
        } else if (type(hooksArr) === 'Array') {
          for (let i = 0; i < hooksArr.length; i++) {
            if (type(hooksArr[i]) === 'Function') {

              result = hooksArr[i].apply(this, args)
    
              // if (result && result.enableAsync) {
              //   asyncQuene = hooksArr.slice(i + 1)
              //   break
              // }
            }
          }
          // Promise.resolve().then(() => {
          //   asyncQuene.forEach(fn => {
          //     fn.apply(this, args)
          //   })
          // })
        }
        return result
      })
    })
  }
  
  resolveAttrs () {
    if (!this.needResolveAttrs.length) return
    let keys = this.needResolveAttrs
    if (type(keys) === 'String') {
      keys = [keys]
    }

    keys.forEach(key => {
      const value = this.options[key]
      if (type(value) !== 'Object') return
      
      extendWithIgnore(this.options, value, this.usedHooks)
      delete this.options[key]
    })
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
        if (comparer.structural(value, oldValue)) return
        this[key] = value
        typeof rawObserver === 'function' && rawObserver.call(this, value, oldValue)
      }
      newProps[key] = newFiled
    })
  
    this.options[this.propsName] = newProps
  }
}

export default MiniVmAdapter
