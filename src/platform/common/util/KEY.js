import Config from './config'
import apiInterface from './api.interface'

const instanceAPI = apiInterface.getInstance()

const KEY = {
  wx: {
    instance: instanceAPI,
    props: 'properties'
  },
  alipay: {
    instance: instanceAPI,
    props: 'props'
  },
  baidu: {
    instance: instanceAPI,
    props: 'properties'
  }
}

export default new Config(KEY)