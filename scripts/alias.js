const path = require('path')

const resolve = p => path.resolve(__dirname, '../', p)

module.exports = {
  alipay: resolve('src/platform/alipay'),
  baidu: resolve('src/platform/baidu'),
  qq: resolve('src/platform/qq'),
  web: resolve('src/platform/web'),
  weex: resolve('src/platform/weex'),
  wx: resolve('src/platform/wx')
}
