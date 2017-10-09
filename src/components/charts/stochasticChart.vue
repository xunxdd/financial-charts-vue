<script>
import BaseChart from './baseChart'
var d3 = window.d3;
var techan = window.techan;
import {
  getChartConfig
} from './chartUtil'

export default BaseChart.extend({
  name: 'stochastic-chart',
  props: ['chartData', 'dimension', 'margin', 'title'],

  methods: {

    renderChart() {
      let data = this.chartData
      let svgSetup = getChartConfig(this.dimension, this.margin, this.$el, 'stochastic')

      this.draw(svgSetup, data)
    },

    draw(svgSetup, data) {
      let svg = svgSetup.svg
      let xAxis = svgSetup.xAxis
      let yAxis = svgSetup.yAxis
      let x = svgSetup.x
      let y = svgSetup.y

      let stochastic = techan.plot.stochastic()
        .xScale(x)
        .yScale(y);
      let accessor = stochastic.accessor();
      data = data.sort(function(a, b) {
        return d3.ascending(accessor.d(a), accessor.d(b))
      })
      let stochasticData = techan.indicator.stochastic()(data);
      x.domain(stochasticData.map(stochastic.accessor().d));
      y.domain(techan.scale.plot.stochastic().domain());

      svg.selectAll('g.stochastic').datum(stochasticData).call(stochastic);
      svg.selectAll('g.x.axis').call(xAxis);
      svg.selectAll('g.y.axis').call(yAxis);
    }
  }
})
</script>

<style>
.stochastic path {
  fill: none;
  stroke-width: 1;
}

.stochastic.up {
  stroke: #00AA00;
}

.stochastic.down {
  stroke: #FF0000;
}

.stochastic path.overbought,
.stochastic path.oversold {
  stroke: #FF9999;
  stroke-dasharray: 5, 5;
}
</style>
