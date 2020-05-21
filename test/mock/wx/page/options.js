import Config from '../../lib/config'

class Button {
  constructor (props) {
    this.data = {
      checkedImg: 'http://172.22.13',
      other2: {
        a: 'a'
      }
    }
    this.mixins = [
      {
        created () {
          // 会merge原有生命周期
          console.log('------- mixins call created1')
          return 'mixin created 1'
        },
        beforeCreate () {
          // 单测 mixins 执行顺序
          console.log('------- mixins call beforeCreate1')
          return 'mixin beforeCreate1'
        },
        data: {
          // 不会覆写data.checkedImg
          checkedImg: 'mixin image',
          other: 'other'
        },
        methods: {
          mixinMethods () {

          }
        }
      },
      {
        beforeCreate () {
          // 会merge原有生命周期
          console.log('------- mixins call beforeCreate2')
          return 'mixin beforeCreate2'
        },
        created () {
          console.log('------- mixins call created2')
          return 'mixin created 2'
        },
        mounted () {
          console.log('------- mixins call mounted')
          return 'mixin mounted'
        },
        data: {
          other2: {
            a: 'c', // 不会修改 data.other2.a
            b: 'b' // 会 merge 进 data.other2.b
          }
        }
      }
    ]
    this.computed = {
      computedChecked: function () {}
    }
    this.watch = {
      checked: function () {}
    }
    this.methods = {
      changeCheck: function () {},
      onShareAppMessage (args) {
        // 多态单测
        return 'call onShareAppMessage'
      }
    }
    this.components = {}
  }

  onLoad () {
    // 原有生命周期顺序单测
    console.log('-------- run onLoad first')
    return 'button onLoad'
  }

  onShow () {
    return 'button onShow'
  }

  onHide () {
    return 'button onHide'
  }

  beforeCreate (res) {
    console.log('------- run beforeCreate second')
    return 'button beforeCreate&onLoad'
  }

  created () {
    return 'button beforeCreate&onLoad'
  }

  beforeMount () {
    return 'button beforeCreate&onLoad'
  }

  mounted () {
    return 'button onReady'
  }

  beforeDestroy () {
    return 'button onUnload'
  }

  destroyed () {
    return 'button onUnload'
  }
}

export const case1 = new Config({
  in: new Button(),
  out: {
    data: {
      checkedImg: 'http://172.22.13',
      other: 'other',
      other2: {
        a: 'a',
        b: 'b'
      }
    },
    _cmlComputed: {
      computedChecked: function () {}
    },
    watch: {
      checked: function () {}
    },
    changeCheck: function () {},
    mixinMethods: function () {},
    onLoad: function () {
      return 'button beforeCreate&onLoad'
    },
    onShow: function () {
      return 'button onShow'
    },
    onReady: function () {
      return 'button onReady'
    },
    onHide: function () {
      return 'button onHide'
    },
    onUnload: function () {
      return 'button onUnload'
    },
    onShareAppMessage: function () {
      return 'call onShareAppMessage'
    },
    components: {},
    _cmlInline: function () {},
    _cmlModelEventProxy: function () {},
    _cmlEventProxy: function () {},
    $cmlEmit: function () {}
  }
})
