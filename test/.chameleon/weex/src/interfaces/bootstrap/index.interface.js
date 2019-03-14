
  
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
        let cmlApi = require('chameleon-api').default;
        let launchOpt = cmlApi.getLaunchOptionsSync();
        let {path} = launchOpt.query;
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
