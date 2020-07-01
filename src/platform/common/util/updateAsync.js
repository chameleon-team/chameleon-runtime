let has = {}
let queue = []
let waitingTasks = []
let waiting = false
let updating = false
/**
 * 重置
 */
function resetQueue () {
  has = {}
  queue = []
  waiting = false
  updating = false
  waitingTasks.forEach(({
    id,
    curData,
    cb
  }) => {
    updateAsync(id, curData, cb)
  })
  waitingTasks = []
}
/**
 * 异步更新操作
 * @param  {number} id 组件id
 * @param  {object} curData 更新后的数据
 * @param {function} cb 实际更新函数
 * @param {boolean} sync 是否为同步，默认为false
 */
function updateAsync (id, curData, cb, sync = false) {
  if (sync) {
    cb(curData)
    return
  }

  // 处理props改变引发更新
  if (updating) {
    waitingTasks.push({
      id,
      curData,
      cb
    })
    return
  }

  if (has[id] == null) {
    has[id] = curData
    queue.push({
      id,
      cb
    })
  } else {
    // 更新has中的数据
    has[id] = curData
  }
  if (!waiting) {
    waiting = true
    Promise.resolve().then(() => {
      updating = true

      queue.sort((a, b) => a.id - b.id)
      queue.forEach((item) => {
        const {
          cb,
          id
        } = item
        cb(has[id])
      })

      resetQueue()
    })
  }
}
export default updateAsync
