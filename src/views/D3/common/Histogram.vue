<template>
    <div>
        <h1>柱状图</h1>
        <div>
            <svg class="histogram"></svg>
        </div>
        <div class="histogram_div"></div>
    </div>
</template>
<script>
import * as d3 from 'd3'

export default {
  name: 'ChartHistogram',
  data () {
    return {
      dataset: [80, 100, 56, 120, 180, 30, 40, 120, 160]
    }
  },
  mounted () {
    this.paintSvg()
    this.paintDiv()
  },
  methods: {
    paintSvg () {
      const { dataset } = this
      // 定义svg图形宽高，以及柱状图间距
      const svgWidth = 500; const svgHeight = 300; const barPadding = 5
      // 通过图形计算每个柱状宽度
      const barWidth = (svgWidth / dataset.length)
      // 绘制图形
      const svg = d3.select('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight)
      // rect，长方形
      // 文档：http://www.w3school.com.cn/svg/svg_rect.asp
      svg.selectAll('rect')
        .data(dataset) // 绑定数组
        .enter() // 指定选择集的enter部分
        .append('rect') // 添加足够数量的矩形
        .attr('y', d => svgHeight - d) // d为数据集每一项的值, 取y坐标
        .attr('height', d => d) // 设定高度
        .attr('width', barWidth - barPadding) // 设定宽度
        .attr('transform', (d, i) => {
          const translate = [barWidth * i, 0]
          return 'translate(' + translate + ')'
        }) // 实际是计算每一项值的x坐标

      svg.selectAll('text')
        .data(dataset)
        .enter()
        .append('text')
        .text(d => d)
        .attr('y', d => svgHeight - d - 10)
        .attr('x', (_, i) => barWidth * i + 15)
        .attr('fill', '#A64C38')
    },
    paintDiv () {
      const { dataset } = this
      d3.select('.histogram_div')
        .selectAll('div') // selectAll 方法返回了一个 D3 selection。D3 selection 是一个数组，当针对一个数据点创建一个 div ，然后通过 enter() 和 append() 调用这个 div 时，selection 中的元素就会被创建出来。
        .data(dataset)
        .enter()
        .append('div')
        .style('height', d => `${d}px`)
    }
  }
}
</script>
<style>
.histogram_div div {
  display: inline-block;
  background: #4285F4;
  width: 20px;
  margin: 20px;
  margin-right: 3px;
}
</style>
