<template>
  <div>
    <div>圆图</div>
    <svg id="roundChart" width="250" height="100"></svg>
  </div>
</template>
<script>
import * as d3 from 'd3'
export default {
  name: 'ChartRound',
  data () {
    return {
      dataset: [{
        label: '7am',
        sales: 20
      }, {
        label: '8am',
        sales: 12
      }, {
        label: '9am',
        sales: 8
      }, {
        label: '10am',
        sales: 27
      }]
    }
  },

  mounted () {
    const { dataset } = this
    const svg = d3.select('#roundChart')
      .selectAll('g')
      .data(dataset)
      .enter()
      .append('g')
    svg.append('circle')
      .attr('cy', 40)
      .attr('cx', (d, i) => (i + 1) * 50)
      .attr('r', (d) => d.sales)
    svg.append('text')
      .attr('y', 90)
      .attr('x', (d, i) => (i + 1) * 50)
      .text((d) => d.label)
  }
}
</script>
