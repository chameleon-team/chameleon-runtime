import BaseOptionsTransformer from './BaseOptionsTransformer'
import { type, isObject } from '../util/type'
import { propToFn } from '../util/util'

// web&&weex options transform 基类
class WexOptTransformer extends BaseOptionsTransformer {
  constructor(config) {
    super(config)
    this.needAddHookMixin = config.needAddHookMixin
  }

  init () {
    this.initProps(this.options)
    propToFn(this.options, 'data')
    this.handleMixins(this.options)
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
    })
  }

  addHookMixin () {
    if (!this.hooks || !this.hooks.length) return

    let self = this
    
    this.hooks.forEach(key => {
      const hook = this.options[key]
      hook && (this.options[key] = function (...args) {
        let result
  
        if (type(hook) === 'Function') {
          switch(key) {
            case 'beforeCreate':
              // 钩子函数参数mixin
              args = self.beforeCreateArgsMixin ? self.beforeCreateArgsMixin.apply(this, args) : args
              break
            default:
              break
          }
          // 这里的 this 是指向运行时上下文的
          result = hook.apply(this, args)
        }
  
        return result
      })
    })
  }
}

export default WexOptTransformer
