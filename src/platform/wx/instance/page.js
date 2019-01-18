import BaseCtor from '../../common/proto/BaseCtor'
import lifecycle from '../../common/util/lifecycle'
import OptTransformer from '../core/OptTransformer'
import RuntimeWidget from '../../common/proto/RuntimeWidget'

export class Page extends BaseCtor {
  constructor (options) {
    super(options)

    this.cmlType = 'wx'

    const runtimeWidget = new RuntimeWidget({
      platform: this.cmlType,
      options: this.options
    })

    this.initOptTransformer(OptTransformer, {
      options: this.options,
      type: 'page',
      builtinMixins: {
        onLoad() {
          // 初始化
          runtimeWidget
            .setContext(this)
            .init()
            .initRefs()
            .start('page-view-render')
        },
        onUnload() {
          // stop
          runtimeWidget
            .setContext(this)
            .destory()
        }
      },
      needResolveAttrs: ['methods'],
      hooks: lifecycle.get('wx.page.hooks'),
      hooksMap: lifecycle.get('wx.page.hooksMap')
    })

    __CML__GLOBAL.Page(this.options)
  }
}
