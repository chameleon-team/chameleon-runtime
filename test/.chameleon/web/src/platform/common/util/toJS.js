import {
  isObservable,
  isObservableArray,
  isObservableObject,
  isObservableMap,
  isBoxedObservable
} from 'mobx'

import { type } from './type'

import { pxTransform } from './style'

export default function toJS(source, detectCycles, __alreadySeen, needPxTransfer = true) {
  if (detectCycles === void 0) { detectCycles = true; }
  if (__alreadySeen === void 0) { __alreadySeen = []; }
  // optimization: using ES6 map would be more efficient!
  // optimization: lift this function outside toJS, this makes recursion expensive
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
      
  if (isObservable(source)) {
      if (isObservableArray(source)) {
          var res = cache([]);
          var toAdd = source.map(function (value) { return toJS(value, detectCycles, __alreadySeen); });
          res.length = toAdd.length;
          for (var i = 0, l = toAdd.length; i < l; i++)
              res[i] = toAdd[i];
          return res;
      }
      if (isObservableObject(source)) {
          var res = cache({});
          for (var key in source)
              res[key] = toJS(source[key], detectCycles, __alreadySeen);
          return res;
      }
      if (isObservableMap(source)) {
          var res_1 = cache({});
          source.forEach(function (value, key) { return (res_1[key] = toJS(value, detectCycles, __alreadySeen)); });
          return res_1;
      }
      if (isBoxedObservable(source))
          return toJS(source.get(), detectCycles, __alreadySeen);
  } else {
    if (type(source) === 'Array') {
        let res = cache([]);
        let toAdd = source.map((value) => {
          return toJS(value, detectCycles, __alreadySeen)
        });

        res.length = toAdd.length;
        for (let i = 0, l = toAdd.length; i < l; i++) {
          res[i] = toAdd[i]
        }

        return res;
    } else if (type(source) === 'Object') {
        let res = cache({});
        for (let key in source) {
          res[key] = toJS(source[key], detectCycles, __alreadySeen)
        }
        return res;
    } else if (type(source) === 'String') {
      // cpx to rpx
      return needPxTransfer ? pxTransform(source) : source
    } else {
      return source 
    }
  }
}