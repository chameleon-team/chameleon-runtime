import { type } from './type'


export function styleHandle(source, detectCycles = true, __alreadySeen = []) {

  function cache(value) {
    if (detectCycles) {
      __alreadySeen.push([source, value])
    }
    return value
  }

  if (detectCycles && __alreadySeen === null) {
    __alreadySeen = []
  }

  if (detectCycles && source !== null && typeof source === "object") {
      for (let i = 0, l = __alreadySeen.length; i < l; i++) {
        if (__alreadySeen[i][0] === source) {
          return __alreadySeen[i][1];
        }
      }
  }

  if (type(source) === 'Array') {
      let res = cache([]);
      let toAdd = source.map((value) => {
        return styleHandle(value, detectCycles, __alreadySeen)
      });

      res.length = toAdd.length;
      for (let i = 0, l = toAdd.length; i < l; i++) {
        res[i] = toAdd[i]
      }

      return res;
  } else if (type(source) === 'Object') {
      let res = cache({});
      for (let key in source) {
        res[key] = styleHandle(source[key], detectCycles, __alreadySeen)
      }
      return res;
  } else if (type(source) === 'String') {
    return pxTransform(source)
  } else {
    return source 
  }
}

export function pxTransform(s) {
  if (!~s.indexOf('cpx')) {
    return s
  }
  
  return s.replace(/(([\s:(]|^)-?)(\d*\.?\d+)cpx/ig, (m) => {
    return m.replace('cpx', 'rpx')
  })
}