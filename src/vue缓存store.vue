<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    localStorage.getItem('store') && this.$store.replaceState(Object.assign(this.$store.state, JSON.parse(localStorage.getItem('store'))))
    let event = ['iPad', 'iPhone', 'iPod'].indexOf(navigator.platform) >= 0 ? 'pagehide' : 'beforeunload'
    window.addEventListener(event, function (event) {
       localStorage.setItem('store', JSON.stringify(this.$store.state))
    })
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
</style>
