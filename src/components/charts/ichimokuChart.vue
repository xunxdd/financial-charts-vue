<script>
import BaseChart from './baseChart'
var d3 = window.d3;
var techan = window.techan;
import {
  getChartConfig
} from './chartUtil'

export default BaseChart.extend({
  name: 'ichimoku-chart',
  props: ['chartData', 'dimension', 'margin', 'title'],

  methods: {

    renderChart() {
      let data = this.chartData
      let svgSetup = getChartConfig(this.dimension, this.margin, this.$el, 'ichimoku')

      this.draw(svgSetup, data)
    },

    draw(svgSetup, data) {
      let svg = svgSetup.svg
      let xAxis = svgSetup.xAxis
      let yAxis = svgSetup.yAxis
      let x = svgSetup.x
      let y = svgSetup.y
      svg.append('g')
        .attr('class', 'candlestick')
        .attr('clip-path', 'url(#clip)');

      let candlestick = techan.plot.candlestick()
        .xScale(x)
        .yScale(y);

      let ichimoku = techan.plot.ichimoku()
        .xScale(x)
        .yScale(y);
      data = data.sort(function(a, b) {
        return d3.ascending(candlestick.accessor().d(a), candlestick.accessor().d(b))
      })

      let ichimokuIndicator = techan.indicator.ichimoku();
      // Don't show where indicators don't have data
      let indicatorPreRoll = ichimokuIndicator.kijunSen() + ichimokuIndicator.senkouSpanB();

      var ichimokuData = ichimokuIndicator(data);
      x.domain(data.map(ichimokuIndicator.accessor().d));
      // Calculate the y domain for visible data points (ensure to include Kijun Sen additional data offset)
      y.domain(techan.scale.plot.ichimoku(ichimokuData.slice(indicatorPreRoll - ichimokuIndicator.kijunSen())).domain());

      // Logic to ensure that at least +KijunSen displacement is applied to display cloud plotted ahead of ohlc
      x.zoomable().clamp(false).domain([indicatorPreRoll, data.length + ichimokuIndicator.kijunSen()]);

      svg.selectAll('g.candlestick').datum(data).call(candlestick);
      svg.selectAll('g.ichimoku').datum(ichimokuData).call(ichimoku);
      svg.selectAll('g.x.axis').call(xAxis);
      svg.selectAll('g.y.axis').call(yAxis);
    }
  }
})
</script>

<style>
.ichimoku path {
  fill: none;
  stroke-width: 0.8;
}

.ichimoku path {
  stroke: #000000;
}

.ichimoku path.chikouspan {
  stroke: #BF5FFF;
}

.ichimoku path.tenkansen {
  stroke: #0033FF;
}

.ichimoku path.kijunsen {
  stroke: #FBB117;
}

.ichimoku path.kumo {
  opacity: 0.1;
}

.ichimoku path.kumo.up {
  fill: #00AA00;
}

.ichimoku path.kumo.down {
  fill: #FF0000;
}

.ichimoku path.senkouspana {
  stroke: #006600;
}

.ichimoku path.senkouspanb {
  stroke: #FF0000;
}
</style>
