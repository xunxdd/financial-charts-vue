<script>
import BaseChart from './baseChart'
var d3 = window.d3;
var techan = window.techan;
import {
  getChartConfig
} from './chartUtil'

export default BaseChart.extend({
  name: 'heikinashi-chart',
  props: ['chartData', 'dimension', 'margin', 'title'],

  methods: {

    renderChart() {
      let data = this.chartData
      let svgSetup = getChartConfig(this.dimension, this.margin, this.$el, 'heikinashi')

      this.draw(svgSetup, data)
    },

    draw(svgSetup, data) {
      let svg = svgSetup.svg
      let xAxis = svgSetup.xAxis
      let yAxis = svgSetup.yAxis
      let x = svgSetup.x
      let y = svgSetup.y

      let heikinashi = techan.plot.heikinashi()
            .xScale(x)
            .yScale(y);
      let heikinashiIndicator = techan.indicator.heikinashi();

      data = data.sort(function(a, b) {
        return d3.ascending(heikinashi.accessor().d(a), heikinashi.accessor().d(b))
      })
      let heikinashiData = heikinashiIndicator(data);
      x.domain(data.map(heikinashi.accessor().d));
      y.domain(techan.scale.plot.ohlc(heikinashiData, heikinashi.accessor()).domain());

      svg.selectAll('g.heikinashi').datum(heikinashiData).call(heikinashi);
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
