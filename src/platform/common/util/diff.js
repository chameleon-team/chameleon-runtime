
import { type } from './type'
import Trie from './Trie'

export default function diff(newData, oldData) {

  let diffData = {}
  let newDataFlag = []
  let oldDataFlag = []
  let newFlatData = {}
  let oldFlatData = {}
  
  flatten(newData, '', newDataFlag, newFlatData)
  flatten(oldData, '', oldDataFlag, oldFlatData)

  newDataFlag.forEach((path) => {
    let nVal = newFlatData[path]
    let oVal = oldFlatData[path]

    if (nVal !== oVal) {
      updateDiff(nVal, path)
    }

    deleFlag(oldDataFlag, path)
  })

  const trie = new Trie()
  
  oldDataFlag.forEach(path => {
    trie.insertData(path)
  })

  trie.getShortPaths().filter(item => item).forEach(path => {
    // update delete item
    updateDiff('', path)
  })

  function updateDiff(val, path) {
    if (val !== undefined) {
      diffData[path] = val;
    }
  }
  
  return diffData
}

function hasFlag(collectAry, path) {
  return collectAry.indexOf(path)
}

function deleFlag(collectAry, path) {
  let index = hasFlag(collectAry, path)
  if (index !== -1) {
    collectAry.splice(index, 1)
  }
}


function check(str) {
  if (!str) {
    console.error('pathStr should not be null!')
    return false
  }
  return true
}

function flatten(d, pathStr = '', collectAry, flatData) {
  if (type(d) === 'Array') {
    check(pathStr)

    if (d.length === 0) {
      collectAry.push(pathStr)
      if (flatData) {
        flatData[pathStr] = d
      }
      return 
    }

    d.forEach((item, i) => {
      const path = `${pathStr}[${i}]`
      flatten(item, path, collectAry, flatData)
    })
  } else if (type(d) === 'Object') {
    if (Object.keys(d).length === 0) {
      collectAry.push(pathStr)
      if (flatData) {
        flatData[pathStr] = d
      }
      return 
    }

    Object.keys(d).forEach(k => {
      const v = d[k]
      const path = pathStr ?
                    isNum(k) ?
                      `${pathStr}[${k}]`: `${pathStr}.${k}`
                    : k
      flatten(v, path, collectAry, flatData)
    })
  } else {
    check(pathStr)
    collectAry.push(pathStr)
    if (flatData) {
      flatData[pathStr] = d
    }
  }
}

function isNaN(value) {
  let n = Number(value)
  return n !== n
}

function isNum(value) {
  return !isNaN(Number(value))
}

/**
     * func initFlag(){oldData{'k1':'v1','k2':{'k3':'v3'}} -> oldDataFlag[] record to ['k1','k2.k3']}
     * func deleFlag(path){ index = oldDataFlag.indexOf(path) ? oldDataFlag[path].splice(index)}
     * 
     * func update(path,val){ diffData[path] = oldData[path] = val;}
     * 
     * 深度遍历
     * initial
     * 一、if Object
     * forEach 
     *  goto initial && record path
     * 二、if Array
      forEach 
        goto initial && record path
     * 三、others
      1)、if oldDataFlag.hasOwnProperty(path), newData有oldData有：
        if newData[path] != oldData[path]
          update(newData[path], path) && deleFlag(path)
      2)、else newData有oldData无：
        update(newData[path], path)
      
    after newData无oldData有情况：
    剩余 oldDataFlag[path] 代表 need to delete
    needToDele[]

    使用字典树算法替代 复杂度是O(所有keyPath长度之和)
    trie = []
    forEach oldDataFlag -> i
      path = oldDataFlag[i]
      nodes = path.split('.')
      forEach nodes -> node
        record node
      
    forEach oldDataFlag[1~len-1] -> i
        forEach oldDataFlag[i~len-1] -> j
            if oldDataFlag[i].indexOf(oldDataFlag[j])
              flag = notAdd
        if ! notAdd , needToDele.push[oldDataFlag[i]]
    forEach needToDele
      find parentPath,if newData[parentPath], update(newData[parentPath],parentPath)
    
    oldData = Object.assgin({},newData)
    initFlag()
     * 
     */