import WexOptTransformer from '../../common/proto/WexOptTransformer'

class OptTransformer extends WexOptTransformer {
  constructor(config) {
    super(config)

    this.init()
  }

  beforeCreateArgsMixin(...args) {
    args = args || []

    let obj = this.$route && this.$route.query
  
    args[0] = Object.assign({}, args[0], obj)
  
    return args
  }

}

export default OptTransformer
