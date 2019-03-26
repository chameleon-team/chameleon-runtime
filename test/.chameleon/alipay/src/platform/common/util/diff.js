
import { type } from './type'
import { extras } from 'mobx'

export default function diff(current, old) {
  let out = {}
  prefill(current, old)
  iDiff(current, old, '', out)

  if (Object.keys(out).length === 1 && out[''] !== undefined) {
    out = out['']
  }

  // console.log('diff------:', out)
  return out
}

function prefill(current, old) {
    if (extras.deepEqual(current, old)) return

    if (type(current) === 'Object' && type(old) === 'Object') {
      const curLength = Object.keys(current).length
      const oldLength = Object.keys(old).length

      if(curLength >= oldLength){
          for (let key in old) {
              const curVal = current[key]
              if (curVal === undefined) {
                  current[key] = ''
              } else {
                  prefill(curVal, old[key])
              }
          }
      }
    } else if (type(current) === 'Array' && type(old) === 'Array') {
        if (current.length >= old.length) {
            old.forEach((item, index) => {
                prefill(current[index], item)
            })
        }
    }
}

function iDiff(current, old, path, result) {
  if (extras.deepEqual(current, old)) return
    
    if (type(current) === 'Object' && type(old) === 'Object') {
      const curLength = Object.keys(current).length
      const oldLength = Object.keys(old).length

      if (curLength >= oldLength) {
          for (let key in current) {
              const curVal = current[key]
              const oldVal = old[key]

              iDiff(curVal, oldVal, getPath(path, key), result)
          }
      } else {
        update(current, path, result)
      }
    } else if (type(current) === 'Array' && type(old) === 'Array' && current.length >= old.length) {
        current.forEach((item, index) => {
            iDiff(item, old[index], getPath(path, index, 'array'), result)
        })
    } else {
      update(current, path, result)
    }
}

function update(item, path, collection) {
  if (item !== undefined) {
    collection[path] = item;
  }
}

function getPath(pathStr, key, type) {
  if (type === 'array') {
    return `${pathStr}[${key}]`
  }

  return isNum(key) ?
          `${pathStr}[${key}]`
            : pathStr ?
              `${pathStr}.${key}`
              : key
}

function isNaN(value) {
  let n = Number(value)
  return n !== n
}

function isNum(value) {
  return !isNaN(Number(value))
}