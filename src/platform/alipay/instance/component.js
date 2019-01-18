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
        didUpdate (prevProps) {
          if (prevProps && prevProps !== this.props) {
            Object.keys(prevProps).forEach(key => {
              if (!extras.deepEqual(this.props[key], prevProps[key])) {
                const prop = this.props[key]
                if (Object.prototype.toString.call(prop).slice(8, -1) === 'Object') {
                  this[key] = prop['default']
                } else {
                  this[key] = prop
                }
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
      needPropsHandler: true,
      needTransformProperties: false
    })

    __CML__GLOBAL.Component(this.options)
  }
}
