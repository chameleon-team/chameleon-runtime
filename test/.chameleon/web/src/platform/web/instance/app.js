import BaseCtor from '../../common/proto/BaseCtor'
import lifecycle from '../../common/util/lifecycle'
import OptTransformer from '../core/OptTransformer.js'

export class App extends BaseCtor {
  constructor (options) {
    super(options)
    this.cmlType = 'web'

    this.initOptTransformer(OptTransformer, {
      type: 'app',
      hooks: lifecycle.get('cml.hooks')
    })
  }
}