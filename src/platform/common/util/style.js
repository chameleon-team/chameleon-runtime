import { type } from '../../common/util/type'

export function styleHandle(d) {

  if (type(d) === 'Array') {
    d.forEach((item, i) => {
      d[i] = styleHandle(item)
    })
  } else if (type(d) === 'Object') {
    Object.keys(d).forEach(k => {
      const v = d[k]

      d[k] = styleHandle(v)
    })
  } else if (type(d) === 'String') {
    return pxTransform(d)
  }
  
  return d
}

function pxTransform(s) {
  if (!~s.indexOf('cpx')) {
    return s
  }
  
  return s.replace(/(([\s:(]|^)-?)(\d*\.?\d+)cpx/ig, (m) => {
    return m.replace('cpx', 'rpx')
  })
}