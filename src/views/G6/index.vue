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
      // 点集
      nodes: [
        {
          id: 'node1',
          x: 100,
          y: 200
        },
        {
          id: 'node2',
          x: 300,
          y: 200
        }
      ],
      // 边集
      edges: [
        // 表示一条从 node1 节点连接到 node2 节点的边
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
      height: 500
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
