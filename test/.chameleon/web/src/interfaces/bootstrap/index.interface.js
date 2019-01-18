
  
  let router,routerConfig,app,store;

  import {validOptions} from './utils.js';

  /* istanbul ignore next */
  class Method {
    bootstrap(options = {}) {
      validOptions(options);

      options.createVM = options.createVM === false ? false : true;
      app = options.app;
      router = options.router;
      routerConfig = options.routerConfig;
      store = options.store;

      let vueOptions = {
        el: '#root',
        router,
        store,
        render: h => h(app)
      }
      
      if(options.createVM) {
        new Vue(vueOptions);
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
