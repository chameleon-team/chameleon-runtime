import BaseCtor from '../../common/proto/BaseCtor'
import lifecycle from '../../common/util/lifecycle'
import VmAdapter from '../core/VmAdapter.js'

export class CMLApp extends BaseCtor {
  constructor (options) {
    super(options)

    this.cmlType = 'weex'

    this.initVmAdapter(VmAdapter, {
      type: 'app',
      hooks: lifecycle.get('weex.hooks')
    })
  }
}