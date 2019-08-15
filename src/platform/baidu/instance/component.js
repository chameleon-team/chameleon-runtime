import BaseCtor from '../../common/proto/BaseCtor'
import lifecycle from '../../common/util/lifecycle'
import VmAdapter from '../core/VmAdapter'
import MiniRuntimeCore from '../../common/proto/MiniRuntimeCore'

export class CMLComponent extends BaseCtor {
  constructor (options) {
    super(options)

    this.cmlType = 'baidu'

    const runtimeCore = new MiniRuntimeCore({
      polyHooks: lifecycle.get('baidu.component.polyHooks'),
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
      hooks: lifecycle.get('baidu.component.hooks'),
      hooksMap: lifecycle.get('baidu.component.hooksMap'),
      polyHooks: lifecycle.get('baidu.component.polyHooks'),
      usedHooks: lifecycle.get('baidu.component.usedHooks'),
      needPropsHandler: true,
      needTransformProperties: true
    })

    runtimeCore.setOptions(this.options)

    __CML__GLOBAL.Component(this.options)
  }
}
