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
const DEFAULT_NODE_WIDTH = 60
const DEFAULT_NODE_HEIGHT = 60
const DEFAULT_LEVEL_HEIGHT = 60

class SimilarTreeGraph {
  treeConfig = {
    nodeWidth: DEFAULT_NODE_WIDTH,
    nodeHeight: DEFAULT_NODE_HEIGHT,
    levelHeight: DEFAULT_LEVEL_HEIGHT
  }
  collapseEnabled
  constructor(params) {
    Object.assign(this.treeConfig, params.treeConfig || {})
  }
  init() {
    this.draw()
  }
}
```
### 自定义卡片

### 节点

### 边

### 放大缩小

### 折叠