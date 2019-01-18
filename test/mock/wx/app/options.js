import Config from '../../lib/config'

class Button {
  constructor(props) {
    this.data = {
      checkedImg: 'http://172.22.13'
    }
    this.computed = {
      computedChecked: function(){}
    }
    this.watch = {
      checked: function(){}
    }
    this.methods = {
      changeCheck: function(){},
      onLaunch: function() {}
    }
    this.components = {}
  }

  beforeCreate(res) {return res;}
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
    computed: {
      computedChecked: function(){}
    },
    watch: {
      checked: function(){}
    },
    changeCheck: function(){},
    onLaunch: function() {},
    onShow: function() {},
    onHide: function() {},
    components: {},
    _cmlInlineStatementEventProxy: function(){},
    _cmlModelEventProxy: function(){},
    _cmlEventProxy: function(){},
    $cmlEmit: function(){}
  }
})