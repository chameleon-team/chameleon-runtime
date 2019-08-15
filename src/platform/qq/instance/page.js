import BaseCtor from '../../common/proto/BaseCtor'
import lifecycle from '../../common/util/lifecycle'
import VmAdapter from '../core/VmAdapter'
import MiniRuntimeCore from '../../common/proto/MiniRuntimeCore'

export class Page extends BaseCtor {
  constructor (options) {
    super(options)

    this.cmlType = 'qq'

    const runtimeCore = new MiniRuntimeCore({
      polyHooks: lifecycle.get('qq.page.polyHooks'),
      platform: this.cmlType,
      options: this.options
    })

    this.initVmAdapter(VmAdapter, {
      options: this.options,
      type: 'page',
      runtimeMixins: {
        onLoad() {
          // 初始化
          runtimeCore
            .setContext(this)
            .init()
            .start('page-view-render')
        },
        onUnload() {
          // stop
          runtimeCore
            .setContext(this)
            .destory()
        },
        onPullDownRefresh() {
          const path = this.route
          
          this.$cmlEventBus.emit(`${path}_onPullDownRefresh`, {
            path
          })
        },
        onReachBottom() {
          const path = this.route
          
          this.$cmlEventBus.emit(`${path}_onReachBottom`, {
            path
          })
        }
      },
      needResolveAttrs: ['methods'],
      hooks: lifecycle.get('qq.page.hooks'),
      hooksMap: lifecycle.get('qq.page.hooksMap'),
      polyHooks: lifecycle.get('qq.page.polyHooks'),
      usedHooks: lifecycle.get('qq.page.usedHooks')
    })

    runtimeCore.setOptions(this.options)

    __CML__GLOBAL.Page(this.options)
  }
}
