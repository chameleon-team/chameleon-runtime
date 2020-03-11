import BaseCtor from '../../common/proto/BaseCtor'
import lifecycle from '../../common/util/lifecycle'
import VmAdapter from '../core/VmAdapter'
import MiniRuntimeCore from '../../common/proto/MiniRuntimeCore'

export class CMLComponent extends BaseCtor {
  constructor (options) {
    super(options)

    this.cmlType = 'wx'

    const runtimeCore = new MiniRuntimeCore({
      polyHooks: lifecycle.get('wx.component.polyHooks'),
      platform: this.cmlType,
      options: this.options
    })

    this.initVmAdapter(VmAdapter, {
      type: 'component',
      runtimeMixins: {
        created() {
          // 初始化
          runtimeCore
            .setContext(this)
            .init()
        },
        attached() {
          runtimeCore
            .setContext(this)
            .start('component-view-render')
        },
        ready() {

        },
        detached() {
          // stop
          runtimeCore
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
    
    this.options['options'] = {...{
      multipleSlots: true
    }, ...(this.options['options'] || {})}


    runtimeCore.setOptions(this.options)
    
    __CML__GLOBAL.Component(this.options)
  }
}
