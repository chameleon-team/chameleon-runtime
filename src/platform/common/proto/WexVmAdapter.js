import BaseVmAdapter from './BaseVmAdapter'
import { type, isObject } from '../util/type'
import { propToFn, transferLifecycle, noop } from '../util/util'
import { mergeHooks } from '../util/resolve'

// web&&weex options transform 基类
class WexVmAdapter extends BaseVmAdapter {
  constructor(config) {
    super(config)
    this.needAddHookMixin = config.needAddHookMixin
  }

  init () {
    this.initOptions(this.options)
    // 处理 mixins 
    this.initMixins(this.options)
    // 处理 生命周期多态
    this.extendPolyHooks()

    // 添加各种mixins
    this.mergeBuiltinMixins()
    // 修改 vue options 的合并策略
    this.resolveOptions()

    // 添加生命周期代理
    this.needAddHookMixin && this.addHookMixin()
  }

  initOptions(options) {
    // 处理 props
    this.handleProps(options)
    // 处理 data
    propToFn(options, 'data')
    // 处理 生命周期映射
    transferLifecycle(options, this.hooksMap)
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
      
      propToFn(prop, 'default')
    })
  }

  initMixins (options) {
    if (!options.mixins) return

    const mixins = options.mixins

    mixins.forEach((mix) => {
      this.initOptions(mix)
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

  }

  addHookMixin () {
    if (!this.hooks || !this.hooks.length) return
    
    let self = this
    this.hooks.forEach(key => {
      let hook = this.options[key]

      if (key === 'mounted' || key === 'beforeDestroy') {
        // 预置空function
        hook = hook || noop
      }
      
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
