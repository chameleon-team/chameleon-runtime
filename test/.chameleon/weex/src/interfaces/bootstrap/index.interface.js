
  
  import {validOptions} from './utils.js';

  let router,routerConfig,app,store;
  /* istanbul ignore next */
  class Method {
    bootstrap(options) {
      /*global Vue*/
      validOptions(options);

      options.createVM = options.createVM === false ? false : true;
      app = options.app;
      router = options.router;
      routerConfig = options.routerConfig;
      store = options.store;

      let vueOptions = {el: '#root', router, store}

      if(options.createVM) {
        let bridge = require('@didi/weex-bridge').default;
        let cmlApi = require('@didi/chameleon-api').default;
        let query = bridge.getQueryObjSync();
        let {path} = query;
        new Vue(Vue.util.extend(vueOptions, app));
        cmlApi.navigateTo({
          path
        });
      }
    }
    getInfo() {
      
      return {
        router,
        routerConfig
      }
    }
  }
  export default new Method();
