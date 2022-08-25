import * as d3 from 'd3'
import { cloneDeep } from 'lodash'

const DEFAULT_NODE_WIDTH = 100
const DEFAULT_NODE_HEIGHT = 100
const DEFAULT_LEVEL_HEIGHT = 200
const ANIMATION_DURATION = 800

const TreeLinkStyle = {
  CURVE: 'curve',
  STRAIGHT: 'straight'
}

const Direction = {
  VERTICAL: 'vertical',
  HORIZONTAL: 'horizontal'
}

const rotatePoint = ({ x, y }) => {
  return {
    x: y,
    y: x
  }
}

export default class SimilarTreeGraph {
  treeConfig = {
    nodeWidth: DEFAULT_NODE_WIDTH,
    nodeHeight: DEFAULT_NODE_HEIGHT,
    levelHeight: DEFAULT_LEVEL_HEIGHT
  }

  linkStyle = TreeLinkStyle.CURVE
  collapseEnabled = true
  edges = []
  nodes = []

  constructor (params) {
    const { treeConfig, dataset, container } = params
    Object.assign(this.treeConfig, treeConfig || {})
    this.dataset = this.updatedInternalData(dataset)
    this.svgSelection = d3.select(`#${container}`)
  }

  init () {
    this.draw()
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
    if (!externalData) {
      return data
    }
    if (Array.isArray(externalData)) {
      for (let i = externalData.length - 1; i >= 0; i--) {
        data.children.push(cloneDeep(externalData[i]))
      }
    } else {
      data.children.push(cloneDeep(externalData))
    }
    return data
  }

  updateDataList () {
    let [nodeDataList, linkDataList] = this.buildTree()
    nodeDataList.splice(0, 1)
    linkDataList = linkDataList.filter(
      (x) => x.source.data.name !== '__invisible_root'
    )
    this.edges = linkDataList
    this.nodes = nodeDataList
  }

  draw () {
    this.updateDataList()

    const identifier = this.dataset.identifier
    const specialLinks = this.dataset.links
    if (specialLinks && identifier) {
      for (const link of specialLinks) {
        let parent
        let children
        if (identifier === 'value') {
          parent = this.nodes.find((d) => {
            return d[identifier] === link.parent
          })
          children = this.nodes.filter((d) => {
            return d[identifier] === link.child
          })
        } else {
          parent = this.nodes.find((d) => {
            return d.data[identifier] === link.parent
          })
          children = this.nodes.filter((d) => {
            return d.data[identifier] === link.child
          })
        }
        if (parent && children) {
          for (const child of children) {
            const newLink = {
              source: parent,
              target: child
            }
            this.edges.push(newLink)
          }
        }
      }
    }

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

  isVertical () {
    return this.direction === Direction.VERTICAL
  }
}
