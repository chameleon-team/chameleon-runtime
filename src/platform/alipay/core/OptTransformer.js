import MiniOptTransformer from '../../common/proto/MiniOptTransformer'
import alipayMixins from 'chameleon-mixins/alipay-mixins.js'

class OptTransformer extends MiniOptTransformer {
  constructor(config) {
    super(config)

    this.platform = 'alipay'
    this.baseMixins = alipayMixins.mixins
    this.init()
  }
}
  
export default OptTransformer