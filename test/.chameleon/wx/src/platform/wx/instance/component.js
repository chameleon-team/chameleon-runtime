import BaseCtor from '../../common/proto/BaseCtor'
import lifecycle from '../../common/util/lifecycle'
import OptTransformer from '../core/OptTransformer'
import RuntimeWidget from '../../common/proto/RuntimeWidget'

export class Component extends BaseCtor {
  constructor (options) {
    super(options)

    this.cmlType = 'wx'

    const runtimeWidget = new RuntimeWidget({
      platform: this.cmlType,
      options: this.options
    })

    this.initOptTransformer(OptTransformer, {
      type: 'component',
      builtinMixins: {
        created() {
          // 初始化
          runtimeWidget
            .setContext(this)
            .init()
            // .addPageHooks()
        },
        attached() {
          runtimeWidget
            .setContext(this)
            .start('component-view-render')
          return {
            enableAsync: true
          }
        },
        ready() {
          runtimeWidget
            .setContext(this)
            .initRefs()
        },
        detached() {
          // stop
          runtimeWidget
            .setContext(this)
            .destory()
        }
      },
      hooks: lifecycle.get('wx.component.hooks'),
      hooksMap: lifecycle.get('wx.component.hooksMap'),
      needPropsHandler: true,
      needTransformProperties: true
    })

    __CML__GLOBAL.Component(this.options)
  }
}
