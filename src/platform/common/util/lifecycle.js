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
      'beforeRouteEnter',
      'beforeRouteLeave',
      'beforeRouteUpdate'
    ],
    hooksMap: {
      'viewappear': 'beforeRouteEnter',
      'viewdisappear': 'beforeRouteLeave'
    },
    polyHooks: [
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
      'destroyed',
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
        'mounted': 'onShow',
        'beforeDestroy': 'onUnload',
        'destroyed': 'onUnload',
        
      },
      usedHooks: [
        'onLoad',
        'onShow',
        
        'onUnload'
      ],
      polyHooks: [
        'onReady',
        'onHide',
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
        'mounted': 'onShow',
        'beforeDestroy': 'onUnload',
        'destroyed': 'onUnload',
        
      },
      usedHooks: [
        'onLoad',
        'onShow',
        
        'onUnload'
      ],
      polyHooks: [
        'onReady',
        'onHide',
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
        'mounted': 'onShow',
        'beforeDestroy': 'onUnload',
        'destroyed': 'onUnload',
        
      },
      usedHooks: [
        'onLoad',
        'onShow',
        
        'onUnload'
      ],
      polyHooks: [
        'onReady',
        'onHide',
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
      'viewappear',
      'viewdisappear'
    ]
  }
}

export default new Config(LIFECYCLE)