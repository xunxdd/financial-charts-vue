<script>
import BaseChart from './baseChart'
var d3 = window.d3;
var techan = window.techan;
import {
  getChartConfig
} from './chartUtil'

export default BaseChart.extend({
  name: 'macd-chart',
  props: ['chartData', 'dimension', 'margin', 'title'],

  methods: {

    renderChart() {
      let data = this.chartData
      let svgSetup = getChartConfig(this.dimension, this.margin, this.$el, 'macd')

      this.draw(svgSetup, data)
    },

    draw(svgSetup, data) {
      let svg = svgSetup.svg
      let xAxis = svgSetup.xAxis
      let yAxis = svgSetup.yAxis
      let x = svgSetup.x
      let y = svgSetup.y

      let macd = techan.plot.macd()
        .xScale(x)
        .yScale(y);
      let accessor = macd.accessor();

      data = data.sort(function(a, b) {
        return d3.ascending(accessor.d(a), accessor.d(b))
      })
      let macdData = techan.indicator.macd()(data);
      x.domain(macdData.map(macd.accessor().d));
      y.domain(techan.scale.plot.macd(macdData).domain());

      svg.selectAll('g.macd').datum(macdData).call(macd);
      svg.selectAll('g.x.axis').call(xAxis);
      svg.selectAll('g.y.axis').call(yAxis);
    }
  }
})
</script>

<style>
path {
  fill: none;
  stroke-width: 1;
}

path.macd {
  stroke: #0000AA;
}

path.signal {
  stroke: #FF9999;
}

path.zero {
  stroke: #BBBBBB;
  stroke-dasharray: 0;
  stroke-opacity: 0.5;
}

path.difference {
  fill: #BBBBBB;
  opacity: 0.5;
}
</style>
