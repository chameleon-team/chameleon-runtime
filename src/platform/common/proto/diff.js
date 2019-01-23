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