import BaseCtor from '../../common/proto/BaseCtor'
import lifecycle from '../../common/util/lifecycle'
import OptTransformer from '../core/OptTransformer.js'

export class Component extends BaseCtor {
  constructor (options) {
    super(options)

    this.cmlType = 'weex'

    this.initOptTransformer(OptTransformer, {
      type: 'component',
      hooks: lifecycle.get('cml.hooks')
    })
  }
}