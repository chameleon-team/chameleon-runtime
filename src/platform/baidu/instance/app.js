import BaseCtor from '../../common/proto/BaseCtor'
import lifecycle from '../../common/util/lifecycle'
import VmAdapter from '../core/VmAdapter.js'
import MiniRuntimeCore from '../../common/proto/MiniRuntimeCore'

export class CMLApp extends BaseCtor {
  constructor (options) {
    super(options)

    this.cmlType = 'baidu'

    const runtimeCore = new MiniRuntimeCore({
      polyHooks: lifecycle.get('baidu.app.polyHooks'),
      platform: this.cmlType,
      options: this.options
    })

    this.initVmAdapter(VmAdapter, {
      type: 'app',
      runtimeMixins: {
        onLaunch() {
          // 初始化
          runtimeCore
            .setContext(this)
            .init()
            .start('app-view-render')
        }
      },
      needResolveAttrs: ['methods'],
      hooks: lifecycle.get('baidu.app.hooks'),
      hooksMap: lifecycle.get('baidu.app.hooksMap'),
      polyHooks: lifecycle.get('baidu.app.polyHooks'),
      usedHooks: lifecycle.get('baidu.app.usedHooks')
    })

    runtimeCore.setOptions(this.options)

    __CML__GLOBAL.App(this.options)
  }
}
