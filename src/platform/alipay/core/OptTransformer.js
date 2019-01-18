import MiniOptTransformer from '../../common/proto/MiniOptTransformer'

class OptTransformer extends MiniOptTransformer {
  constructor(config) {
    super(config)

    this.platform = 'alipay'
    this.init()
  }
}
  
export default OptTransformer