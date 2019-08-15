import BaseCtor from '../../common/proto/BaseCtor'
import lifecycle from '../../common/util/lifecycle'
import VmAdapter from '../core/VmAdapter.js'
import MiniRuntimeCore from '../../common/proto/MiniRuntimeCore'

export class App extends BaseCtor {
  constructor (options) {
    super(options)

    this.cmlType = 'qq'

    const runtimeCore = new MiniRuntimeCore({
      polyHooks: lifecycle.get('qq.app.polyHooks'),
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
      hooks: lifecycle.get('qq.app.hooks'),
      hooksMap: lifecycle.get('qq.app.hooksMap'),
      polyHooks: lifecycle.get('qq.app.polyHooks'),
      usedHooks: lifecycle.get('qq.app.usedHooks')
    })

    runtimeCore.setOptions(this.options)

    __CML__GLOBAL.App(this.options)
  }
}
