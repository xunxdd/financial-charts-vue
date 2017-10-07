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
      let svgSetup = getChartConfig(this.dimension, this.margin, this.$el, 'adx')

      this.draw(svgSetup, data)
    },

    draw(svgSetup, data) {
      let svg = svgSetup.svg
      let xAxis = svgSetup.xAxis
      let yAxis = svgSetup.yAxis
      let x = svgSetup.x
      let y = svgSetup.y

      let adx = techan.plot.adx()
        .xScale(x)
        .yScale(y);
      data = data.sort(function(a, b) {
        return d3.ascending(adx.accessor().d(a), adx.accessor().d(b))
      })
      let adxData = techan.indicator.adx()(data);
      x.domain(adxData.map(adx.accessor().d));
      y.domain(techan.scale.plot.adx(adxData).domain());

      svg.selectAll('g.adx').datum(adxData).call(adx);
      svg.selectAll('g.x.axis').call(xAxis);
      svg.selectAll('g.y.axis').call(yAxis);
    }
  }
})
</script>

<style>
.adx path {
  fill: none;
  stroke-width: 1;
}

.adx {
  stroke: #000000;
}

.adx path.adx {
  stroke: #000000;
}

.adx path.plusDi {
  stroke: #00ff00;
}

.adx path.minusDi {
  stroke: #ff0000;
}
</style>
