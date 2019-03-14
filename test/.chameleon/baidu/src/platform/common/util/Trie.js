/**
 * Trie
 */
export default class Trie {
  constructor() {
    this.root = new TrieNode(null, false);
    this.ret = []
    this.count = 0
  }

  // str = 'a.b.[0]'
  insertData (str = '') {
    const stringArr = str.split('.')
    this.insert(stringArr, this.root);
  }

  // 递归判断插入
  insert (stringArr, node) {
    if (stringArr.length === 0) {
        return;
    }
    this.count++
    
    let children = node.children;
    let data = null;

    for (let i in children) {
        if (children[i].key === stringArr[0]) {
            data = children[i];
            break
        }
    }

    if (data && stringArr.length === 1) {
      data.isEnd = true
    } else if (!data) {
      let isEnd = stringArr.length === 1 ? true : false
      data = new TrieNode(stringArr[0], isEnd);
      children.push(data);
    }

    this.insert(stringArr.splice(1), data); //将该字符节点插入节点的children中
  }

  getShortPaths () {
    for (let i in this.root.children) {
      this.getHelper(this.root.children[i], [this.root.children[i].key]);
    }
    return this.ret
  }

  // 递归输出字符串
  getHelper (node, data) {
    if (node.isEnd) {
        this.ret.push(data.join('.'))
        return;
    }
    for (let i in node.children) {
        data.push(node.children[i].key);
        this.getHelper(node.children[i], data);
        data.pop(); // 注意，找打一个单词后，返回下一个初始节点继续遍历
    }
  }
}

/**
 * 节点
 * @param {*} key 
 */
class TrieNode {
  constructor(key, isEnd) {
    this.key = key; // 节点字符
    this.children = []; // 子节点集合
    this.isEnd = isEnd
  }   
}