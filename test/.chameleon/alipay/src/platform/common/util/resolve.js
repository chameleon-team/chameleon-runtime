import { merge, extend } from '../../common/util/util'
import { type } from '../../common/util/type'

export function mergeDefault(parent, child, key) {
  parent[key] = child[key]
}

export function mergeHooks(parent, child, key) {

  let hasKeyParent = parent.hasOwnProperty(key)
  let isArrayChild = type(child[key]) === 'Array'

  if (!hasKeyParent && !isArrayChild) {
    parent[key] = [child[key]]
  } else if (!hasKeyParent && isArrayChild) {
    parent[key] = child[key]
  } else if (hasKeyParent && !isArrayChild) {
    parent[key].push(child[key])
  } else if (hasKeyParent && isArrayChild) {
    parent[key] = parent[key].concat(child[key])
  }
}

export function mergeSimpleProps(parent, child, key) {
  let parentVal = parent[key]
  const childVal = child[key]
  if (!parentVal) {
    parent[key] = parentVal = {}
  }
  extend(parentVal, childVal)
}

export function mergeData(parent, child, key) {
  const childVal = child[key]
  if (!parent[key]) {
    parent[key] = {}
  }
  merge(parent[key], childVal)
}

export function mergeWatch(parent, child, key) {
  let parentVal = parent[key]
  const childVal = child[key]
  const ret = []
  if (!parentVal) {
    parent[key] = parentVal = {}
  }
  Object.keys(childVal).forEach(key => {
    if (key in parentVal) {
      parentVal[key] = type(parentVal[key]) !== 'Array'
        ? [parentVal[key], childVal[key]]
        : parentVal[key].concat([childVal[key]])
    } else {
      parentVal[key] = childVal[key]
    }
  })
}

