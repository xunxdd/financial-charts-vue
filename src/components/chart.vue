<template>
<div>
  <h2>{{type}}</h2>
  <div v-show="type === 'closeline'">
    <closeline-chart :chart-data="mapData()" :margin="margin" :dimension="dimension" :title="title"></closeline-chart>
    <div>Closing price line</div>
  </div>
  <div v-show="type === 'crosshair'">
    <crosshair-chart :chart-data="mapData()" :margin="margin" :dimension="dimension" :title="title"></crosshair-chart>
  </div>
  <div v-show="type === 'ohlc'">
    <ohlc-chart :chart-data="mapData()" :margin="margin" :dimension="dimension" :title="title"></ohlc-chart>
    <div>Open High Low Close (ohlc)</div>
  </div>
  <div v-show="type === 'volume'">
    <volume-chart :chart-data="mapData()" :margin="margin" :dimension="dimension" :title="title"></volume-chart>
    <div>Open High Low Close (ohlc)</div>
  </div>
</div>
</template>

<script>
import CloselineChart from './charts/closelineChart'
import CrosshairChart from './charts/crosshairChart'
import OhlcChart from './charts/ohlcChart'
import VolumeChart from './charts/volumeChart'
import {MarketData} from '../assets/data/data'
var d3 = window.d3;

export default {
  name: 'chart',
  props: {
    type: String
  },
  components: {
    CloselineChart,
    CrosshairChart,
    OhlcChart,
    VolumeChart
  },
  data() {
    return {
      title: 'CandleStick',
      chartData: MarketData,
      margin: {
        top: 20,
        right: 50,
        bottom: 30,
        left: 50
      },
      dimension: {
        width: 850,
        height: 500
      }
    }
  },
  methods: {
    mapData () {
      let parseDate = d3.timeParse('%d-%b-%y')
      let chartData = this.chartData.slice(0, 200).map(function(d) {
        return {
          date: parseDate(d.Date),
          open: +d.Open,
          high: +d.High,
          low: +d.Low,
          close: +d.Close,
          volume: +d.Volume
        }
      })
      return chartData
    }
  }
}
</script>
