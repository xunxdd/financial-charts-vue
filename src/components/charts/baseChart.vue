<template>
<svg></svg>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  props: ['chartData', 'dimension', 'margin', 'title'],
  methods: {
    renderChart() {
      throw new Error('Please implement renderChart method in subclass of BaseChart.')
    }
  },
  mounted() {
    this.renderChart()
  }
})
</script>
<style>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

text {
  fill: #000;
}

text.symbol {
  fill: #BBBBBB;
}

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

path.line {
  fill: none;
  stroke: #000000;
  stroke-width: 1;
}
</style>
