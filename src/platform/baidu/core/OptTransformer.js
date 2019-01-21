import MiniOptTransformer from '../../common/proto/MiniOptTransformer'
import wxMixins from 'chameleon-mixins/wx-mixins.js'

class OptTransformer extends MiniOptTransformer {
  constructor(props) {
    super(props)

    this.platform = 'baidu'
    this.baseMixins = wxMixins.mixins
    this.init()
  }
}
  
  export default OptTransformer