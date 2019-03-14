import { type } from '../../common/util/type'

export function styleHandle(source, detectCycles, __alreadySeen) {
  if (detectCycles === void 0) { detectCycles = true; }
  if (__alreadySeen === void 0) { __alreadySeen = []; }

  function cache(value) {
    if (detectCycles)
        __alreadySeen.push([source, value]);
    return value;
  }

  if (detectCycles && __alreadySeen === null)
          __alreadySeen = [];
  if (detectCycles && source !== null && typeof source === "object") {
      for (var i = 0, l = __alreadySeen.length; i < l; i++)
          if (__alreadySeen[i][0] === source)
              return __alreadySeen[i][1];
  }

  if (type(source) === 'Array') {
      var res = cache([]);
      var toAdd = source.map(function (value) { return styleHandle(value, detectCycles, __alreadySeen); });
      res.length = toAdd.length;
      for (var i = 0, l = toAdd.length; i < l; i++)
          res[i] = toAdd[i];
      return res;
  }
  if (type(source) === 'Object') {
      var res = cache({});
      for (var key in source)
          res[key] = styleHandle(source[key], detectCycles, __alreadySeen);
      return res;
  }

  if (type(source) === 'String')
      return pxTransform(source)
  
  return source
}

function pxTransform(s) {
  if (!~s.indexOf('cpx')) {
    return s
  }
  
  return s.replace(/(([\s:(]|^)-?)(\d*\.?\d+)cpx/ig, (m) => {
    return m.replace('cpx', 'rpx')
  })
}