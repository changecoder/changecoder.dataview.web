export default class BloodGraph {
  fitView = false // 是否开启画布自适应。开启后图自动适配画布大小。
  fitViewPadding = 0 // fitView 为 true 时生效。图适应画布时，指定四周的留白。
  modes = {} // 设置画布的交互模式
  nodeStateStyles = {} // 各个状态下节点的样式，例如 hover、selected
  edgeStateStyles = {} // 各个状态下边的样式
  comboStateStyles = {} // 各个状态下 Combo 的样式，例如 hover、selected
  minZoom = 0.02 // 最小缩放比例
  maxZoom = 10 // 最大缩放比例

  data = {
    nodes: [
      {
        comboId: '0',
        comboOrder: 1,
        id: '0'
      },
      {
        comboId: '1',
        comboOrder: 1,
        parentComboId: '0',
        id: '1'
      },
      {
        comboId: '2',
        comboOrder: 1,
        parentComboId: '1',
        id: '2'
      },
      {
        comboId: '2',
        comboOrder: 2,
        parentComboId: '1',
        id: '3'
      },
      {
        comboId: '2',
        comboOrder: 3,
        parentComboId: '1',
        id: '4'
      },
      {
        comboId: '1',
        comboOrder: 2,
        parentComboId: '1',
        id: '5'
      }
    ],
    edges: [
      {
        sourceId: '1',
        targetId: '2',
        id: '1'
      },
      {
        sourceId: '2',
        targetId: '3',
        id: '2'
      },
      {
        sourceId: '3',
        targetId: '4',
        id: '3'
      },
      {
        sourceId: '1',
        targetId: '4',
        id: '4'
      }
    ]
  }

  generateUINodes () {

  }

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
