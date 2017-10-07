<script>
import BaseChart from './baseChart'
import {
  getChartConfig
} from './chartUtil'

var d3 = window.d3;
var techan = window.techan;

export default BaseChart.extend({
  name: 'ohlc-chart',
  methods: {

    renderChart() {
      let data = this.chartData
      let config = getChartConfig(this.dimension, this.margin, this.$el, 'ohlc')

      this.draw(config, data)
    },

    draw(svgSetup, data) {
      let svg = svgSetup.svg
      let x = svgSetup.x
      let y = svgSetup.y
      let ohlc = techan.plot.ohlc()
        .xScale(svgSetup.x)
        .yScale(svgSetup.y);
      let accessor = ohlc.accessor()
      data = data.sort(function(a, b) {
        return d3.ascending(accessor.d(a), accessor.d(b))
      })
      x.domain(data.map(ohlc.accessor().d));
      y.domain(techan.scale.plot.ohlc(data, ohlc.accessor()).domain());

      svg.selectAll('g.ohlc').datum(data).call(ohlc);
      svg.selectAll('g.x.axis').call(svgSetup.xAxis);
      svg.selectAll('g.y.axis').call(svgSetup.yAxis);
    }
  }
})
</script>

<style>
path.ohlc {
  stroke: #000000;
  stroke-width: 1;
}

path.ohlc.up {
  stroke: #00AA00;
}

path.ohlc.down {
  stroke: #FF0000;
}
</style>
