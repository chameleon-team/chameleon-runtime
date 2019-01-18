
// options transform 基类
class BaseOptionsTransformer {
  constructor(config) {
    this.type = config.type
    this.options = config.options
    this.injectMixins = config.injectMixins || []
    this.builtinMixins = config.builtinMixins
    this.hooks = config.hooks
    this.hooksMap = config.hooksMap
    this.platform = ''
  }

  getOptions () {
    return this.options
  }
}

export default BaseOptionsTransformer
