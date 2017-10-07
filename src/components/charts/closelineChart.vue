<script>
import BaseChart from './baseChart'
var d3 = window.d3;
var techan = window.techan;
import {
  getChartConfig
} from './chartUtil'

export default BaseChart.extend({
  name: 'closeline-chart',
  props: ['chartData', 'dimension', 'margin', 'title'],

  methods: {

    renderChart() {
      let data = this.chartData
      let svgSetup = getChartConfig(this.dimension, this.margin, this.$el, 'close')

      this.draw(svgSetup, data)
    },

    draw(svgSetup, data) {
      let x = svgSetup.x
      let y = svgSetup.y
      let svg = svgSetup.svg
      let close = techan.plot.close()
        .xScale(x)
        .yScale(y)

      let accessor = close.accessor()
      data = data.sort(function(a, b) {
        return d3.ascending(accessor.d(a), accessor.d(b))
      })
      x.domain(data.map(close.accessor().d))
      y.domain(techan.scale.plot.ohlc(data, close.accessor()).domain())

      svg.selectAll('g.close').datum(data).call(close)
      svg.selectAll('g.x.axis').call(svgSetup.xAxis)
      svg.selectAll('g.y.axis').call(svgSetup.yAxis)
    }
  }
})
</script>

<style>
path.line {
  fill: none;
  stroke: #000000;
  stroke-width: 1;
}
</style>
