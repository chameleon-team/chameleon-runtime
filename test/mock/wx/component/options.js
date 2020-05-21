import Config from '../../lib/config'

class Button {
  constructor (props) {
    this.data = {
      checkedImg: 'http://172.22.13'
    }
    this.props = {
      text: {
        type: String,
        default: '确认'
      },
      textNoType: {
        default: '确认'
      },
      textNoDefault: {
        type: Number
      }
    }
    this.computed = {
      computedChecked: function () {}
    }
    this.watch = {
      checked: function () {}
    }
    this.methods = {
      changeCheck: function () {},
      attached: function () {}
    }
    this.components = {}
  }

  beforeCreate (res) { return res }
  created () {}
  beforeMount () {}
  mounted () {}
  beforeDestroy () {}
  destroyed () {}
}

export const case1 = new Config({
  in: new Button(),
  out: {
    data: {
      checkedImg: 'http://172.22.13'
    },
    _cmlComputed: {
      computedChecked: function () {}
    },
    watch: {
      checked: function () {}
    },

    created: function () {},
    attached: function () {},
    ready: function () {},
    detached: function () {},
    components: {},
    properties: {
      text: {
        type: String,
        value: '确认',
        observer: function () {}
      },
      textNoType: {
        value: '确认',
        observer: function () {}
      },
      textNoDefault: {
        type: Number,
        observer: function () {}
      }
    },
    methods: {
      _cmlInline: function () {},
      _cmlModelEventProxy: function () {},
      _cmlEventProxy: function () {},
      $cmlEmit: function () {},
      _animationCb: function () {},
      changeCheck: function () {}
    }
  }
})
