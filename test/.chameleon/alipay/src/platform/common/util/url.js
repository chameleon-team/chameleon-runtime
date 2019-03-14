/**
 * url相关操作
 *
 * @module lib/url
 */

export function isObject(obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * 把对象转换成key=val的url参数
 * @param obj
 * @param isEncode 是否进行encodeURIComponent 默认为true
 * @return {string}
 */
export let json2query = function(obj, isEncode){
  isEncode = isEncode !== false
  let url = ''
  if (isObject(obj)) {
    Object.keys(obj).forEach(key => {
      let value = obj[key] !== undefined ? obj[key] : ''
      url += '&' + key + '=' + (isEncode ? encodeURIComponent(value) : value)
    })
  }
  return url ? url.substring(1) : ''
}


/**
 * 解析url参数
 * @example ?id=12345&a=b 或者 #id=12345&a=b
 * @return Object {id:12345,a:b}
 */
export let query2json = function (url = '') {
  const reg = /[#?&][^#?&]+=[^#?&]+/g
  const arr = url.match(reg)
  let obj = {}
  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.substring(1).split('=')
      let key = decodeURIComponent(tempArr[0])
      let val = decodeURIComponent(tempArr[1])
      obj[key] = val
    })
  }
  return obj
}


export default {
    json2query: json2query,
    query2json: query2json,
};
