let waiting = false
let has = {}
let queue = []
/**
 * 异步更新操作
 * @param  {number} id 组件id
 * @param  {object} curData 更新后的数据
 * @param {function} cb 实际更新函数
 * @param {boolean} sync 是否为同步，默认为false
 */
const updateAsync = (id, curData, cb, sync = false) => {
  if (sync) {
    cb(curData)
    return
  }

  if (has[id] == null) {
    has[id] = curData
    queue.push({ id, cb })
  } else {
    // 更新has中的数据
    has[id] = curData
  }
  if (!waiting) {
    waiting = true
    Promise.resolve().then(() => {
      queue.sort((a, b) => a.id - b.id)
      queue.forEach((item) => {
        const { cb, id } = item
        cb(has[id])
      })
      has = {}
      queue = []
      waiting = false
    })
  }
}
export default updateAsync
