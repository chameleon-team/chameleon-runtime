import WexOptTransformer from '../../common/proto/WexOptTransformer'

class OptTransformer extends WexOptTransformer {
  constructor(config) {
    super(config)

    this.init()
  }

  proxyLifecycle(name, hook, ctx) {
    const self = this
    let closure = function(...args) {
      // 这里的 ctx 是指向运行时上下文的
      return hook.apply(ctx, args)
    }

    switch(name) {
      case 'beforeCreate':
      case 'created':
      case 'beforeMount':
        closure = function (...args) {
          args = self.addQueryArgs(...args)
          return hook.apply(ctx, args)
        }
        break
      default:
        break
    }

    return closure
  }

  addQueryArgs(...args) {
    args = args || []

    let obj = this.$route && this.$route.query
  
    args[0] = {...args[0], ...obj}
  
    return args
  }

}

export default OptTransformer
