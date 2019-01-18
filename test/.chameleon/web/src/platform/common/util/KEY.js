import Config from './config'

const KEY = {
  wx: {
    instance: typeof wx !== 'undefined' ? wx : undefined,
    props: 'properties'
  },
  alipay: {
    instance: typeof my !== 'undefined' ? my : undefined,
    props: 'props'
  },
  baidu: {
    instance: typeof swan !== 'undefined' ? swan : undefined,
    props: 'properties'
  }
}

export default new Config(KEY)