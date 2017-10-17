<template>
<v-app>
  <navigation></navigation>
  <v-toolbar app fixed clipped-left class="indigo darken-1">
    <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    <v-toolbar-title class="text-white">Financial Charts (Vue, D3, techan)</v-toolbar-title>
    <v-spacer></v-spacer>
    <a href="https://github.com/xunxdd/financial-charts-vue">
      <v-icon class="btn-white" style="color:white">fa-github</v-icon>
    </a>
  </v-toolbar>
  <main>
    <v-content>
      <v-container fluid fill-height>
        <v-layout>
          <router-view></router-view>
        </v-layout>
      </v-container>
    </v-content>
  </main>
  <bottom></bottom>
</v-app>
</template>

<script>
import Navigation from './components/layout/navigation'
import Bottom from './components/layout/footer'
export default {
  name: 'app',
  data: () => ({
    drawer: true
  }),
  components: {
    Navigation,
    Bottom
  }
}
</script>

<style>
.list__tile {
  font-size: 11px;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.btn.btn-white .btn__content .icon,
.icon.btn-white,
.text-white {
  color: white;
}

nav.toolbar a,
.footer a {
  color: white;
  text-decoration: none;
}
</style>
