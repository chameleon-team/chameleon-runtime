import utils from '../utils'

const chameleon = {
  config: {
    bundleUrl: location.href
  },
  
  utils,
  mixins: {},
  _components: {
    button: 1,
    checkbox: 1,
    input: 1,
    list: 1,
    page: 1,
    radio: 1,
    richtext: 1,
    scroller: 1,
    switch: 1,
    textarea: 1,
    video: 1
  },
  _meta: {
    mounted: {},
    updated: {},
    destroyed: {},
    requiredModules: {},
    apiCalled: {},
    perf: {}
  },

}

export default chameleon
