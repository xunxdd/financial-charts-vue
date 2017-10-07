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
      let svgSetup = getChartConfig(this.dimension, this.margin, this.$el, 'atrtrailingstop')

      this.draw(svgSetup, data)
    },

    draw(svgSetup, data) {
      let x = svgSetup.x
      let y = svgSetup.y
      let svg = svgSetup.svg
      svg.append('g')
                .attr('class', 'candlestick')
                .attr('clip-path', 'url(#clip)');
      let candlestick = techan.plot.candlestick()
                 .xScale(x)
                 .yScale(y);
      let accessor = candlestick.accessor();
      let atrtrailingstop = techan.plot.atrtrailingstop()
                    .xScale(x)
                    .yScale(y);
      data = data.sort(function(a, b) {
        return d3.ascending(accessor.d(a), accessor.d(b))
      })
      let atrtrailingstopData = techan.indicator.atrtrailingstop()(data);
      x.domain(data.map(accessor.d))
      y.domain(techan.scale.plot.atrtrailingstop(atrtrailingstopData).domain());

      svg.selectAll('g.candlestick').datum(data).call(candlestick);
      svg.selectAll('g.atrtrailingstop').datum(atrtrailingstopData).call(atrtrailingstop);
      svg.selectAll('g.x.axis').call(svgSetup.xAxis);
      svg.selectAll('g.y.axis').call(svgSetup.yAxis);
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
