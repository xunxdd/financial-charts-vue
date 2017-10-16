<template>
<v-navigation-drawer persistent v-model="drawer" clipped persistent enable-resize-watcher app>
  <v-list dense>
    <v-list-tile class="full-width" to="/allPlots">
      <v-list-tile-action>
        <v-icon>dashboard</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>
          All Plots
        </v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-group v-for="(item, i) in items" :value="item.active" :key="i">
      <v-list-tile slot="item" class="full-width" :to="item.link" :router="!!item.link">
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>
            {{ item.text }}
          </v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-icon>keyboard_arrow_down</v-icon>
        </v-list-tile-action>
      </v-list-tile>
      <v-list-tile v-for="(subItem, i) in item.items" :key="i" :to="subItem.link" class="full-width">
        <v-list-tile-content>
          <v-list-tile-title>{{ subItem.text }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list-group>
    <v-list-tile class="full-width" to="/home">
      <v-list-tile-action>
        <v-icon>fa-info</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>
          Info
        </v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>

</v-navigation-drawer>
</template>
<script>
/* eslint-disable indent */
export default {
  name: 'navigation',
  data: () => ({
    drawer: true,
    items: [{
        icon: 'fa-signal',
        text: 'Plot',
        active: true,
        items: [{
            text: 'Close Line',
            link: '/chart/closeline'
          },
          {
            text: 'Cross Hair',
            link: '/chart/crosshair'
          },
          {
            text: 'Ohlc',
            link: '/chart/ohlc'
          },
          {
            text: 'Volume Chart',
            link: '/chart/volume'
          }
        ]
      },
      {
        icon: 'fa-line-chart',
        text: 'Indicators',
        active: true,
        items: [{
            text: 'ADX',
            link: '/indicator/adx'
          },
          {
            text: 'Aroon',
            link: '/indicator/aroon'
          },
          {
            text: 'Trailing Stop',
            link: '/indicator/trailingstop'
          },
          {
            text: 'Atr',
            link: '/indicator/atr'
          },
          {
            text: 'Heikin-Ashi',
            link: '/indicator/heikinashi'
          },
          {
            text: 'Ichimoku',
            link: '/indicator/ichimoku'
          },
          {
            text: 'MACD',
            link: '/indicator/macd'
          },
          {
            text: 'RSI',
            link: '/indicator/rsi'
          },
          {
            text: 'Stochastic',
            link: '/indicator/stochastic'
          },
          {
            text: 'Williams %R',
            link: '/indicator/williams'
          }
        ]
      }
    ]
  })
}
</script>
<style>
li.full-width {
  width: 100%
}
</style>
