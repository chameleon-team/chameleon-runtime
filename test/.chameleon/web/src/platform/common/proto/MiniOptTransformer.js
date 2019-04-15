import BaseOptionsTransformer from './BaseOptionsTransformer'

import { transferLifecycle, extend, extendWithIgnore, rename, enumerableKeys } from '../util/util'
import { type } from '../util/type'
import {mergeDefault, mergeHooks, mergeSimpleProps, mergeData, mergeWatch} from '../util/resolve'
import { extras } from 'mobx'
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
    
    this.needPropsHandler && this.initProps(this.options)
    // 生命周期映射
    transferLifecycle(this.options, this.hooksMap)
    this.handleMixins(this.options)
    
    // 扩展各端多态生命周期
    this.extendPolyHooks()
    
    // init 顺序很重要
    // this.mergeInjectedMixins()
    this.mergeBuiltinMixins()
    this.resolveOptions()
    this.transformHooks()
    this.needResolveAttrs && this.resolveAttrs()
    this.needTransformProperties && this.transformProperties()

    if (this.platform === 'alipay') {
      delete this.options['computed']
    }
  }

/**
   * 处理组件props属性
   * @param  {Object} vmObj 组件options
   * @return {[type]}     [description]
   */
  initProps (vmObj) {
    if (!vmObj['props']) return
    
    Object.getOwnPropertyNames(vmObj['props']).forEach((name) => {
      let prop = vmObj['props'][name]
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
            prop = vmObj['props'][name] = {
              type: Number,
              default: 0
            }
            break
          case Boolean:
            prop = vmObj['props'][name] = {
              type: Boolean,
              default: false
            }
            break
          case Array:
            prop = vmObj['props'][name] = {
              type: Array,
              default: []
            }
            break
          case String:
            prop = vmObj['props'][name] = {
              type: String,
              default: ''
            }
            break
          case Object:
            prop = vmObj['props'][name] = {
              type: Object,
              default: null
            }
            break
          case null:
            prop = vmObj['props'][name] = {
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
          
          vmObj['props'][name] = prop['default']
          
        } else {
          rename(vmObj['props'][name], 'default', 'value')
        }
      }
    })

    if (this.platform !== 'alipay') {
      rename(vmObj, 'props', 'properties')
    }

    function check(value, type) {
      
      if (typeof value === 'undefined') {
        console.error(`${prop}需要传默认值`)
        return false
      }
      // todo type 校验

    }
  }

  handleMixins (VMObj) {
    if (!VMObj.mixins) return

    const mixins = VMObj.mixins

    mixins.forEach((mix) => {
      // 生命周期映射
      transferLifecycle(mix, this.hooksMap)
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
      this.builtinMixins
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
