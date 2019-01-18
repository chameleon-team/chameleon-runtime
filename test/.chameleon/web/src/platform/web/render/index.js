import './lib/gesture'
import chameleon from './chameleon'
import extendVue from './lib/extendVue'

let _inited = false

chameleon.init = function init(Vue) {
  if (_inited) { return }
  _inited = true
  chameleon._inited = true

  extendVue(Vue)
}

if (global.Vue) {
  chameleon.init(global.Vue)
}

export default chameleon
