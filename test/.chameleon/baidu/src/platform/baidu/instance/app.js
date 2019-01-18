import BaseCtor from '../../common/proto/BaseCtor'
import lifecycle from '../../common/util/lifecycle'
import OptTransformer from '../core/OptTransformer.js'

export class App extends BaseCtor {
  constructor (options) {
    super(options)

    this.cmlType = 'baidu'

    this.initOptTransformer(OptTransformer, {
      type: 'app',
      needResolveAttrs: ['methods'],
      hooks: lifecycle.get('baidu.app.hooks'),
      hooksMap: lifecycle.get('baidu.app.hooksMap')
    })

    __CML__GLOBAL.App(this.options)
  }
}
