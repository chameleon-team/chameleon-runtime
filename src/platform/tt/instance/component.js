import BaseCtor from '../../common/proto/BaseCtor'
import lifecycle from '../../common/util/lifecycle'
import VmAdapter from '../core/VmAdapter'
import MiniRuntimeCore from '../../common/proto/MiniRuntimeCore'

export class CMLComponent extends BaseCtor {
  constructor (options) {
    super(options)

    this.cmlType = 'tt'

    const runtimeCore = new MiniRuntimeCore({
      polyHooks: lifecycle.get('tt.component.polyHooks'),
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
      hooks: lifecycle.get('tt.component.hooks'),
      hooksMap: lifecycle.get('tt.component.hooksMap'),
      polyHooks: lifecycle.get('tt.component.polyHooks'),
      usedHooks: lifecycle.get('tt.component.usedHooks'),
      needPropsHandler: true,
      needTransformProperties: true
    })
    
    this.options['options'] = {
      multipleSlots: true // 在组件定义时的选项中启用多slot支持
    }

    runtimeCore.setOptions(this.options)
    
    __CML__GLOBAL.Component(this.options)
  }
}
