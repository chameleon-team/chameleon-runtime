import WexVmAdapter from '../../common/proto/WexVmAdapter'

class VmAdapter extends WexVmAdapter {
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
          args = addQueryArgs.apply(ctx, args)
          return hook.apply(ctx, args)
        }
        break
      case 'mounted':
        closure = function (...args) {
          const showHook = self.options['onShow']
          typeof showHook === 'function' && showHook.call(ctx)
          return hook.apply(ctx, args)
        }
        break
      case 'beforeDestroy':
        closure = function (...args) {
          const hideHook = self.options['onHide']
          typeof hideHook === 'function' && hideHook.call(ctx)
          return hook.apply(ctx, args)
        }
        break
      default:
        break
    }

    return closure
  }
}

function addQueryArgs(...args) {
  args = args || []

  let obj = this.$route && this.$route.query

  args[0] = {...args[0], ...obj}

  return args
}

export default VmAdapter
