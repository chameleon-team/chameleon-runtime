import { base, event } from '../mixins'

import webMixins from 'chameleon-mixins/web-mixins.js'

export default function extendVue(Vue) {
  
  // 自定义原生标签处理 覆盖Vue方法
  const htmlRegex = /^html:/i
  Vue.config.isReservedTag = tag => htmlRegex.test(tag)
  Vue.config.parsePlatformTagName = tag => tag.replace(htmlRegex, '')

  function isCmlTag (tag) {
    return typeof chameleon._components[tag] !== 'undefined'
  }
  const oldGetTagNamespace = Vue.config.getTagNamespace
  Vue.config.getTagNamespace = function (tag) {
    if (isCmlTag(tag)) {
      return
    }
    return oldGetTagNamespace(tag)
  }

  Vue.mixin(base)
  Vue.mixin(event)
  
  Vue.mixin(webMixins.mixins)
}