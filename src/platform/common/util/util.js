import { type, isObject } from './type'
import { deepClone } from './clone'

/**
 * Check whether an object has the property.
 */
const hasOwnProperty = Object.prototype.hasOwnProperty
export function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

export function noop () {}

  // transfer 对象的`${name}`属性值 to function
export function propToFn (obj, name) {
  if (obj && isObject(obj[name])) {
    var _temp = obj[name]

    obj[name] = function() {
      return deepClone(_temp)
    }
  }
}

export function fnToProp (fn, ctx) {
  if (typeof fn === 'function') {
    fn = fn.call(ctx, ctx)
  }
  return fn
}

/**
 * 生命周期映射
 * @param  {Object} options options
 * @param  {Object} hooksMap 映射表
 * @return {Object}     修改后值
 */
export function transferLifecycle (options, hooksMap) {
  if (!hooksMap) {
    return
  }

  let _hooksTemp = []
  let _mapTemp = {}
  // 将生命周期 键名 处理成 [`$_${key}`]
  Object.keys(hooksMap).forEach(key => {
    const uniKey = `$_${key}`
    _hooksTemp.push(uniKey)
    _mapTemp[uniKey] = hooksMap[key]
    
    if (hasOwn(options, key)) {
      options[uniKey] = options[key]
      delete options[key]
    }
  })

  _hooksTemp.forEach(function(uniKey) {
    const mapKey = _mapTemp[uniKey]
    let hook = options[uniKey]
    !Array.isArray(hook) && (hook = [hook])

    if (hasOwn(options, uniKey) && mapKey && hook) {
      if (hasOwn(options, mapKey)) {
        !Array.isArray(options[mapKey]) && (options[mapKey] = [options[mapKey]])
        
        options[mapKey] = options[mapKey].concat(hook)
      } else {
        options[mapKey] = hook
      }
      delete options[uniKey]
    }
  })
}

/**
 * 对象键名重定义
 * @param  {Object} obj     对象
 * @param  {String} oldKey    原键名
 * @param  {String} newKey 新键名
 * @return {Object}         新对象
 */
export function rename(obj, oldKey, newKey) {
  Object.getOwnPropertyNames(obj).forEach(function(key) {
    if (key === oldKey) {
      obj[newKey] = obj[key]
      delete obj[key]
      return obj
    }
  })
  return obj
}

export function normalizeMap(arr) {
  if (type(arr) === 'Array') {
    const map = {}
    arr.forEach(value => {
      map[value] = value
    })
    return map
  }
  return arr
}

export function merge(to, from) {
  if (!from) return to
  let key, toVal, fromVal
  let keys = Object.keys(from)
  for (let i = 0; i < keys.length; i++) {
    key = keys[i]
    toVal = to[key]
    fromVal = from[key]
    if (type(toVal) === 'Object' && type(fromVal) === 'Object') {
      merge(toVal, fromVal)
    } else {
      to[key] = fromVal
    }
  }
  return to
}

export function extend(target = {}, ...froms) {
  for (const from of froms) {
    if (type(from) === 'Object') {
      // for in 能遍历原型链上的属性
      for (const key in from) {
        target[key] = from[key]
      }
    }
  }
  return target
}

export function extendWithIgnore (target, from, ignore = []) {
  if (type(from) === 'Object') {
    // for in 能遍历原型链上的属性
    for (const key in from) {
      if (!~ignore.indexOf(key)) {
        target[key] = from[key]
      }
    }
  }
  return target
}


export function isExistAttr(obj, attr) {
  const type = typeof obj
  const isNullOrUndefined = obj === null || obj === undefined
  if (isNullOrUndefined) {
    return false
  } else if (type === 'object' || type === 'function') {
    return attr in obj
  } else {
    return obj[attr] !== undefined
  }
}

export function parsePath (path) {
  return function (obj) {
    return getByPath(obj, path)
  }
}

export function getByPath(data, path, notExistOutput) {
  if (!path) return data
  const segments = path.split('.')
  let notExist = false
  let value = data
  for (let key of segments) {
    if (isExistAttr(value, key)) {
      value = value[key]
    } else {
      value = undefined
      notExist = true
      break
    }
  }
  if (notExistOutput) {
    return notExist ? notExistOutput : value
  } else {
    // 小程序setData时不允许undefined数据
    return value === undefined ? '' : value
  }
}

export function enumerable(target, keys) {
  keys.forEach(key => {
    const descriptor = Object.getOwnPropertyDescriptor(target, key)
    if (!descriptor.enumerable) {
      descriptor.enumerable = true
      Object.defineProperty(target, key, descriptor)
    }
  })
  return target
}

export function proxy(target, source, mapKeys, readonly) {
  if (typeof mapKeys === 'boolean') {
    readonly = mapKeys
    mapKeys = null
  }
  enumerableKeys(source).forEach((key, index) => {
    const descriptor = {
      get () {
        return source[key]
      },
      configurable: true,
      enumerable: true
    }
    !readonly && (descriptor.set = function(val) {
      source[key] = val
    })
    Object.defineProperty(target, mapKeys ? mapKeys[index] : key, descriptor)
  })
  return target
}

export function deleteProperties(source, props = []) {
  if (!props.length) return source
  const sourceKeys = Object.keys(source)
  const newData = {}
  for (let key of sourceKeys) {
    if (props.indexOf(key) < 0) {
      newData[key] = source[key]
    }
  }
  return newData
}

export function enumerableKeys(obj) {
  const keys = []
  for (let key in obj) {
    keys.push(key)
  }
  return keys
}


