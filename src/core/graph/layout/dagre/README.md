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
返回结果: 图中每一个节点都有一个order属性，表示其在同层内的次序

算法步骤:
1. 针对每一个层级，分别生成两个图，downlayer和uplayer。（见单层级图构建）
2. 给图中所有节点一个初始的order。
3. 返回一个层级矩阵，每一个层级对应一个数组，每一层按照节点的顺序进行排序。
4. 按照节点在所在层级数组中的位置，赋予其初始order。
5. 遍历downlayer和uplayer，计算每一层级中节点的barycenter和weight（见barycenter的计算）
6. 根据barycenter的值，调整节点顺序。（见Resolve Conflict）
7. 根据调整后的结果，重新计算出层级矩阵。
8. 根据层级矩阵，算出交叉边的个数。
9. 与上一次计算出的交叉边数作比较，交叉少的排序方案。
10. 5-8迭代执行4次。（为什么是4次？）
11. 根据最终得到的order结果，修改图中节点的order属性。

#### 单层级图构建
核心思想：构建一个图，图中包含某层级内所有的节点，以及指向这些节点的边（或从这些节点的边指出）。层级内没有父节点的节点会被当做返回图的根节点，这样更便于移动节点的层次位置。

前置条件:
1. DAG
2. 实体节点都有rank属性
3. 子图节点有minrank和maxrank属性
4. 边有weight属性
   
返回结果:
1. 输出的图中所有的节点都有可移动的层级
2. 可移动层的根节点，是根据graph的root节点指向的子节点决定的。
3. 指向可移动节点的不可移动节点（与relationship有关），也包含在图中（无层次结构）
4. 指向可移动节点的边（与relationship有关），也包含在图中
5. 如果有相同的边，合并权重成一条边。

算法步骤:
1. 找到图的根节点，作为返回图的根节点。
2. 筛选中指定层级内的子图和节点，放到图中。如果不存在parent，就设置根节点为该节点的parent。
3. 获取节点的入边（与relationship有关），放入到图中。
4. 如果是子图，将子图的左右边框的同层虚节点也加入到图中。

#### BaryCenter计算过程
核心思想: 计算每个节点的重心值。简单情况：不考虑边的权重，rank层的节点v1，v2，v1的上游节点u1和v2的上游节点u2位于rank-1层。如果u1的order大于u2的order，那么必须满足v1的order大于v2的order,否则将出现交叉. 复杂情况：考虑边的权重，以及节点可能存在多个上游节点。节点上增加属性weight和barycenter。

#### Resolve Conflict
核心思想: 根据上一步计算出来的节点中心值，解决图和节点重心不一致的地方。如果节点的重心值违反了图的约束条件，就合并冲突的节点，使其符合约束条件。

前置条件: 输入的数组中，每一个元素都包含{v， barycenter，weight} 或者{v}

返回结果: 新的数组，元素 {vs, i, barycenter, weight} 。vs是一个节点列表，里面可能只有一个节点，也有可能是多个节点，这多个节点是需要合并的节点顺序。属性“ i”是“ vs”中任何元素的最低原始索引。统一层级中两个节点，如果存在，则必须存在。否则将肯定存在交叉，这种情况下对换v1和v2即可。
### 布局
一个可读性较高的图应该满足:
1. 边尽量的短
2. 上下层的节点位置要平衡，长边尽量不要出现拐点。

#### 平衡
最简单的平衡，横坐标根据左右两个图中节点的横坐标取平均值。

#### 边的路径计算

## 嵌套子图的处理
核心思想: 基于分层布局，把一个子图当做虚拟节点，然后全局划分所有节点到不同的层级，再调整统一层级内节点的顺序，避免产生交叉线。

1. 层级划分
2. 生成虚拟节点

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