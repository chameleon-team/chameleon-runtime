
import { type } from '../util/type'
import { invariant } from '../util/warn'
import lifecycle from '../util/lifecycle'

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

  /**
   * 生命周期映射
   * @param  {Object} VMObj vm对象
   * @param  {Object} map 映射表
   * @param  {Object} lifecycle 生命周期序列 确保顺序遍历
   * @return {Object}     修改后值
   */
  transferLifecycle(VMObj) {

    let _hooksTemp = []
    let _mapTemp = {}
    // 将生命周期 键名 处理成 [`$_${key}`]
    Object.keys(this.hooksMap).forEach(key => {
      const uniKey = `$_${key}`
      _hooksTemp.push(uniKey)
      _mapTemp[uniKey] = this.hooksMap[key]
      
      if (VMObj.hasOwnProperty(key)) {
        VMObj[uniKey] = VMObj[key]
        delete VMObj[key]
      }
    })

    _hooksTemp.forEach(function(uniKey) {
      const mapKey = _mapTemp[uniKey]
      const hook = VMObj[uniKey]
  
      if (VMObj.hasOwnProperty(uniKey) && mapKey && hook) {
        if (VMObj.hasOwnProperty(mapKey)) {
          if (type(VMObj[mapKey]) !== 'Array') {
            VMObj[mapKey] = [VMObj[mapKey], hook]
          } else {
            VMObj[mapKey].push(hook)
          }
        } else {
          VMObj[mapKey] = [hook]
        }
        delete VMObj[uniKey]
      }
    })
  }

  handleMixins (VMObj) {
    if (!VMObj.mixins) return

    const mixins = VMObj.mixins

    mixins.forEach((mix) => {
      // 生命周期映射
      this.transferLifecycle(mix)
    })
  }

  getOptions () {
    return this.options
  }
}

export default BaseOptionsTransformer
