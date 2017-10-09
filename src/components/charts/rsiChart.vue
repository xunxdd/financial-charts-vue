<script>
import BaseChart from './baseChart'
var d3 = window.d3;
var techan = window.techan;
import {
  getChartConfig
} from './chartUtil'

export default BaseChart.extend({
  name: 'rsi-chart',
  props: ['chartData', 'dimension', 'margin', 'title'],

  methods: {

    renderChart() {
      let data = this.chartData
      let svgSetup = getChartConfig(this.dimension, this.margin, this.$el, 'rsi')

      this.draw(svgSetup, data)
    },

    draw(svgSetup, data) {
      let svg = svgSetup.svg
      let xAxis = svgSetup.xAxis
      let yAxis = svgSetup.yAxis
      let x = svgSetup.x
      let y = svgSetup.y

      let rsi = techan.plot.rsi()
        .xScale(x)
        .yScale(y);
      let accessor = rsi.accessor();
      data = data.sort(function(a, b) {
        return d3.ascending(accessor.d(a), accessor.d(b))
      })
      var rsiData = techan.indicator.rsi()(data);
      x.domain(rsiData.map(rsi.accessor().d));
      y.domain(techan.scale.plot.rsi(rsiData).domain());

      svg.selectAll('g.rsi').datum(rsiData).call(rsi);
      svg.selectAll('g.x.axis').call(xAxis);
      svg.selectAll('g.y.axis').call(yAxis);
    }
  }
})
</script>

<style>
.rsi path {
  fill: none;
  stroke-width: 1;
}

.rsi {
  stroke: #000000;
}

.rsi path.overbought,
.rsi path.oversold {
  stroke: #FF9999;
  stroke-dasharray: 5, 5;
}

.rsi path.middle,
path.zero {
  stroke: #BBBBBB;
  stroke-dasharray: 5, 5;
}
</style>
