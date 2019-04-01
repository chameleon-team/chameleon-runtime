import BaseCtor from '../../common/proto/BaseCtor'
import lifecycle from '../../common/util/lifecycle'
import OptTransformer from '../core/OptTransformer'
import RuntimeWidget from '../../common/proto/RuntimeWidget'

import { extras } from 'mobx'

export class Component extends BaseCtor {
  constructor (options) {
    super(options)

    this.cmlType = 'alipay'

    const runtimeWidget = new RuntimeWidget({
      polyHooks: lifecycle.get('alipay.component.polyHooks'),
      platform: this.cmlType,
      options: this.options
    })

    this.initOptTransformer(OptTransformer, {
      type: 'component',
      builtinMixins: {
        didMount() {
          // 初始化
          runtimeWidget
            .setContext(this)
            .init()
            .initRefs()
            .start('component-view-render')
        },
        didUpdate (preProps) {
          const nextProps = this.props

          if (preProps && preProps !== this.props) {
            Object.keys(nextProps).forEach(key => {
              if (!extras.deepEqual(nextProps[key], preProps[key])) {
                this[key] = nextProps[key]
              }
            })
          }
        },
        didUnmount() {
          // stop
          runtimeWidget
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

    __CML__GLOBAL.Component(this.options)
  }
}
