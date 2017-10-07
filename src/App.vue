<template>
<v-app id="inspire"  grey lighten-4>
  <navigation></navigation>
  <v-toolbar app fixed clipped-left class="indigo darken-1">
    <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    <v-toolbar-title class="text-white">Financial Charts (Vue, D3, techan)</v-toolbar-title>
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
  components: {
    Navigation,
    Bottom
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.text-white, a.text-white {
  color: white;
}
</style>
