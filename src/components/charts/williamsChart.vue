<script>
import BaseChart from './baseChart'
var d3 = window.d3;
var techan = window.techan;
import {
  getChartConfig
} from './chartUtil'

export default BaseChart.extend({
  name: 'williams-chart',
  props: ['chartData', 'dimension', 'margin', 'title'],

  methods: {

    renderChart() {
      let data = this.chartData
      let svgSetup = getChartConfig(this.dimension, this.margin, this.$el, 'williams')

      this.draw(svgSetup, data)
    },

    draw(svgSetup, data) {
      let svg = svgSetup.svg
      let xAxis = svgSetup.xAxis
      let yAxis = svgSetup.yAxis
      let x = svgSetup.x
      let y = svgSetup.y

      let williams = techan.plot.williams()
        .xScale(x)
        .yScale(y)
      let accessor = williams.accessor();
      data = data.sort(function(a, b) {
        return d3.ascending(accessor.d(a), accessor.d(b))
      })
      let williamsData = techan.indicator.williams()(data);
      x.domain(williamsData.map(williams.accessor().d));
      y.domain(techan.scale.plot.williams().domain());

      svg.selectAll('g.williams').datum(williamsData).call(williams);
      svg.selectAll('g.x.axis').call(xAxis);
      svg.selectAll('g.y.axis').call(yAxis);
    }
  }
})
</script>

<style>
.williams path {
  fill: none;
  stroke-width: 1;
}

.williams.up {
  stroke: #006600;
  stroke-width: 1.5;
}
</style>
