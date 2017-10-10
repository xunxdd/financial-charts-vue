<template>
  <div class="hello">
    <h1>Welcome, charts lovers</h1>
    <h2>All of the charts in this collection are modified from <a href="https://github.com/andredumas/techan.js">
      Techan.js</a>
    </h2>
    <h2>All of them are written using Vue.js</h2>

  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
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
</style>
