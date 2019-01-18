import { copyProtoProperty } from '../util/proto'

class BaseCtor {
  constructor (options) {
    // 拷贝原型链上属性
    copyProtoProperty(options)

    this.options = Object.assign({}, options)
    this.originalOptions = options
  }

  initOptTransformer (OptTransformer, config) {
    const optTransformer = new OptTransformer({
      options: this.options,
      ...config,
    })
    this.options = optTransformer.getOptions()
  }

  getOptions () {
    return this.options
  }
}

export default BaseCtor