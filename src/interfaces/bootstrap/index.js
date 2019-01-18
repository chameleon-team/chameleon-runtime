

import index from './index.interface';
/* istanbul ignore next */
export default {
  bootstrap: function(options = {}) {
    index.bootstrap.call(index, options)
  },
  getInfo: index.getInfo

}