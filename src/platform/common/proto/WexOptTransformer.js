import BaseOptionsTransformer from './BaseOptionsTransformer'
import { type, isObject } from '../util/type'
import { propToFn, transferLifecycle } from '../util/util'

// web&&weex options transform 基类
class WexOptTransformer extends BaseOptionsTransformer {
  constructor(config) {
    super(config)
    this.needAddHookMixin = config.needAddHookMixin
  }

  init () {
    this.initProps(this.options)
    propToFn(this.options, 'data')
    // 生命周期映射
    transferLifecycle(this.options, this.hooksMap)
    this.handleMixins(this.options)

    this.extendPolyHooks()

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

export default WexOptTransformer
