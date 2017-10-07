<template>
<v-navigation-drawer persistent v-model="drawer" clipped persistent enable-resize-watcher app>
  <v-list>
    <v-list-tile class="full-width" to="/home">
      <v-list-tile-action>
        <v-icon>dashboard</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>
          hello
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
        icon: 'trending_up',
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
        icon: 'trending_up',
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
