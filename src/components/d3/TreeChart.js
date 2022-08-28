import * as d3 from 'd3'
import {
  DEFAULT_NODE_WIDTH,
  DEFAULT_NODE_HEIGHT,
  DEFAULT_LEVEL_HEIGHT,
  ANIMATION_DURATION,
  DEFAULT_HEIGHT_DECREMENT,
  MATCH_TRANSLATE_REGEX,
  TreeLinkStyle,
  Direction
} from './constants'
import {
  deepCopy,
  rotatePoint
} from './utils'

export default class TreeChart {
  treeConfig = {
    nodeWidth: DEFAULT_NODE_WIDTH,
    nodeHeight: DEFAULT_NODE_HEIGHT,
    levelHeight: DEFAULT_LEVEL_HEIGHT
  }

  edges = []
  nodes = []

  collapseEnabled = true

  currentScale = 1
  constructor (params) {
    const {
      treeConfig,
      direction,
      dataset,
      linkStyle,
      domElement,
      svgElement,
      treeContainer,
      collapseEnabled
    } = params
    this.svgElement = svgElement
    this.domElement = domElement
    this.treeContainer = treeContainer
    this.collapseEnabled = collapseEnabled === undefined ? true : collapseEnabled
    Object.assign(this.treeConfig, treeConfig || {})
    this.direction = direction || Direction.VERTICAL
    this.dataset = this.updatedInternalData(dataset)
    this.linkStyle = linkStyle || TreeLinkStyle.CURVE
  }

  init () {
    this.draw()
    // this.enableZoom()
    // this.enableContainerDrag()
    this.initTransform()
  }

  draw () {
    this.updateDataList()
    this.drawEdges()
  }

  enableContainerDrag () {
    let startX = 0
    let startY = 0
    let isDrag = false
    // 保存鼠标点下时的位移
    let mouseDownTransform = ''
    this.treeContainer.onmousedown = (event) => {
      mouseDownTransform = this.svgElement.style.transform
      startX = event.clientX
      startY = event.clientY
      isDrag = true
    }
    this.treeContainer.onmousemove = (event) => {
      if (!isDrag) return
      const originTransform = mouseDownTransform
      let originOffsetX = 0
      let originOffsetY = 0
      if (originTransform) {
        const result = originTransform.match(MATCH_TRANSLATE_REGEX)
        if (result !== null && result.length !== 0) {
          const [offsetX, offsetY] = result.slice(1)
          originOffsetX = parseInt(offsetX)
          originOffsetY = parseInt(offsetY)
        }
      }
      const newX =
        Math.floor((event.clientX - startX) / this.currentScale) +
        originOffsetX
      const newY =
        Math.floor((event.clientY - startY) / this.currentScale) +
        originOffsetY
      let transformStr = `translate(${newX}px, ${newY}px)`
      if (originTransform) {
        transformStr = originTransform.replace(
          MATCH_TRANSLATE_REGEX,
          transformStr
        )
      }
      this.svgElement.style.transform = transformStr
      this.domElement.style.transform = transformStr
    }

    this.treeContainer.onmouseup = () => {
      startX = 0
      startY = 0
      isDrag = false
    }
  }

  enableZoom () {
    const zoom = d3.zoom().scaleExtent([0.1, 10])
      .on('zoom', (e) => {
        const { k } = e.transform
        this.setScale(k)
      })
    d3.select(this.treeContainer).call(zoom)
  }

  enableNodesDrag () {
    const { nodes } = this
    const drag = d3.drag().on('drag', function (e) {
      const { x, y } = e
      const key = this.getAttribute('data-id')
      const index = nodes.findIndex(({ data }) => data._key === key)
      Object.assign(nodes[index], { x, y })
    })
    d3.selectAll('.node-slot').call(drag)
  }

  restoreScale () {
    this.setScale(1)
  }

  setScale (scaleNum) {
    if (typeof scaleNum !== 'number') return
    const pos = this.getTranslate()
    const translateString = `translate(${pos[0]}px, ${pos[1]}px)`
    this.svgElement.style.transform = `scale(${scaleNum}) ` + translateString
    this.domElement.style.transform =
      `scale(${scaleNum}) ` + translateString
    this.currentScale = scaleNum
  }

  getTranslate () {
    const string = this.svgElement.style.transform
    const match = string.match(MATCH_TRANSLATE_REGEX)
    if (match === null) {
      return [null, null]
    }
    const x = parseInt(match[1])
    const y = parseInt(match[2])
    return [x, y]
  }

  initTransform () {
    const containerWidth = this.domElement.offsetWidth
    const containerHeight = this.domElement.offsetHeight
    if (this.isVertical()) {
      this.initTransformX = Math.floor(containerWidth / 2)
      this.initTransformY = Math.floor(
        this.treeConfig.nodeHeight - DEFAULT_HEIGHT_DECREMENT
      )
    } else {
      this.initTransformX = Math.floor(
        this.treeConfig.nodeWidth - DEFAULT_HEIGHT_DECREMENT
      )
      this.initTransformY = Math.floor(containerHeight / 2)
    }
  }

