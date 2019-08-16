/**
 * 原型上的方法放到对象上
 * @param  {Object} obj   待添加属性对象
 * @param  {Object} proto 差异方法
 * @return {Object}       修改后值
 */
export function copyProtoProperty(obj = {}) {
  let EXPORT_OBJ = obj;
  let EXPORT_PROTO = EXPORT_OBJ.__proto__;
  
  if(EXPORT_PROTO.constructor !== Object) {
    Object.getOwnPropertyNames(EXPORT_PROTO).forEach(key=>{
      if (!/constructor|prototype|length/ig.test(key)) {
        //原型上有自身没有的属性 放到自身上
        if(!EXPORT_OBJ.hasOwnProperty(key)) {
          EXPORT_OBJ[key] = EXPORT_PROTO[key]
        }
      }
    })
  }

  return EXPORT_OBJ;
}

export function defineGetterSetter (target, key, getValue, setValue, context) {
  let get
  let set
  if (typeof getValue === 'function') {
    get = context ? getValue.bind(context) : getValue
  } else {
    get = function () {
      return getValue
    }
  }
  if (typeof setValue === 'function') {
    set = context ? setValue.bind(context) : setValue
  }
  let descriptor = {
    get,
    configurable: true,
    enumerable: true
  }
  if (set) descriptor.set = set
  Object.defineProperty(target, key, descriptor)
}