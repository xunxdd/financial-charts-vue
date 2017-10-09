<script>
import BaseChart from './baseChart'
var d3 = window.d3
var techan = window.techan

export default BaseChart.extend({
  name: 'crosshair-chart',
  methods: {
    renderChart() {
      let data = this.chartData
      let margin = this.margin
      let dimension = this.dimension || {
        width: 960,
        height: 500
      }
      let width = dimension.width - margin.left - margin.right
      let height = dimension.height - margin.top - margin.bottom
      let x = techan.scale.financetime()
        .range([0, width])
      let y = d3.scaleLinear()
        .range([height, 0])
      let candlestick = techan.plot.candlestick()
        .xScale(x)
        .yScale(y)
      let xAxis = d3.axisBottom(x)
      let xTopAxis = d3.axisTop(x)
      let yAxis = d3.axisLeft(y)
      let yRightAxis = d3.axisRight(y)
      let ohlcAnnotation = techan.plot.axisannotation()
        .axis(yAxis)
        .orient('left')
        .format(d3.format(',.2f'))
      let ohlcRightAnnotation = techan.plot.axisannotation()
        .axis(yRightAxis)
        .orient('right')
        .translate([width, 0])
      let timeAnnotation = techan.plot.axisannotation()
        .axis(xAxis)
        .orient('bottom')
        .format(d3.timeFormat('%Y-%m-%d'))
        .width(65)
        .translate([0, height])
      let timeTopAnnotation = techan.plot.axisannotation()
        .axis(xTopAxis)
        .orient('top')

      let crosshair = techan.plot.crosshair()
        .xScale(x)
        .yScale(y)
        .xAnnotation([timeAnnotation, timeTopAnnotation])
        .yAnnotation([ohlcAnnotation, ohlcRightAnnotation])

      let svg = d3.select(this.$el)
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

      let accessor = candlestick.accessor()
      data = data.sort(function(a, b) {
        return d3.ascending(accessor.d(a), accessor.d(b))
      })

      x.domain(data.map(accessor.d))
      y.domain(techan.scale.plot.ohlc(data, accessor).domain())
      svg.append('g')
        .datum(data)
        .attr('class', 'candlestick')
        .call(candlestick)
      svg.append('g')
        .attr('class', 'x axis')
        .call(xTopAxis)
      svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis)
      svg.append('g')
        .attr('class', 'y axis')
        .call(yAxis)
      svg.append('g')
        .attr('class', 'y axis')
        .attr('transform', 'translate(' + width + ',0)')
        .call(yRightAxis)
      svg.append('g')
        .attr('class', 'y annotation left')
        .datum([{
          value: 74
        }, {
          value: 67.5
        }, {
          value: 58
        }, {
          value: 40
        }]) // 74 should not be rendered
        .call(ohlcAnnotation)
      svg.append('g')
        .attr('class', 'x annotation bottom')
        .datum([{
          value: x.domain()[30]
        }])
        .call(timeAnnotation)
      svg.append('g')
        .attr('class', 'y annotation right')
        .datum([{
          value: 61
        }, {
          value: 52
        }])
        .call(ohlcRightAnnotation)
      svg.append('g')
        .attr('class', 'x annotation top')
        .datum([{
          value: x.domain()[80]
        }])
        .call(timeTopAnnotation)
      svg.append('g')
        .attr('class', 'crosshair')
        .datum({
          x: x.domain()[80],
          y: 67.5
        })
        .call(crosshair)
        .each(function(d) {
          console.log('move(d)')
        }) // Display the current data
      svg.append('text')
        .attr('x', 5)
        .attr('y', 15)
        .text(this.title)
    }
  }
})
</script>
