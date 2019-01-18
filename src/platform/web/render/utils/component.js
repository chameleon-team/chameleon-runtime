

export function insideA (el) {
  if (typeof el._insideA === 'boolean') {
    return el._insideA
  }
  let parent = el.parentElement
  const parents = []
  const checkParents = function (inside) {
    for (let i = 0, l = parents.length; i < l; i++) {
      parents[i]._insideA = inside
    }
  }
  const check = function (inside) {
    el._insideA = inside
    checkParents(inside)
    return inside
  }
  while (parent && parent !== document.body) {
    if (parent.tagName.toLowerCase() === 'a') {
      return check(true)
    }
    if (typeof parent._insideA === 'boolean') {
      return check(parent._insideA)
    }
    parents.push(parent)
    parent = parent.parentElement
  }
  return check(false)
}

