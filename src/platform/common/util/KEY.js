import Config from './config'
import apiInterface from './api.interface'

const instanceAPI = apiInterface.getInstance()

const KEY = {
  computed: '_cmlComputed',
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
  },
  qq: {
    instance: instanceAPI,
    props: 'properties'
  }
}

export default new Config(KEY)