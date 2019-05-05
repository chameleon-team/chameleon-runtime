/**
 *  事件管理中心，用于监听，派发事件
 */

function call(callback, args) {
  let fn = callback[0]
  let context = callback[1]
  args = callback[2].concat(args)
  try {
    return fn.apply(context, args)
  } catch (e) {
    setTimeout(function () {
      throw e
    }, 0)
  }
}

function arrayClone(arr, len) {
  let copy = new Array(len)
  while (len--) {
    copy[len] = arr[len]
  }
  return copy
}

function emit(type, ...args) {
  let listenerList = this._listenerMap[type]
  if (!listenerList) {
    return true
  }
  let len = listenerList.cbs.length
  let cbs = arrayClone(listenerList.cbs, len)
  let ret = true
  for (let index = 0; index < len; index++) {
    if (!cbs[index]) {
      continue
    }
    ret = call(cbs[index], args) !== false && ret
  }
  return !!ret
}

class Event {
  constructor() {
    this._listenerMap = {}
  }

  on(type, fn, context, ...rest) {
    let listenerList = this._listenerMap[type]
    if (!listenerList) {
      this._listenerMap[type] = listenerList = {
        args: null,
        cbs: []
      }
    }

    let callback = [fn, context, rest]
    let args = listenerList.args
    if (args) {
      call(callback, args)
    } else {
      listenerList.cbs.push(callback)
    }
  }

  once(type, fn, context, ...rest) {
    let fired = false
    function magic(...args) {
      this.un(type, magic)

      if (!fired) {
        fired = true
        fn.apply(context, args.concat(rest))
      }
    }

    this.on(type, magic, this)
  }

  un(type, fn) {
    let listenerList = this._listenerMap[type]
    if (!listenerList) {
      return true
    }
    if (arguments.length === 1) {
      listenerList.cbs = []
    } else {
      let cbs = listenerList.cbs
      let count = cbs.length
      while (count--) {
        if (cbs[count] && cbs[count][0] === fn) {
          cbs.splice(count, 1)
        }
      }
    }
  }

  emit(type, args) {
    return emit.apply(this, arguments)
  }

  done(type, ...args) {
    let listenerList = this._listenerMap[type]
    if (!listenerList) {
      this._listenerMap[type] = listenerList = {
        args: args,
        cbs: []
      }
    }
    let cbs = listenerList.cbs
    let count = cbs.length
    emit.apply(this, arguments)

    listenerList.args = args
    listenerList.cbs = cbs.slice(count)
  }

  undo(type) {
    let listenerList = this._listenerMap[type]
    if (!listenerList) {
      return false
    }
    listenerList.args = null
  }
}

export default Event
