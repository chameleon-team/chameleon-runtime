
import { warn } from './debug'
import { isPromise } from './type'

export function handleError (err, vm, info) {
  try {
    if (vm) {
      let cur = vm
      while ((cur = cur.$parent)) {
        const hooks = cur.$options.errorCaptured
        if (hooks) {
          for (let i = 0; i < hooks.length; i++) {
            try {
              const capture = hooks[i].call(cur, err, vm, info) === false
              if (capture) return
            } catch (e) {
              logError(e, cur, 'errorCaptured hook')
            }
          }
        }
      }
    }
    logError(err, vm, info)
  } finally {
    
  }
}

function logError (err, vm, info) {
  if (process.env.media !== 'build') {
    warn(`Error in ${info}: "${err.toString()}"`, vm)
  }
  /* istanbul ignore else */
  if (typeof console !== 'undefined') {
    console.error(err)
  } else {
    throw err
  }
}

export function invokeWithErrorHandling (handler, context, args, vm, info) {
  let res
  try {
    res = args ? handler.apply(context, args) : handler.call(context)
    if (res && isPromise(res) && !res._handled) {
      res.catch(e => handleError(e, vm, info + ` (Promise/async)`))
      res._handled = true
    }
  } catch (e) {
    handleError(e, vm, info)
  }
  return res
}
