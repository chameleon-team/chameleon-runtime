import BaseCtor from '../../common/proto/BaseCtor'
import lifecycle from '../../common/util/lifecycle'
import OptTransformer from '../core/OptTransformer.js'

export class App extends BaseCtor {
  constructor (options) {
    super(options)

    this.cmlType = 'wx'

    this.initOptTransformer(OptTransformer, {
      type: 'app',
      needResolveAttrs: ['methods'],
      hooks: lifecycle.get('wx.app.hooks'),
      hooksMap: lifecycle.get('wx.app.hooksMap')
    })

    __CML__GLOBAL.App(this.options)
  }
}
