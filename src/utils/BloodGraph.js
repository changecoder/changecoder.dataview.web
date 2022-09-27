export default class BloodGraph {
  fitView = false // 是否开启画布自适应。开启后图自动适配画布大小。
  fitViewPadding = 0 // fitView 为 true 时生效。图适应画布时，指定四周的留白。
  modes = {} // 设置画布的交互模式
  nodeStateStyles = {} // 各个状态下节点的样式，例如 hover、selected
  edgeStateStyles = {} // 各个状态下边的样式
  comboStateStyles = {} // 各个状态下 Combo 的样式，例如 hover、selected
  minZoom = 0.02 // 最小缩放比例
  maxZoom = 10 // 最大缩放比例

  /**
   * 渲染出所有节点
   */
  renderNodes () {

  }

  /**
   * 渲染出所有边
   */
  renderEdges () {

  }

  /**
   * 指定节点为图的中心点，并将图平移，中心点也将位于可视区域的中心区域
   */
  setCenterNode () {

  }
}
