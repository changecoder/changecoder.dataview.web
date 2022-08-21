# SVG

## reat(矩形)

### 属性列表
width:  宽度
height: 高度
style: 定义 CSS 属性
x: 定义矩形的左侧位置（例如，x="0" 定义矩形到浏览器窗口左侧的距离是 0px）
y: 定义矩形的顶端位置（例如，y="0" 定义矩形到浏览器窗口顶端的距离是 0px）

#### CSS属性
fill: 定义矩形的填充颜色（rgb 值、颜色名或者十六进制值）
stroke-width: 定义矩形边框的宽度
stroke: 定义矩形边框的颜色
fill-opacity: 定义填充颜色透明度（合法的范围是：0 - 1）
stroke-opacity: 定义轮廓颜色的透明度（合法的范围是：0 - 1）
opacity: 定义了元素的透明值 (范围: 0 到 1)
rx和ry: 使矩形产生圆角。

## circle(圆)

### 属性列表
cx和cy: 定义圆点的x和y坐标。如果省略cx和cy，圆的中心会被设置为(0, 0)
r: 定义圆的半径

## ellipse(椭圆)

### 属性列表
CX: 定义的椭圆中心的x坐标
CY: 定义的椭圆中心的y坐标
RX: 定义的水平半径
RY: 定义的垂直半径

## line(直线)

### 属性列表
x1: x 轴定义线条的开始
y1: y 轴定义线条的开始
x2: x 轴定义线条的结束
y2: y 轴定义线条的结束

## polygon(多边形)

### 属性列表
points: 定义多边形每个角的 x 和 y 坐标

#### CSS属性
fill-rule: 图形填充规则

## polyline(多线段)

## path(路径)

### 命令
M = moveto
L = lineto
H = horizontal lineto
V = vertical lineto
C = curveto
S = smooth curveto
Q = quadratic Bézier curve
T = smooth quadratic Bézier curveto
A = elliptical Arc
Z = closepath

## text(文本)

##