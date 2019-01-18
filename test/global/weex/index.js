global.weex = {
  config: {
    env: {
      scale: 2,
      deviceWidth: 375
    },
    query: {
      sfc_type: 1
    }
  },
  visible: {
    page: {
      closed: false,
      opened: false
    }
  },
  requireModule: function (moduleName) {
    var modMap = {
      dom: {
        getComponentRect: function (ref, cb) {
          cb({
            size: {
              width: 100,
              height: 100,
              left: 100,
              top: 100,
              right: 100,
              bottom: 100
            }
          })
        }
      }
    }
    return modMap[moduleName];
  },
  _storage: {}
}

global._timeoutCleared = false;
global.clearTimeout = function () {
  global.weex._timeoutCleared = true;
}
