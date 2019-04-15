
import { type } from '../util/type'
import { invariant } from '../util/warn'

// options transform 基类
class BaseOptionsTransformer {
  constructor(config) {
    this.type = config.type
    this.options = config.options
    this.injectMixins = config.injectMixins || []
    this.builtinMixins = config.builtinMixins
    this.hooks = config.hooks
    this.hooksMap = config.hooksMap
    this.polyHooks = config.polyHooks
    this.usedHooks = config.usedHooks
    this.platform = ''

    if (process.env.media !== "build") {
        const mix = this.options.mixins
        invariant(type(mix) === 'Undefined' || type(mix) === "Array",
        "mixins expects an Array")
    }
  }

  getOptions () {
    return this.options
  }
}

export default BaseOptionsTransformer
