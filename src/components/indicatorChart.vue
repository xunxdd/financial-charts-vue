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
  <div v-show="type === 'atr'">
    <atr-chart :chart-data="mapData()" :margin="margin" :dimension="dimension" :title="title"></atr-chart>
    <h5><a href="https://en.wikipedia.org/wiki/Average_true_range">Average True Range (ATR)</a></h5>
    <div>
      Average true range (ATR) is a technical analysis volatility indicator originally developed by J. Welles Wilder, Jr. for commodities.[1] The indicator does not provide an indication of price trend, simply the degree of price volatility.[2][3] The average
      true range is an N-day smoothed moving average (SMMA) of the true range values. Wilder recommended a 14-period smoothing.
    </div>
  </div>
  <div v-show="type === 'heikinashi'">
    <heikin-ashi-chart :chart-data="mapData()" :margin="margin" :dimension="dimension" :title="title"></heikin-ashi-chart>
    <h5><a href="https://en.wikipedia.org/wiki/Average_true_range">Heikin-Ashi</a></h5>
    <div>
      A type of candlestick chart that shares many characteristics with standard candlestick charts, but differs because of the values used to create each bar. Instead of using the open-high-low-close (OHLC) bars like standard candlestick charts, the Heikin-Ashi
      technique uses a modified formula:


      <br /> Close = (Open+High+Low+Close)/4
      <br /> Open = [Open (previous bar) + Close (previous bar)]/2
      <br /> High = Max (High,Open,Close)
      <br />Low = Min (Low,Open, Close)
      <br /><br /> BREAKING DOWN 'Heikin-Ashi Technique' The Heikin-Ashi technique is used by technical traders to identify a given trend more easily. Hollow candles with no lower shadows are used to signal a strong uptrend, while filled candles with
      no higher shadow are used to identify a strong downtrend.

      </blockquote>

    </div>
  </div>
  <div v-show="type === 'ichimoku'">
    <ichimoku-chart :chart-data="mapData()" :margin="margin" :dimension="dimension" :title="title"></ichimoku-chart>
    <h5><a href="https://en.wikipedia.org/wiki/Average_true_range">Heikin-Ashi</a></h5>
    <div>
      <blockquote>
        Ichimoku Kinko Hyo translates to one glance equilibrium chart or instant look at the balance chart and is sometimes referred to as "one glance cloud chart" based on the unique "clouds" that feature in ichimoku charting.[3][4]

      </blockquote>

    </div>
  </div>
  <div v-show="type === 'macd'">
    <macd-chart :chart-data="mapData()" :margin="margin" :dimension="dimension" :title="title"></macd-chart>
    <h5><a href="http://stockcharts.com/school/doku.php?id=chart_school:technical_indicators:moving_average_convergence_divergence_macd">MACD (Moving Average Convergence/Divergence Oscillator)</a></h5>
    <div>
      <blockquote>
        Developed by Gerald Appel in the late seventies, the Moving Average Convergence/Divergence oscillator (MACD) is one of the simplest and most effective momentum indicators available. The MACD turns two trend-following indicators, moving averages, into
        a momentum oscillator by subtracting the longer moving average from the shorter moving average. As a result, the MACD offers the best of both worlds: trend following and momentum. The MACD fluctuates above and below the zero line as the moving
        averages converge, cross and diverge. Traders can look for signal line crossovers, centerline crossovers and divergences to generate signals. Because the MACD is unbounded, it is not particularly useful for identifying overbought and oversold
        level
      </blockquote>
    </div>
  </div>
  <div v-show="type === 'rsi'">
    <rsi-chart :chart-data="mapData()" :margin="margin" :dimension="dimension" :title="title"></rsi-chart>
    <h5><a href="http://stockcharts.com/school/doku.php?id=chart_school:technical_indicators:moving_average_convergence_divergence_macd">RSI (Relative Strength Index)</a></h5>
    <div>
      <blockquote>
        The Relative Strength Index (RSI), developed by J. Welles Wilder, is a momentum oscillator that measures the speed and change of price movements. The RSI oscillates between zero and 100. Traditionally the RSI is considered overbought when above 70 and
        oversold when below 30.
      </blockquote>
    </div>
  </div>
  <div v-show="type === 'stochastic'">
    <stochastic-chart :chart-data="mapData()" :margin="margin" :dimension="dimension" :title="title"></stochastic-chart>
    <h5><a href="www.investopedia.com/terms/s/stochasticoscillator.asp">Stochastic Oscillator</a></h5>
    <div>
      <blockquote>
        The stochastic oscillator is a momentum indicator comparing the closing price of a security to the range of its prices over a certain period of time.
      </blockquote>
    </div>
  </div>
  <div v-show="type === 'williams'">
    <williams-chart :chart-data="mapData()" :margin="margin" :dimension="dimension" :title="title"></williams-chart>
    <h5><a href="http://www.investopedia.com/terms/w/williamsr.asp">Williams %R</a></h5>
    <div>
      <blockquote>
        Williams %R, sometimes referred to as the Williams Percent Range, is a momentum indicator that measures overbought and oversold levels, comparable to a stochastic oscillator. The Williams %R is used to establish entry and exit points in the market. It
        compares the close of a stock to the high-low range over a period of time, typically 14 days.

      </blockquote>
    </div>
  </div>

</div>
</template>

<script>
import AdxChart from './charts/adxChart'
import AroonChart from './charts/aroonChart'
import TrailingStopChart from './charts/trailingStopChart'
import AtrChart from './charts/atrChart'
import HeikinAshiChart from './charts/heikinAshiChart'
import IchimokuChart from './charts/ichimokuChart'
import MacdChart from './charts/macdChart'
import RsiChart from './charts/rsiChart'
import StochasticChart from './charts/stochasticChart'
import WilliamsChart from './charts/williamsChart'
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
    TrailingStopChart,
    AtrChart,
    HeikinAshiChart,
    IchimokuChart,
    MacdChart,
    RsiChart,
    StochasticChart,
    WilliamsChart
  },
  data() {
    let margin = {
      top: 20,
      right: 50,
      bottom: 30,
      left: 50
    };
    if (this.type === 'ichimoku') {
      margin.right = 20;
    };
    return {
      chartData: MarketData,
      title: '',
      margin: margin,
      dimension: {
        width: 960,
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
