import BaseCtor from '../../common/proto/BaseCtor'
import lifecycle from '../../common/util/lifecycle'
import OptTransformer from '../core/OptTransformer.js'
import RuntimeWidget from '../../common/proto/RuntimeWidget'

export class App extends BaseCtor {
  constructor (options) {
    super(options)

    this.cmlType = 'wx'

    const runtimeWidget = new RuntimeWidget({
      platform: this.cmlType,
      options: this.options
    })

    this.initOptTransformer(OptTransformer, {
      type: 'app',
      builtinMixins: {
        onLaunch() {
          // 初始化
          runtimeWidget
            .setContext(this)
            .init()
            .start('app-view-render')
        }
      },
      needResolveAttrs: ['methods'],
      hooks: lifecycle.get('wx.app.hooks'),
      hooksMap: lifecycle.get('wx.app.hooksMap')
    })

    __CML__GLOBAL.App(this.options)
  }
}
