import {
  observable,
  computed,
  reaction,
  toJS,
  isObservableArray,
  Reaction
} from 'mobx'

import {
  extend,
  getByPath,
  enumerable,
  proxy,
  deleteProperties,
  enumerableKeys,
  flatten
} from '../util/util'

import { type } from '../util/type'

import { styleHandle } from '../util/style'

import lifecycle from '../util/lifecycle'

import KEY from '../util/KEY'

import diff from '../util/diff'

export default class RuntimeWidget {
  constructor(config) {
    this.platform = config.platform || ''
    this.options = config.options

    this.propsName = KEY.get(`${this.platform}.props`)
    this.instance = KEY.get(`${this.platform}.instance`)
  }

  setOptions (options) {
    this.options = options
  
  }
  setContext (context) {
    this.context = context
    return this
  }
  init () {
    // 属性
    this.initData()
  
    // 方法
    this.initInterface()
  
    // 数据劫持
    this.proxyHandler()
  
    // watch 属性mobx转换
    this.watchesHandler()
    return this
  }
  
  initData () {
    if (!this.context) return
    const context = this.context
    context.__cml_originOptions__ = this.options
    // 清理函数列表
    context.__cml_disposerList__ = []
    // update后，回调函数收集器
    context.__cml_cbCollection__ = []
  
    //  effect computed
    context.__cml_computed__ = transformComputed(context)
    
    if (this.platform === 'alipay') {
      context.__cml_data__ = extend({}, context.data, context.props, context.__cml_computed__)
    } else {
      context.__cml_data__ = extend({}, context.data, context.__cml_computed__)
    }
  }
  
  /**
   *     **给小程序增加refs功能**
   * 
   * 在cml编译阶段给所有带有ref属性的元素添加 class="_cml_ref_lmc_" 
   * 通过在Page的onLoad阶段以及comoponent的attached阶段初始化当前实例的$refs (执行时机选定标准: 可以通过createSelectorQuery选取元素之后)
   * $refs只提供id, 不提供其他属性, $refs本身初始化是在onLoad阶段, 此时获得的节点数据(例如top), 并不会随页面滚动进行变化. 所以意义不大
   * 通过this.$refs.ref获取元素class后在interface内部通过wxApi实时获取各元素信息
   */
  initRefs () {
    if (!this.context) return
    const context = this.context
    const query = this.platform === 'alipay' 
        ? this.instance.createSelectorQuery()
        : this.instance.createSelectorQuery().in(context)
        
    query.selectAll('._cml_ref_lmc_').boundingClientRect()
    query.exec((res) => {
      context.$refs = {}
      let doms = res[0]
      if (!doms) {
        return
      }
      for (let i=0; i<doms.length; i++) {
        let refItem = doms[i]
        context.$refs[refItem.id] = {
          id: refItem.id
        }
      }
    })
    return this
  }
  
  initInterface () {
    if (!this.context) return
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
    if (!this.context) return
    const context = this.context
    context.__cml_ob_data__ = observable(context.__cml_data__)
  
    const origComputed = context.__cml_originOptions__.computed
    const origComputedKeys = origComputed ? enumerableKeys(origComputed) : []
    /* 计算属性在mobx里面是不可枚举的，所以篡改下*/
    enumerable(context.__cml_ob_data__, origComputedKeys)
  
    proxy(context, context.__cml_ob_data__)
  }
  
  /**
   * watch 属性转换
   * @param  {Object} context 上下文
   * @return {[type]}       [description]
   */
  watchesHandler () {
    if (!this.context) return
    const context = this.context
    let options = context.__cml_originOptions__
  
    let watches = options.watch
  
    if (type(watches) !== 'Object') {
      return
    }
  
    enumerableKeys(watches).forEach(key => {
      const handler = watches[key]
      if (type(handler) === 'Array') {
        // mobx的reaction执行是倒序的，顾为保证watch正常次序，需倒序注册
        for (let i = handler.length - 1; i >= 0 ; i--) {
          context.$watch(key, handler[i])
        }
      } else {
        context.$watch(key, handler)
      }
    })
  }
  
  addPageHooks () {
    const context = this.context
    const originOptions = context.__cml_originOptions__
    // 使用createComponent创建page时，页面的事件直接写在options里是不生效的，必须注入到this上
    lifecycle.get(`${this.platform}.page.hooks`).forEach(key => {
      if (typeof originOptions[key] === 'function') {
        context[key] = originOptions[key]
      }
    })
  }
  /**
   * 启动器
   * @param  {[type]} context [description]
   * @return {[type]}       [description]
   */
  start (name) {
    if (!this.context) return
    const context = this.context
    // 渲染更新监听
    const disposer = autorunThrottle(context.$setData, name)
  
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
  return function (expr, handler) {
    const callback = handler.handler || handler
    const exprType = typeof expr
    let curVal
    let oldVal
    if (!/^function|string$/.test(exprType)) {
      console.warn(new Error('watch expression must be a string or function'))
      return
    }
    if (typeof callback !== 'function') {
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
      if (handler.deep) {
        curVal = toJS(curVal, false)
      } else if (isObservableArray(curVal)) {
        // 强制访问，让数组被观察
        curVal.peek()
      }
      return curVal
    }

    function sideEffect(curVal, reaction) {
      callback.call(context, curVal, oldVal)
    }

    const options = {
      fireImmediately: !!handler.immediate,
      delay: handler.sync ? 0 : 1
    }

    // 返回清理函数
    const disposer = reaction(dataExprFn, sideEffect, options)

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
  let _firstAction = true
  let _cache
  
  return function (reaction = {}) {
    if (type(reaction.schedule) !== 'Function') {
      return
    }

    // 缓存reaction
    context.__cml_reaction__ = reaction

    let properties = context.__cml_originOptions__[self.propsName]
    let propKeys = enumerableKeys(properties)
    
    let data = deleteProperties(context.__cml_ob_data__, propKeys)

    data = toJS(data)

    if (_firstAction) {
      _firstAction = false

      _cache = data
      _render(data)
    } else {

      let dataDiff = diff(data, _cache)

      _cache = data
      _render(dataDiff)
    }
  }

  function _render(data) {
    // style 处理
    styleHandle(data)

    context.setData(data, walkUpdatedCb(context))
  }
}

/**
 * 执行更新后回调列表
 * @param  {[type]} context [description]
 * @return {[type]}       [description]
 */
function walkUpdatedCb(context) {
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
 * @param  {Object} computedExpr 组件实例computed集合
 * @param  {Object} context      上下文
 * @return {Object}              转换后computed
 */
function transformComputed(context) {
  const options = context.__cml_originOptions__

  const origComputed = options.computed
  const origComputedKeys = origComputed ? enumerableKeys(origComputed) : []

  const newComputed = {}
  origComputedKeys.forEach(key => {
    newComputed[key] = computed(origComputed[key], {context: context})
  })

  return newComputed
}

/**
 * [autorunThrottle description]
 * @param  {[type]} fnc  [description]
 * @param  {[type]} name [description]
 * @return {function}      unwatch函数
 */
function autorunThrottle(fnc, name) {
  // 首次同步执行，之后异步处理
  let isScheduled = false
  let first = true
  const r = new Reaction(name, function () {

    if (!isScheduled) {
      isScheduled = true
      if (first) {
        reactionRunner()
        first = false
      } else {
        setTimeout(reactionRunner, 0)
      }
    }
  })
  function reactionRunner() {
    isScheduled = false
    if (!r.isDisposed) {
      r.track(() => {

        fnc(r)
      })
    }
  }
  r.schedule()
  return r.getDisposer()
}
