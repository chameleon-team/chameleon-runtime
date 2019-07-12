import BaseCtor from '../../common/proto/BaseCtor'
import lifecycle from '../../common/util/lifecycle'
import VmAdapter from '../core/VmAdapter.js'

export class CMLApp extends BaseCtor {
  constructor (options) {
    super(options)
    this.cmlType = 'web'

    this.initVmAdapter(VmAdapter, {
      type: 'app',
      hooks: lifecycle.get('web.hooks'),
      hooksMap: lifecycle.get('web.hooksMap'),
      polyHooks: lifecycle.get('web.polyHooks')
    })
  }
}