import BaseCtor from '../../common/proto/BaseCtor'
import lifecycle from '../../common/util/lifecycle'
import OptTransformer from '../core/OptTransformer.js'

export class App extends BaseCtor {
  constructor (options) {
    super(options)

    this.cmlType = 'alipay'

    this.initOptTransformer(OptTransformer, {
      type: 'app',
      needResolveAttrs: ['methods'],
      hooks: lifecycle.get('alipay.app.hooks'),
      hooksMap: lifecycle.get('alipay.app.hooksMap')
    })

    __CML__GLOBAL.App(this.options)
  }
}
