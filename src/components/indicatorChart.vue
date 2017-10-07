<template>
<div>
  <h2>{{type}}</h2>
  <div v-show="type === 'adx'">
    <adx-chart :chart-data="mapData()" :margin="margin" :dimension="dimension" :title="title"></adx-chart>
    <div>Average Directional Index (ADX)</div>
  </div>
  <div v-show="type === 'aroon'">
    <aroon-chart :chart-data="mapData()" :margin="margin" :dimension="dimension" :title="title"></aroon-chart>
    <h5><a href="http://stockcharts.com/school/doku.php?id=chart_school:technical_indicators:aroon">Aroon</a></h5>
      <div>
        Developed by Tushar Chande in 1995, Aroon is an indicator system that determines whether a stock is trending or not and how strong the trend is. “Aroon” means “Dawn's Early Light” in Sanskrit. Chande chose this name because the indicators are designed
        to reveal the beginning of a new trend.
      </div>
  </div>
  <div v-show="type === 'trailingstop'">
    <trailing-stop-chart :chart-data="mapData()" :margin="margin" :dimension="dimension" :title="title"></trailing-stop-chart>
    <h5><a href="http://stockcharts.com/school/doku.php?id=chart_school:technical_indicators:aroon">Aroon</a></h5>
      <div>
        Developed by Tushar Chande in 1995, Aroon is an indicator system that determines whether a stock is trending or not and how strong the trend is. “Aroon” means “Dawn's Early Light” in Sanskrit. Chande chose this name because the indicators are designed
        to reveal the beginning of a new trend.
      </div>
  </div>
</div>
</template>

<script>
import AdxChart from './charts/adxChart'
import AroonChart from './charts/aroonChart'
import TrailingStopChart from './charts/trailingStopChart'

import {
  MarketData
} from '../assets/data/data'
var d3 = window.d3;

export default {
  name: 'chart',
  props: {
    type: String
  },
  components: {
    AdxChart,
    AroonChart,
    TrailingStopChart
  },
  data() {
    return {
      chartData: MarketData,
      title: '',
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
    mapData() {
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
<style>
.note {

}
