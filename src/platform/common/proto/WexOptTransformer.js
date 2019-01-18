import BaseOptionsTransformer from './BaseOptionsTransformer'
import { type } from '../util/type'

// web&&weex options transform 基类
class WexOptTransformer extends BaseOptionsTransformer {
  constructor(config) {
    super(config)
    this.needAddHookMixin = config.needAddHookMixin
  }

  init () {
    this.transformData()
    this.needAddHookMixin && this.addHookMixin()
  }

  // 对象属性 `data` 的 映射
  transformData () {
    if (this.options['data']) {
      var _temp = this.options['data']
  
      this.options['data'] = function() {
        return {
          ..._temp
        }
      }
    }
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
