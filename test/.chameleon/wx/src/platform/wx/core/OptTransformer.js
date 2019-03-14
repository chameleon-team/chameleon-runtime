import MiniOptTransformer from '../../common/proto/MiniOptTransformer'
import wxMixins from 'chameleon-mixins/wx-mixins.js'

class OptTransformer extends MiniOptTransformer {
  constructor(config) {
    super(config)

    this.platform = 'wx'
    this.baseMixins = wxMixins.mixins
    this.init()
  }
}
  
export default OptTransformer