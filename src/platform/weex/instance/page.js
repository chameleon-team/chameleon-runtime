import BaseCtor from '../../common/proto/BaseCtor'
import lifecycle from '../../common/util/lifecycle'
import VmAdapter from '../core/VmAdapter.js'

export class CMLPage extends BaseCtor {
  constructor (options) {
    super(options)

    this.cmlType = 'weex'

    this.initVmAdapter(VmAdapter, {
      type: 'page',
      hooks: lifecycle.get('weex.hooks'),
      needAddHookMixin: true
    })
  }
}