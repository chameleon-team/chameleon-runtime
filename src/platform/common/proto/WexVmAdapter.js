import BaseVmAdapter from './BaseVmAdapter'
import { type, isObject } from '../util/type'
import { propToFn, transferLifecycle } from '../util/util'
import { mergeHooks } from '../util/resolve'

// web&&weex options transform 基类
class WexVmAdapter extends BaseVmAdapter {
  constructor(config) {
    super(config)
    this.needAddHookMixin = config.needAddHookMixin
  }

  init () {
    // 处理 props
    this.initProps(this.options)
    // 处理 data
    propToFn(this.options, 'data')
    // 处理 生命周期映射
    transferLifecycle(this.options, this.hooksMap)
    // 处理 mixins 里的data 和lifecycle映射
    this.handleMixins(this.options)
    // 处理 生命周期多态
    this.extendPolyHooks()

    // 添加各种mixins
    this.mergeBuiltinMixins()
    // 修改 vue options 的合并策略
    this.resolveOptions()

    // 添加生命周期代理
    this.needAddHookMixin && this.addHookMixin()
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

      if (type(prop) === 'Object' && isObject(prop['default'])) {
        propToFn(prop, 'default')
      }
    })
  }

  handleMixins (vmObj) {
    if (!vmObj.mixins) return

    const mixins = vmObj.mixins

    mixins.forEach((mix) => {
      propToFn(mix, 'data')
      transferLifecycle(mix, this.hooksMap)
    })
  }

  /**
   * 类web端差异化生命周期 hooks mixins
   */
  extendPolyHooks() {
    let methods = this.options.methods

    if (!methods || !this.polyHooks) {
      return
    }
    
    this.polyHooks.forEach((hook) => {
      // 目前是 给web的beforeRouteEnter|beforeRouteLeave 自定义生命钩子开一个口子
      if (type(methods[hook]) === 'Function') {
        this.options[hook] = methods[hook]
      }
    })
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
    function mergeHook (parentVal, childVal) {
      const res = childVal
        ? parentVal
          ? parentVal.concat(childVal)
          : Array.isArray(childVal)
            ? childVal
            : [childVal]
        : parentVal
      return res
    }

    const strats = Vue.config.optionMergeStrategies
    this.hooks.forEach(hook => {
      strats[hook] = mergeHook
    })
  }

  addHookMixin () {
    if (!this.hooks || !this.hooks.length) return
    
    let self = this
    this.hooks.forEach(key => {
      const hook = this.options[key]
      hook && (this.options[key] = function (...args) {
        let result
        if (type(hook) === 'Function' || type(hook) === 'Array') {
          // 钩子函数参数mixin
          const proxyHook = self.proxyLifecycle(key, hook, this)
          result = proxyHook.apply(this, args)
        }
  
        return result
      })
    })
  }
}

export default WexVmAdapter
