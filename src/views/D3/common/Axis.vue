<template>
    <div>
        <h1>轴</h1>
        <div>
            <svg class="axis"></svg>
        </div>
    </div>
</template>
<script>
import * as d3 from 'd3'
export default {
  name: 'ChartAxis',
  data () {
    return {
      dataset: [80, 100, 56, 120, 180, 30, 40, 120, 160]
    }
  },
  mounted () {
    const { dataset } = this
    const svgWidth = 500
    const svgHeight = 300
    const svg = d3.select('svg')
      .attr('width', svgWidth)
      .attr('height', svgHeight)

    // 首先是拿最大值构建x轴坐标
    const xScale = d3.scaleLinear()
      .domain([0, d3.max(dataset)])
      .range([0, svgWidth])

    // 接下来是反转值，用作y轴坐标。
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(dataset)])
      .range([svgHeight, 0])

    // 横轴的API使用
    const xAxis = d3.axisBottom()
      .scale(xScale)

    // 纵轴的API使用
    const yAxis = d3.axisLeft()
      .scale(yScale)

    // 在svg中提供了如g元素这样的将多个元素组织在一起的元素。
    // 由g元素编组在一起的可以设置相同的颜色，可以进行坐标变换等，类似于Vue中的 <template>

    svg.append('g')
      .attr('transform', 'translate(50, 10)')
      .call(yAxis)

    const xAxisTranslate = svgHeight - 20

    svg.append('g')
      .attr('transform', 'translate(50, ' + xAxisTranslate + ')')
      .call(xAxis)
  }
}
</script>
