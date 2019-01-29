
import { type } from './type'
import Trie from './Trie'
import { getByPath } from './util';

export default function diff(newData, oldData) {
  return newData
  
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

  const updateFlags = trie.getShortPaths().map((path) => {
    // 获取parent path
    let ary = path.split('.')


    let len = ary.length
    let last = ary[len-1]
    let pattern = /\[[0-9]+\]$/

    if (pattern.test(last)) {
      // 数组
      ary[len-1] = last.replace(pattern, '')
    } else {
      if (len > 1) {
        ary.pop()
      }
    }

    return ary.join('.')
  }).filter(item => item)

  updateFlags.forEach(path => {
    if (path) {
      let nVal = newData[path]
      updateDiff(nVal, path)
    }
  })
  
  return diffData

  function hasFlag(collectAry, path) {
    return collectAry.indexOf(path)
  }

  function deleFlag(collectAry, path) {
    let index = hasFlag(collectAry, path)
    if (index !== -1) {
      collectAry.splice(index, 1)
    }
  }

  function updateDiff(val, path) {
    if (val !== undefined) {
      diffData[path] = val;
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
        const path = pathStr ? `${pathStr}.${k}` : k
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