# Dagre布局算法

## 四阶段
1. 去环
2. 层级划分
3. 同层级内节点排序
4. 绘图

### 去环算法

#### DFS

#### 贪心算法

### 分层算法

#### 最长路径算法

#### 紧致树算法

#### networks simplex算法

### 同层内节点排序


## 核心逻辑
```
function runLayout(g, time) {
  // 优化边上label的位置
  time("    makeSpaceForEdgeLabels", function() { makeSpaceForEdgeLabels(g); });
  // 去除自环
  time("    removeSelfEdges",        function() { removeSelfEdges(g); });
  // 去环
  time("    acyclic",                function() { acyclic.run(g); });
  // 复合图布局，复合图生成虚拟节点，并排序成nesting graph
  time("    nestingGraph.run",       function() { nestingGraph.run(g); });
  // 层级分配
  time("    rank",                   function() { rank(util.asNonCompoundGraph(g)); });
  // 边lable的处理。在边的中间位置生成虚拟节点，代表lable的位置
  time("    injectEdgeLabelProxies", function() { injectEdgeLabelProxies(g); });
  // 移除空的层级，并将rank都调整为正数
  time("    removeEmptyRanks",       function() { removeEmptyRanks(g); });
  // 移除虚拟边和虚拟根节点
  time("    nestingGraph.cleanup",   function() { nestingGraph.cleanup(g); });
  // 调整rank为>=0的数
  time("    normalizeRanks",         function() { normalizeRanks(g); });
  // 找到节点组的最大和最小层级
  time("    assignRankMinMax",       function() { assignRankMinMax(g); });
  // 移除边的label虚节点，将虚节点的层级记录到label对象中
  time("    removeEdgeLabelProxies", function() { removeEdgeLabelProxies(g); });
  // 将长度大于1的边，分割成长度为1的n条边，并在边中插入虚拟节点
  time("    normalize.run",          function() { normalize.run(g); });
  time("    parentDummyChains",      function() { parentDummyChains(g); });
  // 给组添加边框，增加左侧虚节点和右侧虚节点
  time("    addBorderSegments",      function() { addBorderSegments(g); });
  // 节点排序
  time("    order",                  function() { order(g); });
  // 回填自环路
  time("    insertSelfEdges",        function() { insertSelfEdges(g); });
  // 调整坐标系，默认是按照上下布局来算的，如果是左右布局，就对调节点和图的width和height
  time("    adjustCoordinateSystem", function() { coordinateSystem.adjust(g); });
  // 布局，计算位置
  time("    position",               function() { position(g); });
  time("    positionSelfEdges",      function() { positionSelfEdges(g); });
  // 根据group的虚节点，计算group的位置，然后移除虚节点
  time("    removeBorderNodes",      function() { removeBorderNodes(g); });
  // 移除前面长边切割中插入的虚拟节点
  time("    normalize.undo",         function() { normalize.undo(g); });
  // 边的label
  time("    fixupEdgeLabelCoords",   function() { fixupEdgeLabelCoords(g); });
  // 根据布局方向，调整节点和边的宽度、高度，以及xy坐标
  time("    undoCoordinateSystem",   function() { coordinateSystem.undo(g); });
  // 算出x，y坐标
  time("    translateGraph",         function() { translateGraph(g); });
  // 计算边的point坐标轴
  time("    assignNodeIntersects",   function() { assignNodeIntersects(g); });
  // 反转反转边
  time("    reversePoints",          function() { reversePointsForReversedEdges(g); });
  time("    acyclic.undo",           function() { acyclic.undo(g); });
}
```
## 参考资料
1. [《A Technique for Drawing Directed Graphs》](http://www.graphviz.org/Documentation/TSE93.pdf)
1. [dagre](https://github.com/dagrejs/dagre)
2. [dagre-d3](https://github.com/dagrejs/dagre-d3)