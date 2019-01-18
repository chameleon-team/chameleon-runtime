global.wx = {
  wxPage: {
    title: '',
    closed: false
  },
  app: {
    opened: false
  }
};
global.wx.getSystemInfo = function (params) {
  params.success({
    system: 'ios',
    windowWidth: 375,
    windowHeight: 667,
    viewportWidth: 375,
    viewportHeight: 667
  });
}
global.wx.getSystemInfoSync = function (params) {
  return {
    windowWidth: 375
  }
}
global.wx.getUserInfo = function (params) {
  params.success({
    uid: 123456
  });
}
global.wx.getLocation = function (params) {
  params.success({
    latitude: 123456,
    longitude: 123456
  });
}
global.wx.getLaunchOptionsSync = function (params) {
  return {
    path: '',
    query: {
      name: 'cml'
    }
  }
}

global.wx.chooseImage = function (params) {
  params.success({
    tempFilePaths: ['filepath']
  });
}

global.wx._clipboardData = '';
global.wx.setClipboardData = function (params) {
  global.wx._clipboardData = params.data;
  params.success();
}
global.wx.getClipboardData = function (params) {
  params.success({
    data: global.wx._clipboardData
  });
}

global.wx._storage = {};
global.wx.setStorageSync = function (key, value) {
  global.wx._storage[key] = value;
}

global.wx.getStorageSync = function (key) {
  return global.wx._storage[key];
}

global.wx.setNavigationBarTitle = function (params) {
  global.wx.wxPage.title = params.title;
}

global.wx.navigateBack = function (params) {
  global.wx.wxPage.closed = true;
}

global.wx.navigateToMiniProgram = function (params) {
  global.wx.app.opened = true;
}

global.wx.request = function (params) {
  var fromData = queryParse(params.data);
  var fromDataLength = Object.keys(fromData).length;
  var res = {
    errno: "0"
  }
  if (fromDataLength) {
    res = fromData;
  }
  params.success({
    statusCode: 200,
    header: {},
    data: res
  })
}
global.wx.createSelectorQuery = function (params) {
  return {
    in: function () {
      return {
        exec: function (cb) {
          cb([{
            width: 100,
            height: 100,
            left: 100,
            top: 100,
            right: 100,
            bottom: 100
          }])
        },
        select: function () {
          return {
            boundingClientRect: function () {

            }
          }
        },
        selectAll: function() {
          return {
            boundingClientRect: function () {

            }
          }
        }
      }
    }
  }
}

function queryParse(search = '') {
  let arr = search.split(/(\?|&)/);
  let parmsObj = {};
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].indexOf('=') !== -1) {
      let keyValue = arr[i].match(/([^=]*)=(.*)/);
      parmsObj[keyValue[1]] = keyValue[2];
    }
  }
  return parmsObj;
}

global.__CML__GLOBAL = {
  App(options) {
    return {
      setData() {}
    }
  },
  Page(options) {
    return {
      setData() {}
    }
  },
  Component(options) {
    return {
      setData() {}
    }
  }
}