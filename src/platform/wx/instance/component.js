import BaseCtor from '../../common/proto/BaseCtor'
import lifecycle from '../../common/util/lifecycle'
import OptTransformer from '../core/OptTransformer'
import RuntimeWidget from '../../common/proto/RuntimeWidget'

export class Component extends BaseCtor {
  constructor (options) {
    super(options)

    this.cmlType = 'wx'

    const runtimeWidget = new RuntimeWidget({
      polyHooks: lifecycle.get('wx.component.polyHooks'),
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
      polyHooks: lifecycle.get('wx.component.polyHooks'),
      usedHooks: lifecycle.get('wx.component.usedHooks'),
      needPropsHandler: true,
      needTransformProperties: true
    })
    
    this.options['options'] = {
      multipleSlots: true // 在组件定义时的选项中启用多slot支持
    }

    __CML__GLOBAL.Component(this.options)
  }
}
