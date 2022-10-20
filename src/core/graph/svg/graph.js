import * as d3 from 'd3'

export const appendGraph = (dom, width, height) => {
  const svgContainer = d3.select(dom).append('svg')
    .attr('class', 'container')
    .attr('width', width)
    .attr('height', height)
  return svgContainer
}

export const appendGroup = (svg) => {
  const rootGroup = svg.append('g')
    .attr('class', 'root-group')
  rootGroup.append('g')
    .attr('class', 'node-group')
  rootGroup.append('g')
    .attr('class', 'combo-group')
  rootGroup.append('g')
    .attr('class', 'edge-group')
  rootGroup.append('g')
    .attr('class', 'high-light-group')
  return rootGroup
}
