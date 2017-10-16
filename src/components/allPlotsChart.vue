<template>
<div>
  <plot-all-chart :chart-data="chartData" :dimension="dimension" :title="title"></plot-all-chart>
</div>
</template>

<script>
import PlotAllChart from './charts/plotAllChart'
import {
  MarketData
} from '../assets/data/data'

import TradesData from '../assets/data/tradesData'

var d3 = window.d3;

export default {
  name: 'chart',
  props: {
    type: String
  },
  components: {
    PlotAllChart
  },
  data() {
    let margin = {
      top: 20,
      right: 50,
      bottom: 30,
      left: 50
    };
    return {
      chartData: {
        ...TradesData,
        data: this.mapData(MarketData)
      },
      title: '',
      dimension: {
        width: 960,
        height: 500,
        margin: {
          top: 20,
          right: 50,
          bottom: 30,
          left: 50
        },
        ohlc: {
          height: 305
        },
        indicator: {
          height: 65,
          padding: 5
        }
      }
    }
  },
  methods: {
    mapData(data) {
      let parseDate = d3.timeParse('%d-%b-%y')
      let chartData = data.slice(0, 200).map(function(d) {
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
