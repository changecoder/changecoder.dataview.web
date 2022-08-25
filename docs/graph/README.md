# 图

## 实现类树图
参数设计
* treeConfig
  * nodeWidth
  * nodeHeight
  * levelHeight
* linkStyle
* direction
* collapseEnabled
* dataset
* container
```
import * as d3 from 'd3'
import { deepCopy } from 'loadash'

const DEFAULT_NODE_WIDTH = 60
const DEFAULT_NODE_HEIGHT = 60
const DEFAULT_LEVEL_HEIGHT = 60

class SimilarTreeGraph {
  treeConfig = {
    nodeWidth: DEFAULT_NODE_WIDTH,
    nodeHeight: DEFAULT_NODE_HEIGHT,
    levelHeight: DEFAULT_LEVEL_HEIGHT
  }
  collapseEnabled = true
  edges = []
  nodes = []

  constructor(params) {
    const { treeConfig, dataset } = params
    Object.assign(this.treeConfig, treeConfig || {})
    this.dataset = this.updatedInternalData(dataset)
  }

  init() {
    this.draw()
  }

  buildTree() {
    const treeBuilder = d3
      .tree()
      .nodeSize([this.treeConfig.nodeWidth, this.treeConfig.levelHeight])
    const tree = treeBuilder(d3.hierarchy(this.dataset))
    return [tree.descendants(), tree.links()]
  }

  updatedInternalData(externalData) {
    const data = { name: "__invisible_root", children: [] }
    if (!externalData) {
      return data
    }
    if (Array.isArray(externalData)) {
      for (var i = externalData.length - 1; i >= 0; i--) {
        data.children.push(deepCopy(externalData[i]))
      }
    } else {
      data.children.push(deepCopy(externalData))
    }
    return data
  }

  updateDataList() {
    let [nodeDataList, linkDataList] = this.buildTree()
    nodeDataList.splice(0, 1)
    linkDataList = linkDataList.filter(
      (x) => x.source.data.name !== "__invisible_root"
    )
    this.edges = linkDataList
    this.nodes = nodeDataList
  }

  draw() {
    this.updateDataList()
  }
}
```
### 自定义卡片

### 节点

### 边

### 放大缩小

### 折叠