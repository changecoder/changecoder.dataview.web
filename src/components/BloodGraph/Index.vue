<template>
  <div id="container"></div>
</template>
<script>
import G6 from '@antv/g6'
export default {
  name: 'BloodGraph',
  data () {
    return {
      graphData: {
        edges: [],
        collapseIcon: (x, y, r) => {
          return [
            ['M', x - r, y],
            ['a', r, r, 0, 1, 0, r * 2, 0],
            ['a', r, r, 0, 1, 0, -r * 2, 0],
            ['M', x - r + 4, y],
            ['L', x - r + 2 * r - 4, y]
          ]
        },
        expandIcon: (x, y, r) => {
          return [
            ['M', x - r, y],
            ['a', r, r, 0, 1, 0, r * 2, 0],
            ['a', r, r, 0, 1, 0, -r * 2, 0],
            ['M', x - r + 4, y],
            ['L', x - r + 2 * r - 4, y],
            ['M', x - r + r, y - r + 4],
            ['L', x, y + r - 4]
          ]
        },
        nodes: [
          { id: 'node1', x: 250, y: 200, comboId: 'combo1', type: 'moduleRect', value: 10 },
          { id: 'node2', x: 500, y: 200, comboId: 'combo2', type: 'moduleRect', value: 20 }
        ],
        combos: [
          { id: 'combo1', type: 'rootRect' },
          { id: 'combo2', type: 'appRect' }
        ]
      },
      graphInstance: {}
    }
  },
  mounted () {
    this.register()
    const el = document.getElementById('container')
    const width = el.scrollWidth
    const height = el.scrollHeight || 500
    this.createGraph(width, height)
    this.renderGraph()
    this.bindEvents()
  },
  methods: {
    register () {
      const { collapseIcon } = this
      G6.registerCombo(
        'rootRect',
        {
          drawShape: function drawShape (cfg, group) {
            const self = this
            cfg.padding = cfg.padding || [50, 20, 20, 20]
            const style = self.getShapeStyle(cfg)
            const rect = group.addShape('rect', {
              attrs: {
                ...style,
                x: -style.width / 2 - (cfg.padding[3] - cfg.padding[1]) / 2,
                y: -style.height / 2 - (cfg.padding[0] - cfg.padding[2]) / 2,
                width: style.width,
                height: style.height
              },
              name: 'combo-root'
            })
            return rect
          }
        },
        'rect'
      )

      G6.registerCombo(
        'appRect',
        {
          drawShape: function drawShape (cfg, group) {
            const self = this
            cfg.padding = cfg.padding || [50, 20, 20, 20]
            const style = self.getShapeStyle(cfg)
            const rect = group.addShape('rect', {
              attrs: {
                ...style,
                x: -style.width / 2 - (cfg.padding[3] - cfg.padding[1]) / 2,
                y: -style.height / 2 - (cfg.padding[0] - cfg.padding[2]) / 2,
                width: style.width,
                height: style.height
              },
              name: 'combo-app'
            })
            return rect
          }
        },
        'rect'
      )
      G6.registerNode(
        'moduleRect',
        {
          drawShape: function drawShape (cfg, group) {
            const self = this
            cfg.padding = cfg.padding || [50, 20, 20, 20]
            const style = self.getShapeStyle(cfg)
            const rect = group.addShape('rect', {
              attrs: {
                ...style,
                x: -style.width / 2 - (cfg.padding[3] - cfg.padding[1]) / 2,
                y: -style.height / 2 - (cfg.padding[0] - cfg.padding[2]) / 2,
                width: style.width,
                height: style.height
              }
            })

            group.addShape('marker', {
              attrs: {
                ...style,
                fill: '#fff',
                opacity: 1,
                // cfg.style.width and cfg.style.heigth correspond to the innerWidth and innerHeight in the figure of Illustration of Built-in Rect Combo
                x: style.width / 2 + cfg.padding[1],
                y: (cfg.padding[2] - cfg.padding[0]) / 2,
                r: 10,
                symbol: collapseIcon
              },
              name: 'collapse'
            })

            return rect
          }
        },
        'rect'
      )
    },
    createGraph (width, height) {
      this.graphInstance = new G6.Graph({
        container: 'container',
        width,
        height,
        fitCenter: true,
        groupByTypes: false,
        renderer: 'svg'
      })
    },
    renderGraph () {
      const { graphInstance: graph, graphData: data } = this
      graph.data(data)
      graph.render()
    },
    bindEvents () {
      const { graphInstance: graph } = this
      graph.on('node:click', (e) => {
        if (e.target.get('name') === 'collapse') {
          const { comboId } = e.item._cfg.model
          graph.collapseExpandCombo(comboId)
          if (graph.get('layout')) {
            graph.layout()
          } else {
            graph.refreshPositions()
          }
        }
      })
    }
  }
}
</script>
