<template>
  <div class="data-view">
    <div id="container"></div>
  </div>
</template>

<script>
import G6 from '@antv/g6'

export default {
  name: 'G6Page',
  data () {
    return {
      nodes: [
        {
          id: 'node1',
          label: 'Circle1',
          x: 150,
          y: 150
        },
        {
          id: 'node2',
          label: 'Circle2',
          x: 400,
          y: 150
        }
      ],
      edges: [
        {
          source: 'node1',
          target: 'node2'
        }
      ]
    }
  },

  mounted () {
    const graph = new G6.Graph({
      container: 'container',
      width: 500,
      height: 500,
      defaultNode: {
        type: 'circle',
        size: [100],
        color: '#5B8FF9',
        style: {
          fill: '#9EC9FF',
          lineWidth: 3
        },
        labelCfg: {
          style: {
            fill: '#fff',
            fontSize: 20
          }
        }
      },
      defaultEdge: {
        style: {
          stroke: '#e2e2e2'
        }
      }
    })
    const data = {
      nodes: this.nodes,
      edges: this.edges
    }
    graph.data(data)
    graph.render()
  }
}
</script>

<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
