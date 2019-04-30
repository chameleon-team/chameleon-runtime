import MiniVmAdapter from '../../common/proto/MiniVmAdapter'
import wxMixins from 'chameleon-mixins/wx-mixins.js'

class VmAdapter extends MiniVmAdapter {
  constructor(config) {
    super(config)

    this.platform = 'wx'
    this.baseMixins = wxMixins.mixins
    this.init()
  }
}
  
export default VmAdapter