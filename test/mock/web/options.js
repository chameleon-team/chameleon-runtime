import Config from '../lib/config'

class Button {
  constructor(props) {
    this.mixins = [
      {
        methods: {},
        props: {}
      }
    ]
    this.props = {
      text: {
        type: String,
        default: '确认'
      },
      textNoType: {
        default: '确认'
      },
      textNoDefault: {
        type: String
      },
    }
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
      changeCheck: function(){}
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
    mixins: [
      {
        methods: {},
        props: {}
      }
    ],
    props: {
      text: {
        type: String,
        default: '确认'
      },
      textNoType: {
        default: '确认'
      },
      textNoDefault: {
        type: String
      },
    },
    data: function() {
      return {
        checkedImg: 'http://172.22.13'
      }
    },
    computed: {
      computedChecked: function(){}
    },
    watch: {
      checked: function(){}
    },
    methods: {
      changeCheck: function(){},
      runtimeMethod: function(){}
    },
    beforeCreate: function() {},
    created: function() {},
    beforeMount: function() {},
    mounted: function() {},
    beforeDestroy: function() {},
    destroyed: function() {},
    components: {}
  }
})

export const case2 = new Config({
  in: {
    props: {}
  },
  out: {
    props: {}
  }
})