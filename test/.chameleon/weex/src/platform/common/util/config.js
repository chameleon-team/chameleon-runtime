class Config {
  constructor(data) {
    this.data = data
  }

  get (path = '', def) {
    let result = this.data
    path.split('.').forEach((key) => {
      if (key && typeof result !== 'undefined') {
        result = result[key]
      }
    })
    if (typeof result !== 'undefined') {
      return result
    } else {
      return def
    }
  }

  set (path, value) {
    if (typeof value === 'undefined') {
      this.data = path
    } else {
      path = String(path || '').trim()
      if (path) {
        let paths = path.split('.')
        let last = paths.pop()
        let data = this.data || {}
        paths.forEach((key) => {
          let type = data[key]
          if (typeof type === 'object') {
            data = data[key]
          } else if (typeof type === 'undefined') {
            data = data[key] = {}
          } else {
            throw new Error(`forbidden to set property[${key}] of [${type}] data`)
          }
        })
        data[last] = value
      }
    }
  }
}

export default Config