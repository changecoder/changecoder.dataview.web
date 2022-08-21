<template>
  <div class="data-view">
    <h1>矩形</h1>
    <svg>
      <rect
        x="50"
        y="20"
        width="150"
        height="150"
        rx="20"
        ry="20"
        style="
          fill:blue;
          stroke:pink;
          stroke-width:5;
          fill-opacity:0.1;
          stroke-opacity:0.9
        "/>
    </svg>
    <h1>文本</h1>
    <svg>
      <text x="10" y="20" style="fill:red;">Several lines:
        <tspan x="10" y="45" width="20px">First line</tspan>
        <tspan x="10" y="70">Second line</tspan>
      </text>
    </svg>
    <h1>自定义路径</h1>
    <svg>
      <defs>
        <path id="path1" d="M0,0 L0,80 M30,0 L30,100" />
      </defs>
      <text x="10" y="100"  style="fill:red; writing-mode: tb;">
        <textPath xlink:href="#path1">我的名字叫查理的爸爸</textPath>
      </text>
    </svg>
    <h1>标记</h1>
    <svg width="500" height="100">
      <defs>
        <marker id="markerCircle" markerwidth="8" markerheight="8" refx="5" refy="5">
          <circle cx="5" cy="5" r="3" style="stroke: none; fill:#000000;"></circle>
        </marker>
        <marker id="markerArrow" markerwidth="13" markerheight="13" refx="2" refy="6" orient="auto">
          <path d="M2,2 L2,11 L10,6 L2,2" style="fill: #000000;"></path>
        </marker>
      </defs>
      <path d="M100,10 L150,10 L150,60" style="stroke: #6666ff; stroke-width: 1px; fill: none;
        marker-start: url(#markerCircle);
        marker-end: url(#markerArrow);
      "></path>
    </svg>
    <h1>竖排显示文字</h1>
    <div style="writing-mode:vertical-lr;max-height: 50px;">我是文字我是文字我是文字我是蚊子</div>
  </div>
</template>

<script>
export default {
  name: 'SvgPage'
}
</script>
<style>
  .data-view {
    height: 100vh;
  }
</style>
