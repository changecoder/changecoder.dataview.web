# Graph

## Combo
Combo属性
```
{
  id: String; // 唯一标识
  parentId: String; // 父combo的ID
  padding: Number | Array<Number> // Combo 内边距（非固定尺寸）
  size: Number | Array<Number> // Combo 的最小尺寸
  fixSize: Number | Array<Number> // 固定Combo 的尺寸，不指定时 Combo 大小由内部元素的分布和大小来决定。若指定了 fixSize 而没有指定 fixCollapseSize，则即使该 Combo 在收起状态下仍然保持 fixSize 指定的尺寸
  fixCollapseSize: Number | Array<Number> // 固定该 Combo 收起时的尺寸，不指定时，若未指定 fixSize 则由 size 决定收起时的尺寸，否则统一为 fixSize 尺寸
  collapsed: Boolean; // Combo 是否收起
  style: Object; // Combo 的样式配置项
}
```
样式属性
```
{
  fill: String; // 填充色
  stroke: String; // 描边颜色
  lineWidth: Number; // 描边宽度
  shadowColor: String; // 阴影颜色
  shadowBlur: Number; // 阴影范围
  shadowOffsetX: Number; // 阴影 x 方向偏移量
  shadowOffsetY: Number; // 阴影 y 方向偏移量
  opacity: Number; // 设置绘图的当前 alpha 或透明值
  fillOpacity: Number; // 设置填充的 alpha 或透明值
  cursor: String; // 鼠标在该 Combo 上时的鼠标样式，CSS 的 cursor 选项都支持
}
```

## Node
Node属性
```
{
  id: String; // 唯一标识
  x: Number; // x坐标
  y: Number; // y坐标
  type: String; // 指定节点类型, 内置节点类型名称或自定义节点的名称
  size: Number; | Array<Number>; // 节点的大小
  anchorPoints: Array<Number>; // 指定边连入节点的连接点的位置（相对于该节点而言），可以为空。例如: [0, 0]，代表节点左上角的锚点，[1, 1],代表节点右下角的锚点
  style: Object; // 节点的样式属性
}
```


## Edge

## graph对象方法属性

## Shape

### graph.registerNode
graph.registerNode(typeName: string, nodeDefinition: object)
```
graph.registerNode(
  'nodeName',
  {
    options: {
      style: {},
      stateStyles: {
        hover: {},
        selected: {},
      },
    },
    /**
     * 绘制节点，包含文本
     * @param  {Object} cfg 节点的配置项
     * @param  {G.Group} group 图形分组，节点中图形对象的容器
     * @return {G.Shape} 返回一个绘制的图形作为 keyShape，通过 node.get('keyShape') 可以获取。
     * 关于 keyShape 可参考文档 核心概念-节点/边/Combo-图形 Shape 与 keyShape
     */
    draw(cfg, group) {},
    /**
     * 绘制后的附加操作，默认没有任何操作
     * @param  {Object} cfg 节点的配置项
     * @param  {G.Group} group 图形分组，节点中图形对象的容器
     */
    afterDraw(cfg, group) {},
    /**
     * 更新节点，包含文本
     * @override
     * @param  {Object} cfg 节点的配置项
     * @param  {Node} node 节点
     */
    update(cfg, node) {},
    /**
     * 更新节点后的操作，一般同 afterDraw 配合使用
     * @override
     * @param  {Object} cfg 节点的配置项
     * @param  {Node} node 节点
     */
    afterUpdate(cfg, node) {},
    /**
     * 响应节点的状态变化。
     * 在需要使用动画来响应状态变化时需要被复写，其他样式的响应参见下文提及的 [配置状态样式] 文档
     * @param  {String} name 状态名称
     * @param  {Object} value 状态值
     * @param  {Node} node 节点
     */
    setState(name, value, node) {},
    /**
     * 获取锚点（相关边的连入点）
     * @param  {Object} cfg 节点的配置项
     * @return {Array|null} 锚点（相关边的连入点）的数组,如果为 null，则没有控制点
     */
    getAnchorPoints(cfg) {},
  }
)
```

### graph.node()
该方法可以为不同节点进行不同的配置。
1. 该方法必须在 render 之前调用，否则不起作用
2. 由于该方法优先级最高，将覆盖其他地方对节点的配置，这可能将造成一些其他配置不生效的疑惑
3. 该方法在增加元素、更新元素时会被调用，如果数据量大、每个节点上需要更新的内容多时，可能会有性能问题
  
### graph.setItemState

### graph.on

## group对象方法属性

### addShape
1. circle
2. rect
3. ellipse
4. diamond
5. triangle
6. rectangle
7. line
8. path
9. polygon
10. polyline
11. path
12. text
13. dom