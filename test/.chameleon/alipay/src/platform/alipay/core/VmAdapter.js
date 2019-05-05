import MiniVmAdapter from '../../common/proto/MiniVmAdapter'
import alipayMixins from 'chameleon-mixins/alipay-mixins.js'

class VmAdapter extends MiniVmAdapter {
  constructor(config) {
    super(config)

    this.platform = 'alipay'
    this.baseMixins = alipayMixins.mixins
    this.init()
  }
}
  
export default VmAdapter