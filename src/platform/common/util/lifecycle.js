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
      'destroyed',
      'activated',
      'deactivated',
      'errorCaptured',
      'serverPrefetch',
      'beforeRouteEnter',
      'beforeRouteLeave',
      'beforeRouteUpdate'
    ],
    usedHooks: [
      'beforeCreate',
      'created',
      'beforeMount',
      'mounted',
      'beforeDestroy',
      'destroyed'
    ],
    hooksMap: {
      // 'onShow': 'beforeRouteEnter',
      // 'onHide': 'beforeRouteLeave'
    },
    polyHooks: [
      'activated',
      'deactivated',
      'errorCaptured',
      'serverPrefetch',
      'beforeRouteEnter',
      'beforeRouteLeave',
      'beforeRouteUpdate'
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
    ],
    usedHooks: [
      'beforeCreate',
      'created',
      'beforeMount',
      'mounted',
      'beforeDestroy',
      'destroyed'
    ],
    hooksMap: {
    },
    polyHooks: [
      'viewappear',
      'viewdisappear'
    ]
  },
  wx: {
    app: {
      hooks: [
        'onLaunch',
        'onShow',
        'onHide',
        'onError',
        'onPageNotFound'
      ],
      hooksMap: {
        'beforeCreate': 'onLaunch',
        'created': 'onLaunch',
        'beforeMount': 'onLaunch',
        'mounted': 'onShow',
        'beforeDestroy': 'onHide',
        'destroyed': 'onHide'
      },
      usedHooks: [
        'onLaunch',
        'onShow',
        'onHide'
      ],
      polyHooks: [
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
        'onUnload',
        'onPullDownRefresh',
        'onReachBottom',
        'onShareAppMessage',
        'onPageScroll',
        'onResize',
        'onTabItemTap'
      ],
      hooksMap: {
        'beforeCreate': 'onLoad',
        'created': 'onLoad',
        'beforeMount': 'onLoad',
        'mounted': 'onReady',
        'beforeDestroy': 'onUnload',
        'destroyed': 'onUnload',
        'onShow': 'onShow',
        'onHide': 'onHide'
      },
      usedHooks: [
        'onLoad',
        'onReady',
        'onShow',
        'onHide',
        'onUnload'
      ],
      polyHooks: [
        'onPullDownRefresh',
        'onReachBottom',
        'onShareAppMessage',
        'onPageScroll',
        'onResize',
        'onTabItemTap'
      ]
    },
    component: {
      hooks: [
        'created',
        'attached',
        'ready',
        'detached',
        'moved'
      ],
      hooksMap: {
        'beforeCreate': 'created',
        'created': 'attached',
        'beforeMount': 'attached',
        'mounted': 'ready',
        'beforeDestroy': 'detached',
        'destroyed': 'detached'
      },
      usedHooks: [
        'created',
        'attached',
        'ready',
        'detached'
      ],
      polyHooks: [
        'moved'
      ]
    }
  },
  alipay: {
    app: {
      hooks: [
        'onLaunch',
        'onShow',
        'onHide',
        'onError',
        'onPageNotFound'
      ],
      hooksMap: {
        'beforeCreate': 'onLaunch',
        'created': 'onLaunch',
        'beforeMount': 'onLaunch',
        'mounted': 'onShow',
        'beforeDestroy': 'onHide',
        'destroyed': 'onHide'
      },
      usedHooks: [
        'onLaunch',
        'onShow',
        'onHide'
      ],
      polyHooks: [
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
        'onUnload',
        'onPullDownRefresh',
        'onReachBottom',
        'onShareAppMessage',
        'onTitleClick',
        'onPageScroll',
        'onTabItemTap',
        'onOptionMenuClick',
        'onPopMenuClick',
        'onPullIntercept'
      ],
      hooksMap: {
        'beforeCreate': 'onLoad',
        'created': 'onLoad',
        'beforeMount': 'onLoad',
        'mounted': 'onReady',
        'beforeDestroy': 'onUnload',
        'destroyed': 'onUnload',
        'onShow': 'onShow',
        'onHide': 'onHide'
      },
      usedHooks: [
        'onLoad',
        'onReady',
        'onShow',
        'onHide',
        'onUnload'
      ],
      polyHooks: [
        'onPullDownRefresh',
        'onReachBottom',
        'onShareAppMessage',
        'onTitleClick',
        'onPageScroll',
        'onTabItemTap',
        'onOptionMenuClick',
        'onPopMenuClick',
        'onPullIntercept'
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
      usedHooks: [
        'didMount',
        'didUnmount'
      ],
      polyHooks: []
    }
  },
  baidu: {
    app: {
      hooks: [
        'onLaunch',
        'onShow',
        'onHide',
        'onError',
        'onPageNotFound'
      ],
      hooksMap: {
        'beforeCreate': 'onLaunch',
        'created': 'onLaunch',
        'beforeMount': 'onLaunch',
        'mounted': 'onShow',
        'beforeDestroy': 'onHide',
        'destroyed': 'onHide'
      },
      usedHooks: [
        'onLaunch',
        'onShow',
        'onHide'
      ],
      polyHooks: [
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
        'onUnload',
        'onForceReLaunch',
        'onPullDownRefresh',
        'onReachBottom',
        'onShareAppMessage',
        'onPageScroll',
        'onTabItemTap'
      ],
      hooksMap: {
        'beforeCreate': 'onLoad',
        'created': 'onLoad',
        'beforeMount': 'onLoad',
        'mounted': 'onReady',
        'beforeDestroy': 'onUnload',
        'destroyed': 'onUnload',
        'onShow': 'onShow',
        'onHide': 'onHide'
      },
      usedHooks: [
        'onLoad',
        'onReady',
        'onShow',
        'onHide',
        'onUnload'
      ],
      polyHooks: [
        'onForceReLaunch',
        'onPullDownRefresh',
        'onReachBottom',
        'onShareAppMessage',
        'onPageScroll',
        'onTabItemTap'
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
      usedHooks: [
        'created',
        'attached',
        'ready',
        'detached'
      ],
      polyHooks: []
    }
  },
  qq: {
    app: {
      hooks: [
        'onLaunch',
        'onShow',
        'onHide',
        'onError',
        'onPageNotFound'
      ],
      hooksMap: {
        'beforeCreate': 'onLaunch',
        'created': 'onLaunch',
        'beforeMount': 'onLaunch',
        'mounted': 'onShow',
        'beforeDestroy': 'onHide',
        'destroyed': 'onHide'
      },
      usedHooks: [
        'onLaunch',
        'onShow',
        'onHide'
      ],
      polyHooks: [
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
        'onUnload',
        'onPullDownRefresh',
        'onReachBottom',
        'onShareAppMessage',
        'onPageScroll',
        'onResize',
        'onTabItemTap'
      ],
      hooksMap: {
        'beforeCreate': 'onLoad',
        'created': 'onLoad',
        'beforeMount': 'onLoad',
        'mounted': 'onReady',
        'beforeDestroy': 'onUnload',
        'destroyed': 'onUnload',
        'onShow': 'onShow',
        'onHide': 'onHide'
      },
      usedHooks: [
        'onLoad',
        'onReady',
        'onShow',
        'onHide',
        'onUnload'
      ],
      polyHooks: [
        'onPullDownRefresh',
        'onReachBottom',
        'onShareAppMessage',
        'onPageScroll',
        'onResize',
        'onTabItemTap'
      ]
    },
    component: {
      hooks: [
        'created',
        'attached',
        'ready',
        'detached',
        'moved'
      ],
      hooksMap: {
        'beforeCreate': 'created',
        'created': 'attached',
        'beforeMount': 'attached',
        'mounted': 'ready',
        'beforeDestroy': 'detached',
        'destroyed': 'detached'
      },
      usedHooks: [
        'created',
        'attached',
        'ready',
        'detached'
      ],
      polyHooks: [
        'moved'
      ]
    }
  },
  tt: {
    app: {
      hooks: [
        'onLaunch',
        'onShow',
        'onHide',
        'onError',
        'onPageNotFound'
      ],
      hooksMap: {
        'beforeCreate': 'onLaunch',
        'created': 'onLaunch',
        'beforeMount': 'onLaunch',
        'mounted': 'onShow',
        'beforeDestroy': 'onHide',
        'destroyed': 'onHide'
      },
      usedHooks: [
        'onLaunch',
        'onShow',
        'onHide'
      ],
      polyHooks: [
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
        'onUnload',
        'onPullDownRefresh',
        'onReachBottom',
        'onShareAppMessage',
        'onPageScroll',
        'onResize',
        'onTabItemTap'
      ],
      hooksMap: {
        'beforeCreate': 'onLoad',
        'created': 'onLoad',
        'beforeMount': 'onLoad',
        'mounted': 'onReady',
        'beforeDestroy': 'onUnload',
        'destroyed': 'onUnload',
        'onShow': 'onShow',
        'onHide': 'onHide'
      },
      usedHooks: [
        'onLoad',
        'onReady',
        'onShow',
        'onHide',
        'onUnload'
      ],
      polyHooks: [
        'onPullDownRefresh',
        'onReachBottom',
        'onShareAppMessage',
        'onPageScroll',
        'onResize',
        'onTabItemTap'
      ]
    },
    component: {
      hooks: [
        'created',
        'attached',
        'ready',
        'detached',
        'moved'
      ],
      hooksMap: {
        'beforeCreate': 'created',
        'created': 'attached',
        'beforeMount': 'attached',
        'mounted': 'ready',
        'beforeDestroy': 'detached',
        'destroyed': 'detached'
      },
      usedHooks: [
        'created',
        'attached',
        'ready',
        'detached'
      ],
      polyHooks: [
        'moved'
      ]
    }
  },  
  cml: {
    hooks: [
      'beforeCreate',
      'created',
      'beforeMount',
      'mounted',
      'beforeUpdate',
      'updated',
      'beforeDestroy',
      'destroyed',
      'onShow',
      'onHide'
    ]
  }
}

export default new Config(LIFECYCLE)