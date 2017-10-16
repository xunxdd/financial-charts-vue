<template>
<svg></svg>
</template>

<script>
import BaseChart from './baseChart'
import PlotsUtil from './plotsUtil'

var d3 = window.d3;
var techan = window.techan;

export default {
  name: 'all-plot-chart',
  props: ['chartData', 'dimension', 'title'],

  methods: {

    setUp(dimension, el) {
      var dim = dimension;
      dim.plot = {
        width: dim.width - dim.margin.left - dim.margin.right,
        height: dim.height - dim.margin.top - dim.margin.bottom
      };
      dim.indicator.top = dim.ohlc.height + dim.indicator.padding;
      dim.indicator.bottom = dim.indicator.top + dim.indicator.height + dim.indicator.padding;

      var indicatorTop = d3.scaleLinear()
        .range([dim.indicator.top, dim.indicator.bottom]);

      var x = techan.scale.financetime()
        .range([0, dim.plot.width]);

      var y = d3.scaleLinear()
        .range([dim.ohlc.height, 0]);

      this.yPercent = y.copy(); // Same as y at this stage, will get a different domain later

      this.yVolume = d3.scaleLinear()
        .range([y(0), y(0.2)]);

      this.candlestick = techan.plot.candlestick()
        .xScale(x)
        .yScale(y);

      this.tradearrow = techan.plot.tradearrow()
        .xScale(x)
        .yScale(y)
        .y(function(d) {
          // Display the buy and sell arrows a bit above and below the price, so the price is still visible
          if (d.type === 'buy') return y(d.low) + 5;
          if (d.type === 'sell') return y(d.high) - 5;
          else return y(d.price);
        });

      this.sma0 = techan.plot.sma()
        .xScale(x)
        .yScale(y);

      this.sma1 = techan.plot.sma()
        .xScale(x)
        .yScale(y);

      this.ema2 = techan.plot.ema()
        .xScale(x)
        .yScale(y);

      this.volume = techan.plot.volume()
        .accessor(this.candlestick.accessor()) // Set the accessor to a ohlc accessor so we get highlighted bars
        .xScale(x)
        .yScale(this.yVolume);

      this.trendline = techan.plot.trendline()
        .xScale(x)
        .yScale(y);

      this.supstance = techan.plot.supstance()
        .xScale(x)
        .yScale(y);

      var xAxis = this.xAxis = d3.axisBottom(x);

      this.timeAnnotation = techan.plot.axisannotation()
        .axis(xAxis)
        .orient('bottom')
        .format(d3.timeFormat('%Y-%m-%d'))
        .width(65)
        .translate([0, dim.plot.height]);

      var yAxis = this.yAxis = d3.axisRight(y);

      this.ohlcAnnotation = techan.plot.axisannotation()
        .axis(yAxis)
        .orient('right')
        .format(d3.format(',.2f'))
        .translate([x(1), 0]);

      this.closeAnnotation = techan.plot.axisannotation()
        .axis(yAxis)
        .orient('right')
        .accessor(this.candlestick.accessor())
        .format(d3.format(',.2f'))
        .translate([x(1), 0]);

      this.percentAxis = d3.axisLeft(this.yPercent)
        .tickFormat(d3.format('+.1%'));

      this.percentAnnotation = techan.plot.axisannotation()
        .axis(this.percentAxis)
        .orient('left');

      this.volumeAxis = d3.axisRight(this.yVolume)
        .ticks(3)
        .tickFormat(d3.format(',.3s'));

      this.volumeAnnotation = techan.plot.axisannotation()
        .axis(this.volumeAxis)
        .orient('right')
        .width(35);

      this.macdScale = d3.scaleLinear()
        .range([indicatorTop(0) + dim.indicator.height, indicatorTop(0)]);

      this.rsiScale = this.macdScale.copy()
        .range([indicatorTop(1) + dim.indicator.height, indicatorTop(1)]);

      this.macd = techan.plot.macd()
        .xScale(x)
        .yScale(this.macdScale);

      this.macdAxis = d3.axisRight(this.macdScale)
        .ticks(3);

      this.macdAnnotation = techan.plot.axisannotation()
        .axis(this.macdAxis)
        .orient('right')
        .format(d3.format(',.2f'))
        .translate([x(1), 0]);

      this.macdAxisLeft = d3.axisLeft(this.macdScale)
        .ticks(3);

      this.macdAnnotationLeft = techan.plot.axisannotation()
        .axis(this.macdAxisLeft)
        .orient('left')
        .format(d3.format(',.2f'));

      this.rsi = techan.plot.rsi()
        .xScale(x)
        .yScale(this.rsiScale);

      this.rsiAxis = d3.axisRight(this.rsiScale)
        .ticks(3);

      this.rsiAnnotation = techan.plot.axisannotation()
        .axis(this.rsiAxis)
        .orient('right')
        .format(d3.format(',.2f'))
        .translate([x(1), 0]);

      this.rsiAxisLeft = d3.axisLeft(this.rsiScale)
        .ticks(3);

      this.rsiAnnotationLeft = techan.plot.axisannotation()
        .axis(this.rsiAxisLeft)
        .orient('left')
        .format(d3.format(',.2f'));

      this.ohlcCrosshair = techan.plot.crosshair()
        .xScale(this.timeAnnotation.axis().scale())
        .yScale(this.ohlcAnnotation.axis().scale())
        .xAnnotation(this.timeAnnotation)
        .yAnnotation([this.ohlcAnnotation, this.percentAnnotation, this.volumeAnnotation])
        .verticalWireRange([0, dim.plot.height]);

      this.macdCrosshair = techan.plot.crosshair()
        .xScale(this.timeAnnotation.axis().scale())
        .yScale(this.macdAnnotation.axis().scale())
        .xAnnotation(this.timeAnnotation)
        .yAnnotation([this.macdAnnotation, this.macdAnnotationLeft])
        .verticalWireRange([0, dim.plot.height]);

      this.rsiCrosshair = techan.plot.crosshair()
        .xScale(this.timeAnnotation.axis().scale())
        .yScale(this.rsiAnnotation.axis().scale())
        .xAnnotation(this.timeAnnotation)
        .yAnnotation([this.rsiAnnotation, this.rsiAnnotationLeft])
        .verticalWireRange([0, dim.plot.height]);

      var svg = this.svg = d3.select(el)
        .attr('width', dim.width)
        .attr('height', dim.height);

      var defs = svg.append('defs');

      defs.append('clipPath')
        .attr('id', 'ohlcClip')
        .append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', dim.plot.width)
        .attr('height', dim.ohlc.height);

      defs.selectAll('indicatorClip').data([0, 1])
        .enter()
        .append('clipPath')
        .attr('id', function(d, i) {
          return 'indicatorClip-' + i;
        })
        .append('rect')
        .attr('x', 0)
        .attr('y', function(d, i) {
          return indicatorTop(i);
        })
        .attr('width', dim.plot.width)
        .attr('height', dim.indicator.height);

      svg = svg.append('g')
        .attr('transform', 'translate(' + dim.margin.left + ',' + dim.margin.top + ')');

      svg.append('text')
        .attr('class', 'symbol')
        .attr('x', 20)
        .text('Facebook, Inc. (FB)');

      svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + dim.plot.height + ')');

      var ohlcSelection = this.ohlcSelection = svg.append('g')
        .attr('class', 'ohlc')
        .attr('transform', 'translate(0,0)');

      ohlcSelection.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(' + x(1) + ',0)')
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', -12)
        .attr('dy', '.71em')
        .style('text-anchor', 'end')
        .text('Price ($)');

      ohlcSelection.append('g')
        .attr('class', 'close annotation up');

      ohlcSelection.append('g')
        .attr('class', 'volume')
        .attr('clip-path', 'url(#ohlcClip)');

      ohlcSelection.append('g')
        .attr('class', 'candlestick')
        .attr('clip-path', 'url(#ohlcClip)');

      ohlcSelection.append('g')
        .attr('class', 'indicator sma ma-0')
        .attr('clip-path', 'url(#ohlcClip)');

      ohlcSelection.append('g')
        .attr('class', 'indicator sma ma-1')
        .attr('clip-path', 'url(#ohlcClip)');

      ohlcSelection.append('g')
        .attr('class', 'indicator ema ma-2')
        .attr('clip-path', 'url(#ohlcClip)');

      ohlcSelection.append('g')
        .attr('class', 'percent axis');

      ohlcSelection.append('g')
        .attr('class', 'volume axis');

      var indicatorSelection = this.indicatorSelection = svg.selectAll('svg > g.indicator').data(['macd', 'rsi']).enter()
        .append('g')
        .attr('class', function(d) {
          return d + ' indicator';
        });

      indicatorSelection.append('g')
        .attr('class', 'axis right')
        .attr('transform', 'translate(' + x(1) + ',0)');

      indicatorSelection.append('g')
        .attr('class', 'axis left')
        .attr('transform', 'translate(' + x(0) + ',0)');

      indicatorSelection.append('g')
        .attr('class', 'indicator-plot')
        .attr('clip-path', function(d, i) {
          return 'url(#indicatorClip-' + i + ')';
        });

      // Add trendlines and other interactions last to be above zoom pane
      svg.append('g')
        .attr('class', 'crosshair ohlc');

      svg.append('g')
        .attr('class', 'tradearrow')
        .attr('clip-path', 'url(#ohlcClip)');

      svg.append('g')
        .attr('class', 'crosshair macd');

      svg.append('g')
        .attr('class', 'crosshair rsi');

      svg.append('g')
        .attr('class', 'trendlines analysis')
        .attr('clip-path', 'url(#ohlcClip)');
      svg.append('g')
        .attr('class', 'supstances analysis')
        .attr('clip-path', 'url(#ohlcClip)');

      return {
        svg: svg,
        x: x,
        y: y,
        xAxis: xAxis,
        yAxis: yAxis,
        dimension: dim,
        indicatorTop: indicatorTop
      }
    },

    dataSetup(chartData, setUp) {
      const indicatorPreRoll = 33;
      let data = chartData.data;
      let supstanceData = chartData.supstances;
      let trendlineData = chartData.trendlines;
      let trades = PlotsUtil.getTradesData(data);

      let svg = setUp.svg;
      let x = setUp.x;
      let y = setUp.y;
      let xAxis = setUp.xAxis;
      let yAxis = setUp.yAxis;
      var accessor = this.candlestick.accessor();

      data.sort(function(a, b) {
        return d3.ascending(accessor.d(a), accessor.d(b));
      });

      x.domain(techan.scale.plot.time(data).domain());
      y.domain(techan.scale.plot.ohlc(data.slice(indicatorPreRoll)).domain());
      this.yPercent.domain(techan.scale.plot.percent(y, accessor(data[indicatorPreRoll])).domain());
      this.yVolume.domain(techan.scale.plot.volume(data).domain());
      var macdData = techan.indicator.macd()(data);
      this.macdScale.domain(techan.scale.plot.macd(macdData).domain());
      var rsiData = techan.indicator.rsi()(data);
      this.rsiScale.domain(techan.scale.plot.rsi(rsiData).domain());

      svg.select('g.candlestick').datum(data).call(this.candlestick);
      svg.select('g.close.annotation').datum([data[data.length - 1]]).call(this.closeAnnotation);
      svg.select('g.volume').datum(data).call(this.volume);
      svg.select('g.sma.ma-0').datum(techan.indicator.sma().period(10)(data)).call(this.sma0);
      svg.select('g.sma.ma-1').datum(techan.indicator.sma().period(20)(data)).call(this.sma1);
      svg.select('g.ema.ma-2').datum(techan.indicator.ema().period(50)(data)).call(this.ema2);
      svg.select('g.macd .indicator-plot').datum(macdData).call(this.macd);
      svg.select('g.rsi .indicator-plot').datum(rsiData).call(this.rsi);

      svg.select('g.crosshair.ohlc').call(this.ohlcCrosshair);
      svg.select('g.crosshair.macd').call(this.macdCrosshair);
      svg.select('g.crosshair.rsi').call(this.rsiCrosshair);
      svg.select('g.trendlines').datum(trendlineData).call(this.trendline).call(this.trendline.drag);
      svg.select('g.supstances').datum(supstanceData).call(this.supstance).call(this.supstance.drag);

      svg.select('g.tradearrow').datum(trades).call(this.tradearrow);

      // Stash for zooming
      this.zoomableInit = x.zoomable().domain([indicatorPreRoll, data.length]).copy(); // Zoom in a little to hide indicator preroll
      this.yInit = y.copy();
      this.yPercentInit = this.yPercent.copy();

      this.draw(setUp, data);
    },

    renderChart() {
      let setUp = this.setUp(this.dimension, this.$el)
      this.dataSetup(this.chartData, setUp);
    },

    draw(svgSetup, data) {
      let xAxis = svgSetup.xAxis;
      let yAxis = svgSetup.yAxis;
      let x = svgSetup.x;
      let y = svgSetup.y;
      let svg = svgSetup.svg;
      svg.select('g.x.axis').call(xAxis);
      svg.select('g.ohlc .axis').call(yAxis);
      svg.select('g.volume.axis').call(this.volumeAxis);
      svg.select('g.percent.axis').call(this.percentAxis);
      svg.select('g.macd .axis.right').call(this.macdAxis);
      svg.select('g.rsi .axis.right').call(this.rsiAxis);
      svg.select('g.macd .axis.left').call(this.macdAxisLeft);
      svg.select('g.rsi .axis.left').call(this.rsiAxisLeft);

      // We know the data does not change, a simple refresh that does not perform data joins will suffice.
      svg.select('g.candlestick').call(this.candlestick.refresh);
      svg.select('g.close.annotation').call(this.closeAnnotation.refresh);
      svg.select('g.volume').call(this.volume.refresh);
      svg.select('g .sma.ma-0').call(this.sma0.refresh);
      svg.select('g .sma.ma-1').call(this.sma1.refresh);
      svg.select('g .ema.ma-2').call(this.ema2.refresh);
      svg.select('g.macd .indicator-plot').call(this.macd.refresh);
      svg.select('g.rsi .indicator-plot').call(this.rsi.refresh);
      svg.select('g.crosshair.ohlc').call(this.ohlcCrosshair.refresh);
      svg.select('g.crosshair.macd').call(this.macdCrosshair.refresh);
      svg.select('g.crosshair.rsi').call(this.rsiCrosshair.refresh);
      svg.select('g.trendlines').call(this.trendline.refresh);
      svg.select('g.supstances').call(this.supstance.refresh);
      svg.select('g.tradearrow').call(this.tradearrow.refresh);
    }
  },

  mounted() {
    this.renderChart()
  }

}
</script>

