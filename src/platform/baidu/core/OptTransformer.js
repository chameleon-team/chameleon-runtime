import MiniOptTransformer from '../../common/proto/MiniOptTransformer'

class OptTransformer extends MiniOptTransformer {
  constructor(props) {
    super(props)

    this.platform = 'baidu'

    this.init()
  }
}
  
  export default OptTransformer