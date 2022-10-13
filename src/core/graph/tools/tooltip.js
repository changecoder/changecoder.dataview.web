import * as d3 from 'd3'

export const createTooltip = () => {
  const tooltip = d3.select('body')
    .append('div')
    .classed('tooltip', true)
    .style('opacity', 0)
    .style('display', 'none')

  tooltip.show = (textContent) => {
    tooltip.transition()
      .duration(400)
      .style('opacity', 0.9)
      .style('display', 'block')
    tooltip.html(textContent)
      .style('left', (d3.event.pageX + 15) + 'px')
      .style('top', (d3.event.pageY + 15) + 'px')
  }

  tooltip.hide = () => {
    tooltip.transition()
      .duration(400)
      .style('opacity', 0)
      .style('display', 'none')
  }

  return tooltip
}
