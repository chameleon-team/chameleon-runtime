import BaseCtor from '../../common/proto/BaseCtor'
import lifecycle from '../../common/util/lifecycle'
import VmAdapter from '../core/VmAdapter'
import MiniRuntimeCore from '../../common/proto/MiniRuntimeCore'

export class CMLPage extends BaseCtor {
  constructor (options) {
    super(options)

    this.cmlType = 'alipay'

    const runtimeCore = new MiniRuntimeCore({
      polyHooks: lifecycle.get('alipay.page.polyHooks'),
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
        onReady() {

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
      hooks: lifecycle.get('alipay.page.hooks'),
      hooksMap: lifecycle.get('alipay.page.hooksMap'),
      polyHooks: lifecycle.get('alipay.page.polyHooks'),
      usedHooks: lifecycle.get('alipay.page.usedHooks')
    })

    runtimeCore.setOptions(this.options)

    __CML__GLOBAL.Page(this.options)
  }
}
