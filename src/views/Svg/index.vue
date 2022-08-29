<template>
  <div class="data-view">
    <h1>HTML与SVG的结合</h1>
    <div class="container">
      <svg class="svg-container" style="transform: scale(1) translate(0px, 0px); transform-origin: center center;">
      </svg>
      <div class="dom-container" style="transform: scale(1) translate(0px, 0px); transform-origin: center center;">
        <div
          class="node"
          style="left: 100px; top: 100px; width: 100px; height: 40px;"
        >测试一</div>
        <div
          class="node"
          style="left: 250px; top: 50px; width: 100px; height: 40px;"
        >测试二</div>
        <div
          class="node"
          style="left: 250px; top: 150px; width: 100px; height: 40px;"
        >测试三</div>
      </div>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  name: 'SvgPage',
  data () {
    return {
      svgSelect: {},
      dx: 30,
      dy: 20,
      markerId: 'markerArrow'
    }
  },
  mounted () {
    this.svgSelect = d3.select('svg')
    this.drawMarker()
    this.drawPath({ x: 150, y: 100 }, { x: 200, y: 150 })
    this.drawPath({ x: 150, y: 100 }, { x: 200, y: 50 })
  },
  methods: {
    drawMarker () {
      this.svgSelect
        .append('defs')
        .append('marker')
        .attr('id', this.markerId)
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 15)
        .attr('refY', -1.5)
        .attr('markerWidth', 6)
        .attr('markerHeight', 6)
        .attr('orient', 'auto')
    },
    drawPath (source, target) {
      const { x: sourceX, y: sourceY } = source
      const { x: targetX, y: targetY } = target
      const { dx, dy } = this
      const path = d3.path()
      const cpx1 = sourceX + dx
      const cpy1 = sourceY - dy
      const cpx2 = targetX - dx
      const cpy2 = targetY + dy
      path.moveTo(sourceX, sourceY)
      path.bezierCurveTo(cpx1, cpy1, cpx2, cpy2, targetX, targetY)
      this.svgSelect.append('path')
        .attr('d', path.toString())
        .attr('marker-end', `url(#${this.markerId})`)
        .style('fill', 'none')
        .style('stroke', 'red')
        .style('stroke-width', '2')
    }
  }
}
</script>
<style lang="less">
  .data-view {
    height: 100vh;
  }
  .container {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid grey;

    .svg-container,
    .dom-container {
      position: relative;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
    }

    .dom-container {
      position: absolute;

      .node {
        cursor: pointer;
        position: absolute;
        border: 1px solid #E2E2E2;
        border-radius: 25%;
        transform: translate(-50%, -50%);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;
      }
    }
  }
</style>
