import BaseCtor from '../../common/proto/BaseCtor'
import lifecycle from '../../common/util/lifecycle'
import OptTransformer from '../core/OptTransformer.js'

export class Page extends BaseCtor {
  constructor (options) {
    super(options)
    this.cmlType = 'web'

    this.initOptTransformer(OptTransformer, {
      type: 'page',
      hooks: lifecycle.get('web.hooks'),
      hooksMap: lifecycle.get('web.hooksMap'),
      polyHooks: lifecycle.get('web.polyHooks'),
      needAddHookMixin: true
    })
  }
}