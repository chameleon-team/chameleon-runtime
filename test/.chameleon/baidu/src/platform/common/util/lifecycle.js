import Config from './config'

const LIFECYCLE = {
  web: {
    hooks: [
      'beforeCreate',
      'created',
      'beforeMount',
      'mounted',
      'beforeUpdate',
      'updated',
      'beforeDestroy',
      'destroyed'
    ]
  },
  weex: {
    hooks: [
      'beforeCreate',
      'created',
      'beforeMount',
      'mounted',
      'beforeUpdate',
      'updated',
      'beforeDestroy',
      'destroyed'
    ]
  },
  wx: {
    app: {
      hooks: [
        'onLaunch',
        'onShow',
        'onHide'
      ],
      hooksMap: {
        'beforeCreate': 'onLaunch',
        'created': 'onLaunch',
        'beforeMount': 'onLaunch',
        'mounted': 'onShow',
        'beforeDestroy': 'onHide',
        'destroyed': 'onHide'
      },
      whitelist: [
        'onError',
        'onPageNotFound'
      ]
    },
    page: {
      hooks: [
        'onLoad',
        'onShow',
        'onReady',
        'onHide',
        'onUnload'
      ],
      hooksMap: {
        'beforeCreate': 'onLoad',
        'created': 'onLoad',
        'beforeMount': 'onLoad',
        'mounted': 'onShow',
        'beforeDestroy': 'onUnload',
        'destroyed': 'onUnload'
      },
      whitelist: [
        'onPullDownRefresh',
        'onReachBottom',
        'onShareAppMessage',
        'onPageScroll',
        'onResize',
        'onTabItemTap',
        'onReady',
        'onHide'
      ]
    },
    component: {
      hooks: [
        'created',
        'attached',
        'ready',
        'detached'
      ],
      hooksMap: {
        'beforeCreate': 'created',
        'created': 'attached',
        'beforeMount': 'attached',
        'mounted': 'ready',
        'beforeDestroy': 'detached',
        'destroyed': 'detached'
      },
      whitelist: [
        'moved'
      ]
    }
  },
  alipay: {
    app: {
      hooks: [
        'onLaunch',
        'onShow',
        'onHide'
      ],
      hooksMap: {
        'beforeCreate': 'onLaunch',
        'created': 'onLaunch',
        'beforeMount': 'onLaunch',
        'mounted': 'onShow',
        'beforeDestroy': 'onHide',
        'destroyed': 'onHide'
      },
      whitelist: [
        'onError',
        'onPageNotFound'
      ]
    },
    page: {
      hooks: [
        'onLoad',
        'onReady',
        'onShow',
        'onHide',
        'onUnload'
      ],
      hooksMap: {
        'beforeCreate': 'onLoad',
        'created': 'onLoad',
        'beforeMount': 'onLoad',
        'mounted': 'onShow',
        'beforeDestroy': 'onUnload',
        'destroyed': 'onUnload'
      },
      whitelist: [
        'onPullDownRefresh',
        'onReachBottom',
        'onShareAppMessage',
        'onTitleClick',
        'onReady',
        'onHide'
      ]
    },
    component: {
      hooks: [
        'didMount',
        'didUnmount'      
      ],
      hooksMap: {
        'beforeCreate': 'didMount',
        'created': 'didMount',
        'beforeMount': 'didMount',
        'mounted': 'didMount',
        'beforeDestroy': 'didUnmount',
        'destroyed': 'didUnmount'
      },
      whitelist: []
    }
  },
  baidu: {
    app: {
      hooks: [
        'onLaunch',
        'onShow',
        'onHide'
      ],
      hooksMap: {
        'beforeCreate': 'onLaunch',
        'created': 'onLaunch',
        'beforeMount': 'onLaunch',
        'mounted': 'onShow',
        'beforeDestroy': 'onHide',
        'destroyed': 'onHide'
      },
      whitelist: [
        'onError',
        'onPageNotFound'
      ]
    },
    page: {
      hooks: [
        'onLoad',
        'onReady',
        'onShow',
        'onHide',
        'onUnload'
      ],
      hooksMap: {
        'beforeCreate': 'onLoad',
        'created': 'onLoad',
        'beforeMount': 'onLoad',
        'mounted': 'onShow',
        'beforeDestroy': 'onUnload',
        'destroyed': 'onUnload'
      },
      whitelist: [
        'onForceReLaunch',
        'onPullDownRefresh',
        'onReachBottom',
        'onShareAppMessage',
        'onPageScroll',
        'onTabItemTap',
        'onReady',
        'onHide'
      ]
    },
    component: {
      hooks: [
        'created',
        'attached',
        'ready',
        'detached'
      ],
      hooksMap: {
        'beforeCreate': 'created',
        'created': 'attached',
        'beforeMount': 'attached',
        'mounted': 'ready',
        'beforeDestroy': 'detached',
        'destroyed': 'detached'
      },
      whitelist: []
    }
  },
  cml: {
    hooks: [
      'beforeCreate',
      'created',
      'beforeMount',
      'mounted',
      'beforeDestroy',
      'destroyed'
    ]
  }
}

export default new Config(LIFECYCLE)