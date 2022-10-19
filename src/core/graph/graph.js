export default class Graph {
  nodes = [] // 节点集合

  edges = [] // 关系线集合

  combos = [] // 组合集

  /**
   * 节点遍历
   * @param {*} func
   */
  node = (func) => {
    this.nodes.forEach(node => {
      Object.assign(node, func(node))
    })
  }

  /**
   * 注册事件
   * @param {*} name
   * @param {*} func
   */
  on = (name, func) => {

  }

  /**
   * 触发节点状态更新
   * @param {*} node
   * @param {*} name
   * @param {*} value
   */
  setItemState = (node, name, value) => {

  }

  /**
   * 注册节点
   * @param {*} typeName
   * @param {*} nodeDefinition
   */
  registerNode = (typeName, nodeDefinition) => {

  }
}
