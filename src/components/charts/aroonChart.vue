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
      let svgSetup = getChartConfig(this.dimension, this.margin, this.$el, 'aroon')

      this.draw(svgSetup, data)
    },

    draw(svgSetup, data) {
      let svg = svgSetup.svg
      let xAxis = svgSetup.xAxis
      let yAxis = svgSetup.yAxis
      let x = svgSetup.x
      let y = svgSetup.y

      let aroon = techan.plot.aroon()
            .xScale(x)
            .yScale(y);
      let accessor = aroon.accessor();
      data = data.sort(function(a, b) {
        return d3.ascending(accessor.d(a), accessor.d(b))
      })
      let aroonData = techan.indicator.aroon()(data);
      x.domain(aroonData.map(accessor.d));
      y.domain(techan.scale.plot.aroon().domain());

      svg.selectAll('g.aroon').datum(aroonData).call(aroon);
      svg.selectAll('g.x.axis').call(xAxis);
      svg.selectAll('g.y.axis').call(yAxis);
    }
  }
})
</script>

<style>
.aroon path {
  fill: none;
  stroke-width: 1;
}

.aroon {
  stroke: #000000;
}

.aroon.up {
  stroke: #00AA00;
  stroke-width: 1.5;
}

.aroon.down {
  stroke: #FF0000;
  stroke-width: 1.5;
}

.aroon.oscillator {
  stroke: #0000FF;
  stroke-width: 0.5;
}

.aroon.oscillatorArea {
  fill: #0000FF;
  opacity: 0.025;
}

.aroon path.overbought,
.aroon path.oversold {
  stroke: #FF9999;
  stroke-width: 1;
  stroke-dasharray: 2, 2;
}

.aroon path.middle,
path.zero {
  stroke: #BBBBBB;
  stroke-dasharray: 5, 5;
}
</style>
