<template>
  <div class='container' ref="container">
    <svg class='svg-container' ref="svgContainer" :style="initialTransformStyle"></svg>
    <div class="dom-container" ref="domContainer" :style="initialTransformStyle">
      <transition-group>
        <div
            class="node-slot"
            v-for="(node, index) of nodes"
            :data-id="node.data._key"
            @click="onNodeClick(index)"
            :key="node.data._key"
            :style="{
              left: formatDimension(
                direction === directionEnum.VERTICAL ? node.x : node.y
              ),
              top: formatDimension(
                direction === directionEnum.VERTICAL ? node.y : node.x
              ),
              width: formatDimension(config.nodeWidth),
              height: formatDimension(config.nodeHeight),
            }"
          >
            <slot
              name="node"
              v-bind:node="node.data"
            >
              <!-- 默认展示value字段 -->
              <span>{{ node.data.name }}</span>
            </slot>
          </div>
      </transition-group>
    </div>
  </div>
</template>
<script>
import TreeChart from './TreeChart'
import { formatDimension } from './utils'
import {
  DEFAULT_NODE_WIDTH,
  DEFAULT_NODE_HEIGHT,
  DEFAULT_LEVEL_HEIGHT,
  Direction,
  TreeLinkStyle
} from './constants'
export default {
  name: 'TreeGraph',
  props: {
    config: {
      type: Object,
      default: () => {
        return {
          nodeWidth: DEFAULT_NODE_WIDTH,
          nodeHeight: DEFAULT_NODE_HEIGHT,
          levelHeight: DEFAULT_LEVEL_HEIGHT
        }
      }
    },
    linkStyle: {
      type: String,
      default: TreeLinkStyle.CURVE
    },
    direction: {
      type: String,
      default: Direction.HORIZONTAL
    }
  },
  data () {
    return {
      dataset: {
        name: 'Lao Lao',
        title: 'general manager',
        children: [
          { name: 'Bo Miao', title: 'department manager' },
          {
            name: 'Su Miao',
            title: 'department manager',
            children: [
              { name: 'Tie Hua', title: 'senior engineer' },
              {
                name: 'Hei Hei',
                title: 'senior engineer',
                children: [
                  { name: 'Pang Pang', title: 'engineer' },
                  { name: 'Xiang Xiang', title: 'UE engineer' }
                ]
              }
            ]
          },
          { name: 'Hong Miao', title: 'department manager' }
        ]
      },
      directionEnum: Direction,
      formatDimension,
      nodes: [],
      edges: [],
      initialTransformStyle: {}
    }
  },
  mounted () {
    this.init()
    setTimeout(() => {
      this.treeChart.enableNodesDrag()
    })
  },
  methods: {
    init () {
      this.treeChart = new TreeChart({
        svgElement: this.$refs.svgContainer,
        domElement: this.$refs.domContainer,
        treeContainer: this.$refs.container,
        dataset: this.dataset,
        linkStyle: this.linkStyle,
        treeConfig: this.config,
        direction: this.direction
      })
      this.treeChart.init()
      this.nodes = this.treeChart.getNodes()
      this.initialTransformStyle = this.treeChart.getInitialTransformStyle()
    },
    onNodeClick (index) {
      this.treeChart.onNodeClick(index)
      this.nodes = this.treeChart.getNodes()
    }
  }
}
</script>
<style lang="less">
.container {
  .node {
    fill: grey !important;
  }

  .link {
    stroke-width: 2px !important;
    fill: transparent !important;
    stroke: #cecece !important;
  }
}
</style>
<style lang="less" scoped>
.node-slot {
  cursor: pointer;
  pointer-events: all;
  position: absolute;
  background-color: transparent;
  box-sizing: border-box;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: content-box;
  transition: all 0.2s;
  transition-timing-function: ease-in-out;
}
.container {
  position: relative;
  overflow: hidden;
  width: 800px;
  height: 800px;
  border: 1px solid grey;
  .svg-container {
    position: relative;
  }

  >svg,
  .dom-container {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    overflow: visible;
    transform-origin: 0 50%;
  }

  .dom-container {
    z-index: 1;
    pointer-events: none;
  }
}
</style>
