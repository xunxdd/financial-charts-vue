<script>
import BaseChart from './baseChart'
var d3 = window.d3;
var techan = window.techan;
import {
  getChartConfig
} from './chartUtil'

export default BaseChart.extend({
  name: 'atr-chart',
  props: ['chartData', 'dimension', 'margin', 'title'],

  methods: {

    renderChart() {
      let data = this.chartData
      let svgSetup = getChartConfig(this.dimension, this.margin, this.$el, 'atr')

      this.draw(svgSetup, data)
    },

    draw(svgSetup, data) {
      let svg = svgSetup.svg
      let xAxis = svgSetup.xAxis
      let yAxis = svgSetup.yAxis
      let x = svgSetup.x
      let y = svgSetup.y

      let atr = techan.plot.atr()
        .xScale(x)
        .yScale(y);
      data = data.sort(function(a, b) {
        return d3.ascending(atr.accessor().d(a), atr.accessor().d(b))
      })
      let atrData = techan.indicator.atr()(data);
      x.domain(atrData.map(atr.accessor().d));
      y.domain(techan.scale.plot.atr(atrData).domain());

      svg.selectAll('g.atr').datum(atrData).call(atr);
      svg.selectAll('g.x.axis').call(xAxis);
      svg.selectAll('g.y.axis').call(yAxis);
    }
  }
})
</script>

<style>
.atr path {
       fill: none;
       stroke-width: 1;
       stroke: #000000;
   }
</style>
