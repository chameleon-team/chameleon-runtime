import {
  observable,
  reaction,
  isObservableArray
} from 'mobx'

import toJS from '../util/toJS'

import {
  extend,
  getByPath,
  enumerable,
  proxy,
  deleteProperties,
  enumerableKeys
} from '../util/util'

import { type, isPlainObject } from '../util/type'

import KEY from '../util/KEY'

import diff from '../util/diff'

import { invariant } from '../util/warn'

import { warn } from '../util/debug'

import EventBus from '../util/EventBus'

import { defineGetterSetter } from '../util/proto'

const KEY_COMPUTED = KEY.get('computed')

export default class MiniRuntimeCore {
  constructor(config) {
    this.platform = config.platform || ''
    this.options = config.options

    this.polyHooks = config.polyHooks

    this.propsName = KEY.get(`${this.platform}.props`)
  }

  setOptions (options) {
    this.options = options
  
  }
  setContext (context) {
    this.context = context
    return this
  }
  init () {
    if (process.env.media !== "build") {
        invariant(!!this.context, "【chameleon-runtime】runtime context should not undefined")
    }

    const context = this.context

    this.extendContext()
    // 属性
    this.initData()
  
    // 方法
    this.initInterface()
  
    // 数据劫持
    this.proxyHandler()
  
    // watch 属性mobx转换
    const mergeWatches = extend(context.__cml_originOptions__.watch, context.watch || {})
    initWatch(context, mergeWatches)
    return this
  }

  extendContext() {
    this.context['$cmlEventBus'] = EventBus
  }
  
  initData () {
    const context = this.context
    context.__cml_originOptions__ = this.options
    // 清理函数列表
    context.__cml_disposerList__ = []
    // update后，回调函数收集器
    context.__cml_cbCollection__ = []

    context['$cmlPolyHooks'] = this.polyHooks
    
    if (this.platform === 'alipay') {
      context.__cml_data__ = extend({}, context.data, context.props)
    } else {
      context.__cml_data__ = extend({}, context.data)
    }

    transformComputed(context.__cml_data__, context)
  }
  
  initInterface () {
    const context = this.context
    // 构造 watch 能力
    context.$watch = watchFnFactory(context)
  
    // 构造 updated callback 收集能力
    context.$collect = updatedCbFactory(context)
  
    // 构造数据更新能力
    context.$setData = setDataFactory(context, this)
  
    // 构造强制更新能力
    context.$forceUpdate = forceUpdateFactory(context)
  }
  
  proxyHandler () {
    const context = this.context
    context.__cml_ob_data__ = observable(context.__cml_data__)
  
    const origComputed = context.__cml_originOptions__[KEY_COMPUTED]
    const origComputedKeys = origComputed ? enumerableKeys(origComputed) : []
    /* 计算属性在mobx里面是不可枚举的，所以篡改下*/
    enumerable(context.__cml_ob_data__, origComputedKeys)
  
    proxy(context, context.__cml_ob_data__)
  }
  
  /**
   * 启动器
   * @param  {[type]} context [description]
   * @return {[type]}       [description]
   */
  start (name) {
    if (!this.context) return
    const context = this.context
    const self = this

    /**
     * [computed description]
     * @return {[type]} [description]
     */
    function dataExprFn() {
      let properties = context.__cml_originOptions__[self.propsName]
      let propKeys = enumerableKeys(properties)
      // setData 的数据不包括 props
      const obData = deleteProperties(context.__cml_ob_data__, propKeys)
      
      return toJS(obData)
    }

    let _cached = false
    let cacheData
    function sideEffect(curVal, r = {}) {
      if (type(r.schedule) !== 'Function') {
        return
      }
      // 缓存reaction
      context.__cml_reaction__ = r


      let diffV
      if (_cached) {
        diffV = diff(curVal, cacheData)

        // emit 'beforeUpdate' hook ，第一次不触发
        emit('beforeUpdate', context, curVal, cacheData, diffV)
      } else {
        _cached = true
        diffV = curVal
      }

      if (type(context.setData) === 'Function') {
        context.setData(diffV, walkUpdatedCb(context))
      }

      cacheData = { ...curVal }
    }

    const options = {
      fireImmediately: true,
      name,
      onError: function() {
        warn('RuntimeCore start reaction error!')
      }
    }
    
    const disposer = reaction(dataExprFn, sideEffect, options)
  
    context.__cml_disposerList__.push(disposer)
  }
  
  /**
   * 销毁器
   * @param  {[type]} context [description]
   * @return {[type]}       [description]
   */
  destory () {
    if (!this.context) return
    const context = this.context
    disposerFactory(context.__cml_disposerList__)()
  }
}

/**
 * watch 工厂函数
 * @param  {[type]} context [description]
 * @return {function}       vm.$watch
 */
