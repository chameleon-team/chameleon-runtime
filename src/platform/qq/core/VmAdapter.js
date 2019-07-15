import MiniVmAdapter from '../../common/proto/MiniVmAdapter'
import wxMixins from 'chameleon-mixins/wx-mixins.js'

class VmAdapter extends MiniVmAdapter {
  constructor(config) {
    super(config)

    this.platform = 'qq'
    // 样式、事件代理 mixins
    this.baseMixins = wxMixins.mixins
    this.init()
  }
}
  
export default VmAdapter