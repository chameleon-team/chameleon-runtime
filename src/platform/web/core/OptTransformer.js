import WexOptTransformer from '../../common/proto/WexOptTransformer'
import { query2json } from '../../common/util/url'
import { type } from '../../common/util/type';

class OptTransformer extends WexOptTransformer {
  constructor(config) {
    super(config)

    this.init()
  }

  proxyLifecycle(name, hook, ctx) {
    if (type(hook) === 'Array') {
      hook = hook[0]
    }

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
          args = addQueryArgs(...args)
          return hook.apply(ctx, args)
        }
        break
      case 'beforeRouteEnter':
      case 'beforeRouteLeave':
      
        if (type(self.options.methods[name]) !== 'Function') {
          // interface: beforeRouteEnter|beforeRouteLeave 需要特殊定制
          closure = function (...args) {
            // 使用 route 钩子需要执行next回调
            const next = args[args.length - 1]
            type(next) === 'Function' && next()

            return hook.apply(ctx, args)
          }
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

  let searchObj = query2json(location.search)

  let hashObj = query2json(location.hash)

  args[0] = { ...args[0], ...searchObj, ...hashObj}

  return args
}

export default OptTransformer


