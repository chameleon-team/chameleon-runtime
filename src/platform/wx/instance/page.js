import BaseCtor from '../../common/proto/BaseCtor'
import lifecycle from '../../common/util/lifecycle'
import VmAdapter from '../core/VmAdapter'
import RuntimeWidget from '../../common/proto/RuntimeWidget'

export class Page extends BaseCtor {
  constructor (options) {
    super(options)

    this.cmlType = 'wx'

    const runtimeWidget = new RuntimeWidget({
      polyHooks: lifecycle.get('wx.page.polyHooks'),
      platform: this.cmlType,
      options: this.options
    })

    this.initVmAdapter(VmAdapter, {
      options: this.options,
      type: 'page',
      builtinMixins: {
        onLoad() {
          // 初始化
          runtimeWidget
            .setContext(this)
            .init()
            .start('page-view-render')
        },
        onUnload() {
          // stop
          runtimeWidget
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
      hooks: lifecycle.get('wx.page.hooks'),
      hooksMap: lifecycle.get('wx.page.hooksMap'),
      polyHooks: lifecycle.get('wx.page.polyHooks'),
      usedHooks: lifecycle.get('wx.page.usedHooks')
    })

    __CML__GLOBAL.Page(this.options)
  }
}
