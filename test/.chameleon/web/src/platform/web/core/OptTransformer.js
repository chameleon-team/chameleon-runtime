import WexOptTransformer from '../../common/proto/WexOptTransformer'
import { query2json } from '../../common/util/url'

class OptTransformer extends WexOptTransformer {
  constructor(config) {
    super(config)

    this.init()
  }

  extendLifecycleArgs(...args) {
    args = args || []

    let searchObj = query2json(location.search)
  
    let hashObj = query2json(location.hash)
  
    args[0] = { ...args[0], ...searchObj, ...hashObj}
  
    return args
  }

}

export default OptTransformer
