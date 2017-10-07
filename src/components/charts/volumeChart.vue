<script>
import BaseChart from './baseChart'
import {
  getChartConfig
} from './chartUtil'

var d3 = window.d3;
var techan = window.techan;

export default BaseChart.extend({
  name: 'volume-chart',
  methods: {

    renderChart() {
      let data = this.chartData
      let config = getChartConfig(this.dimension, this.margin, this.$el, 'volume')

      this.draw(config, data)
    },

    draw(svgSetup, data) {
      let svg = svgSetup.svg
      let x = svgSetup.x
      let y = svgSetup.y
      var volume = techan.plot.volume()
        .accessor(techan.accessor.ohlc()) // For volume bar highlighting
        .xScale(x)
        .yScale(y);
      let accessor = volume.accessor()
      data = data.sort(function(a, b) {
        return d3.ascending(accessor.d(a), accessor.d(b))
      })
      x.domain(data.map(accessor.d));
      y.domain(techan.scale.plot.volume(data, accessor.v).domain());

      svg.selectAll('g.volume').datum(data).call(volume);
      svg.selectAll('g.x.axis').call(svgSetup.xAxis);
      svg.selectAll('g.y.axis').call(svgSetup.yAxis);
    }
  }
})
</script>

<style>
path.volume {
  fill: #AAAAAA;
  opacity: 0.5;
}

path.volume.up {
  fill: #00AA00;
}

path.volume.down {
  fill: #FF0000;
}
</style>