  updateDataList () {
    let [nodes, edges] = this.buildTree()
    nodes.splice(0, 1)
    edges = edges.filter(
      (x) => x.source.data.name !== '__invisible_root'
    )
    this.nodes = nodes
    this.edges = edges
  }

  drawEdges () {
    this.svgSelection = d3.select(this.svgElement)
    const links = this.svgSelection
      .selectAll('.link')
      .data(this.edges, (d) => {
        return `${d.source.data._key}-${d.target.data._key}`
      })
    links
      .enter()
      .append('path')
      .style('opacity', 0)
      .transition()
      .duration(ANIMATION_DURATION)
      .ease(d3.easeCubicInOut)
      .style('opacity', 1)
      .attr('class', 'link')
      .attr('d', (d) => {
        return this.generateLinkPath(d)
      })
    links
      .transition()
      .duration(ANIMATION_DURATION)
      .ease(d3.easeCubicInOut)
      .attr('d', (d) => {
        return this.generateLinkPath(d)
      })
    links
      .exit()
      .transition()
      .duration(ANIMATION_DURATION / 2)
      .ease(d3.easeCubicInOut)
      .style('opacity', 0)
      .remove()
  }

  generateLinkPath (d) {
    if (this.linkStyle === TreeLinkStyle.CURVE) {
      return this.generateCurceLinkPath(d)
    }
    if (this.linkStyle === TreeLinkStyle.STRAIGHT) {
      return this.generateStraightLinkPath(d)
    }
  }

  generateCurceLinkPath (d) {
    const linkPath = this.isVertical()
      ? d3.linkVertical()
      : d3.linkHorizontal()
    linkPath
      .x(function (d) {
        return d.x
      })
      .y(function (d) {
        return d.y
      })
      .source((d) => {
        const sourcePoint = {
          x: d.source.x,
          y: d.source.y
        }
        return this.direction === Direction.VERTICAL
          ? sourcePoint
          : rotatePoint(sourcePoint)
      })
      .target((d) => {
        const targetPoint = {
          x: d.target.x,
          y: d.target.y
        }
        return this.direction === Direction.VERTICAL
          ? targetPoint
          : rotatePoint(targetPoint)
      })
    return linkPath(d)
  }

  generateStraightLinkPath (d) {
    const linkPath = d3.path()
    let sourcePoint = { x: d.source.x, y: d.source.y }
    let targetPoint = { x: d.target.x, y: d.target.y }
    if (!this.isVertical()) {
      sourcePoint = rotatePoint(sourcePoint)
      targetPoint = rotatePoint(targetPoint)
    }
    const xOffset = targetPoint.x - sourcePoint.x
    const yOffset = targetPoint.y - sourcePoint.y
    const secondPoint = this.isVertical()
      ? { x: sourcePoint.x, y: sourcePoint.y + yOffset / 2 }
      : { x: sourcePoint.x + xOffset / 2, y: sourcePoint.y }
    const thirdPoint = this.isVertical()
      ? { x: targetPoint.x, y: sourcePoint.y + yOffset / 2 }
      : { x: sourcePoint.x + xOffset / 2, y: targetPoint.y }
    linkPath.moveTo(sourcePoint.x, sourcePoint.y)
    linkPath.lineTo(secondPoint.x, secondPoint.y)
    linkPath.lineTo(thirdPoint.x, thirdPoint.y)
    linkPath.lineTo(targetPoint.x, targetPoint.y)
    return linkPath.toString()
  }

  buildTree () {
    const treeBuilder = d3
      .tree()
      .nodeSize([this.treeConfig.nodeWidth, this.treeConfig.levelHeight])
    const tree = treeBuilder(d3.hierarchy(this.dataset))
    return [tree.descendants(), tree.links()]
  }

  updatedInternalData (externalData) {
    const data = { name: '__invisible_root', children: [] }
    if (!externalData) return data
    if (Array.isArray(externalData)) {
      for (let i = externalData.length - 1; i >= 0; i--) {
        data.children.push(deepCopy(externalData[i]))
      }
    } else {
      data.children.push(deepCopy(externalData))
    }
    return data
  }

  isVertical () {
    return this.direction === Direction.VERTICAL
  }

  getInitialTransformStyle () {
    return {
      transform: `scale(1) translate(${this.initTransformX}px, ${this.initTransformY}px)`,
      transformOrigin: 'center'
    }
  }

  getNodes () {
    return this.nodes
  }

  onNodeClick (index) {
    if (this.collapseEnabled) {
      const curNode = this.nodes[index]
      if (curNode.data.children) {
        curNode.data._children = curNode.data.children
        curNode.data.children = null
        curNode.data._collapsed = true
      } else {
        curNode.data.children = curNode.data._children
        curNode.data._children = null
        curNode.data._collapsed = false
      }
      this.draw()
    }
  }
}
