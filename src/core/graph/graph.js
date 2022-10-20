import AbstractGraph from '@/core/graph/AbstractGraph'

import { appendGraph, appendGroup } from '@/core/graph/svg/graph'

export default class Graph extends AbstractGraph {
  constructor (cfg) {
    super()
    this.cfg = Object.assign({}, this.getDefaultCfg(), cfg)
    this.init()
  }

  initCanvas = () => {
    const container = this.get('container')
    const canvas = appendGraph(container)
    this.set('canvas', canvas)
  }

  initGroups = () => {
    const canvas = this.get('canvas')
    const height = this.get('height')
    const width = this.get('height')
    const group = appendGroup(canvas, width, height)
    this.set('group', group)
  }

  data = (data) => {
    this.set('data', data)
  }

  render = () => {
    const data = this.get('data')

    const { nodes = [], edges = [], combos = [] } = data

    this.clear()

    this.addItems(nodes.map(node => ({ type: 'node', model: node })))

    this.addCombos(combos)

    this.addItems(edges.map(edge => ({ type: 'edge', model: edge })))

    // layout
    const layoutController = this.get('layoutController')

    layoutController?.layout()
  }

  initEventController = () => {

  }

  initLayoutController = () => {

  }
}
