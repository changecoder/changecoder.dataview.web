<template>
  <div id="container"></div>
</template>
<script>
import Graph from '@/core/graph/Graph'

export default {
  name: 'BloodGraph',
  data () {
    return {
      graphData: {
        edges: [],
        nodes: [
          { id: 'node1', x: 250, y: 200, width: 300, comboId: 'combo1', type: 'moduleRect', value: 10 },
          { id: 'node2', x: 270, y: 300, width: 300, comboId: 'combo2', type: 'moduleRect', value: 20 },
          { id: 'node3', x: 290, y: 400, width: 300, height: 80, comboId: 'combo3', type: 'moduleRect', value: 20 },
          { id: 'node4', x: 290, y: 500, width: 300, height: 80, comboId: 'combo3', type: 'moduleRect', value: 20 },
          { id: 'node5', x: 290, y: 600, width: 300, height: 80, comboId: 'combo3', type: 'moduleRect', value: 20 }
        ],
        combos: [
          { id: 'combo1', type: 'rootRect' },
          { id: 'combo2', type: 'appRect', parentId: 'combo1' },
          { id: 'combo3', type: 'entityRect', parentId: 'combo2' }
        ]
      },
      graphInstance: {}
    }
  },
  mounted () {
    const el = document.getElementById('container')
    const width = el.scrollWidth
    const height = el.scrollHeight || 800
    this.createGraph(width, height)
    this.register()
    this.renderGraph()
    this.bindEvents()
  },
  methods: {
    register () {
    },
    createGraph (width, height) {
      this.graphInstance = new Graph({
        container: '#container',
        width,
        height
      })
    },
    renderGraph () {
      const { graphInstance: graph, graphData: data } = this
      graph.data(data)
      graph.render()
    },
    bindEvents () {

    }
  }
}
</script>
