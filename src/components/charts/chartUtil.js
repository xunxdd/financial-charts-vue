let d3 = window.d3;
let techan = window.techan;
let tickDateTimeParser = d3.timeParse('%Y-%m-%dT%H:%M:%S.%L');

export function getChartConfig(dimension, margin, el, plotClass) {
  dimension = dimension || {
    width: 960,
    height: 500
  }
  let width = dimension.width - margin.left - margin.right
  let height = dimension.height - margin.top - margin.bottom

  let x = techan.scale.financetime()
    .range([0, width]);

  let y = d3.scaleLinear()
    .range([height, 0]);

  let xAxis = d3.axisBottom(x)
  let yAxis = d3.axisLeft(y)

  let svg = d3.select(el)
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
  svg.append('g')
    .attr('class', plotClass)

  svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + height + ')')

  svg.append('g')
    .attr('class', 'y axis')
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 6)
    .attr('dy', '.71em')
    .style('text-anchor', 'end')
    .text('Price ($)')

  return {
    x: x,
    y: y,
    xAxis: xAxis,
    yAxis: yAxis,
    svg: svg
  }
}

export function mapDataTickDateTime(data) {
  return {
    date: tickDateTimeParser(data.time),
    high: +data.ask,
    low: +data.bid,
    spread: (data.ask - data.bid) / 0.0001,
    volume: (data.ask - data.bid) / 0.0001,
    open: +data.ask,
    close: +data.bid
  };
}
