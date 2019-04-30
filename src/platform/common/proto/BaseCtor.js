import { copyProtoProperty } from '../util/proto'

class BaseCtor {
  constructor (options) {
    // 拷贝原型链上属性
    copyProtoProperty(options)

    this.options = {
      ...options
    }
    this.originalOptions = options
  }

  initVmAdapter (VmAdapter, config) {
    const VmAdapter = new VmAdapter({
      options: this.options,
      ...config,
    })
    this.options = VmAdapter.getOptions()
  }

  getOptions () {
    return this.options
  }
}

export default BaseCtor