function watchFnFactory (context) {
  return function (expr, handler, options = {}) {
    const exprType = typeof expr
    let curVal
    let oldVal
    if (!/^function|string$/.test(exprType)) {
      console.warn(new Error('watch expression must be a string or function'))
      return
    }
    if (typeof handler !== 'function') {
      console.warn(new Error('watch callback must be a function'))
      return
    }

    /**
     * [computed description]
     * @return {[type]} [description]
     */
    function dataExprFn() {
      oldVal = curVal
      curVal = exprType === 'string' ? getByPath(context, expr) : expr.call(context)
      if (options.deep) {
        curVal = toJS(curVal)
      } else if (isObservableArray(curVal)) {
        // 转成纯数组
        curVal = curVal.slice()
      }
      return curVal
    }

    function sideEffect(curVal, reaction) {
      handler.call(context, curVal, oldVal)
    }

    // 返回清理函数
    const disposer = reaction(dataExprFn, sideEffect, {
      fireImmediately: !!options.immediate,
      delay: options.sync ? 0 : 1
    })

    context.__cml_disposerList__.push(disposer)
    return disposerFactory(context.__cml_disposerList__, disposer)
  }
}
/**
 * 清理函数构造工厂
 * @param  {array} disposerList 清理函数列表
 * @param  {function} disposer     清理函数
 * @return {function}              清理函数包装方法
 */
function disposerFactory(disposerList, disposer) {
  return function () {
    if (disposer) {
      const index = disposerList.indexOf(disposer)
      index > -1 && disposerList.splice(index, 1)
      disposer()
    } else {
      let disposer
      while (disposer = disposerList.shift()) {
        disposer()
      }
    }
  }
}

/**
 * 更新后回调 工厂函数
 * @param  {[type]} context [description]
 * @return {[type]}       [description]
 */
function updatedCbFactory(context) {
  return function (cb) {
    context.__cml_cbCollection__.push(cb)
  }
}

/**
 * 设置数据工厂函数
 * @param {[type]} context [description]
 */
function setDataFactory(context, self) {
  let _cached = false
  let cacheData

  return function (reaction = {}) {
    if (type(reaction.schedule) !== 'Function') {
      return
    }
    // 缓存reaction
    context.__cml_reaction__ = reaction

    let properties = context.__cml_originOptions__[self.propsName]
    let propKeys = enumerableKeys(properties)
    
    const obData = deleteProperties(context.__cml_ob_data__, propKeys)

    // setData 的数据不包括 props
    const data = toJS(obData)

    let diffV
    if (_cached) {
      diffV = diff(data, cacheData)

      // emit 'beforeUpdate' hook ，第一次不触发
      emit('beforeUpdate', context, data, cacheData, diffV)
    } else {
      _cached = true
      diffV = data
    }

    update(diffV)
    cacheData = { ...data }
  }

  function update(diff) {
    if (type(context.setData) === 'Function') {
      context.setData(diff, walkUpdatedCb(context))
    }
  }
}

function emit(name, context, ...data) {
  const cmlVM = context.__cml_originOptions__

  if (typeof cmlVM[name] === 'function') {
    cmlVM[name].apply(context, data)
  }
}

/**
 * 执行更新后回调列表
 * @param  {[type]} context [description]
 * @return {[type]}       [description]
 */
function walkUpdatedCb(context) {
  // emit 'updated' hook
  emit('updated', context)

  let cb
  const pendingList = context.__cml_cbCollection__.slice(0)
  context.__cml_cbCollection__.length = 0
  while (cb = pendingList.shift()) {
    typeof cb === 'function' && cb.apply(context)
  }
}

/**
 * forceUpdate 工厂函数
 * @param  {[type]} context [description]
 * @return {[type]}       [description]
 */
function forceUpdateFactory(context) {
  return function (data, cb) {

    const dataType = type(data)
    if (dataType === 'Function') {
      cb = data
      data = null
    } else if (dataType === 'Object') {
      extend(context.__cml_ob_data__, data)
    }

    type(cb) === 'Function' && context.$collect(cb)

    context.__cml_reaction__.dependenciesState = 2
    context.__cml_reaction__.schedule()
  }
}

/**
 * computed 属性mobx转换
 * @param  {Object} __cml_data__ 当前实例响应式数据
 * @param  {Object} context      上下文
 * @return {Object}              转换后computed
 */
function transformComputed(__cml_data__, context) {
  const options = context.__cml_originOptions__
  
  const origComputed = extend(options[KEY_COMPUTED], context[KEY_COMPUTED] || {})
  const origComputedKeys = origComputed ? enumerableKeys(origComputed) : []

  origComputedKeys.forEach(key => {

    if (key in __cml_data__) {
      console.error('【chameleon-runtime ERROR】', `the computed key 【${key}】 is duplicated, please check`)
    }

    const getter = origComputed[key].get || origComputed[key]
    const setter = origComputed[key].set

    defineGetterSetter(__cml_data__, key, getter, setter, context)
  })
}

/**
 * watch 属性转换
 * @param  {Object} context 上下文
 * @return {[type]}       [description]
 */
function initWatch (vm, watch) {
  if (type(watch) !== 'Object') {
    return
  }

  for (const key in watch) {
    const handler = watch[key]
    if (Array.isArray(handler)) {
      // mobx的reaction执行是倒序的，顾为保证watch正常次序，需倒序注册
      // 这里只解决了watch = {'a':[cb1,cb2]} 的倒序问题，对于$watch方式调用还是倒序
      // 需要改成mobx.observe的方案
      for (let i = handler.length - 1; i >= 0 ; i--) {
        createWatcher(vm, key, handler[i])
      }
    } else {
      createWatcher(vm, key, handler)
    }
  }
}

function createWatcher (vm, expOrFn, handler, options) {
  if (isPlainObject(handler)) {
    options = handler
    handler = handler.handler
  }
  if (typeof handler === 'string') {
    handler = vm[handler]
  }
  return vm.$watch(expOrFn, handler, options)
}
