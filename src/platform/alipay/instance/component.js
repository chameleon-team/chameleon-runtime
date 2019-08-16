import BaseCtor from '../../common/proto/BaseCtor'
import lifecycle from '../../common/util/lifecycle'
import VmAdapter from '../core/VmAdapter'
import MiniRuntimeCore from '../../common/proto/MiniRuntimeCore'

import { comparer } from 'mobx'

export class CMLComponent extends BaseCtor {
  constructor (options) {
    super(options)

    this.cmlType = 'alipay'

    const runtimeCore = new MiniRuntimeCore({
      polyHooks: lifecycle.get('alipay.component.polyHooks'),
      platform: this.cmlType,
      options: this.options
    })

    this.initVmAdapter(VmAdapter, {
      type: 'component',
      runtimeMixins: {
        didMount() {
          // 初始化
          runtimeCore
            .setContext(this)
            .init()
            .start('component-view-render')
        },
        didUpdate (preProps) {
          const nextProps = this.props

          if (preProps && preProps !== this.props) {
            Object.keys(nextProps).forEach(key => {
              if (!comparer.structural(nextProps[key], preProps[key])) {
                this[key] = nextProps[key]
              }
            })
          }
        },
        didUnmount() {
          // stop
          runtimeCore
            .setContext(this)
            .destory()
        }
      },
      hooks: lifecycle.get('alipay.component.hooks'),
      hooksMap: lifecycle.get('alipay.component.hooksMap'),
      polyHooks: lifecycle.get('alipay.component.polyHooks'),
      usedHooks: lifecycle.get('alipay.component.usedHooks'),
      needPropsHandler: true,
      needTransformProperties: false
    })

    runtimeCore.setOptions(this.options)

    __CML__GLOBAL.Component(this.options)
  }
}