<style>
path {
  fill: none;
  stroke-width: 1;
}

path.candle {
  stroke: #000000;
}

path.candle.body {
  stroke-width: 0;
}

path.candle.up {
  fill: #00AA00;
  stroke: #00AA00;
}

path.candle.down {
  fill: #FF0000;
  stroke: #FF0000;
}

.close.annotation.up path {
  fill: #00AA00;
}

path.volume {
  fill: #DDDDDD;
}

.indicator-plot path.line {
  fill: none;
  stroke-width: 1;
}

.ma-0 path.line {
  stroke: #1f77b4;
}

.ma-1 path.line {
  stroke: #aec7e8;
}

.ma-2 path.line {
  stroke: #ff7f0e;
}

button {
  position: absolute;
  right: 110px;
  top: 25px;
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

path.rsi {
  stroke: #000000;
}

path.overbought,
path.oversold {
  stroke: #FF9999;
  stroke-dasharray: 5, 5;
}

path.middle,
path.zero {
  stroke: #BBBBBB;
  stroke-dasharray: 5, 5;
}

.analysis path,
.analysis circle {
  stroke: blue;
  stroke-width: 0.8;
}

.trendline circle {
  stroke-width: 0;
  display: none;
}

.mouseover .trendline path {
  stroke-width: 1.2;
}

.mouseover .trendline circle {
  stroke-width: 1;
  display: inline;
}

.dragging .trendline path,
.dragging .trendline circle {
  stroke: darkblue;
}

.interaction path,
.interaction circle {
  pointer-events: all;
}

.interaction .body {
  cursor: move;
}

.trendlines .interaction .start,
.trendlines .interaction .end {
  cursor: nwse-resize;
}

.supstance path {
  stroke-dasharray: 2, 2;
}

.supstances .interaction path {
  pointer-events: all;
  cursor: ns-resize;
}

.mouseover .supstance path {
  stroke-width: 1.5;
}

.dragging .supstance path {
  stroke: darkblue;
}

.crosshair {
  cursor: crosshair;
}

.crosshair path.wire {
  stroke: #DDDDDD;
  stroke-dasharray: 1, 1;
}

.crosshair .axisannotation path {
  fill: #DDDDDD;
}

.tradearrow path.tradearrow {
  stroke: none;
}

.tradearrow path.buy {
  fill: #0000FF;
}

.tradearrow path.sell {
  fill: #9900FF;
}

.tradearrow path.highlight {
  fill: none;
  stroke-width: 2;
}

.tradearrow path.highlight.buy {
  stroke: #0000FF;
}

.tradearrow path.highlight.sell {
  stroke: #9900FF;
}
</style>
