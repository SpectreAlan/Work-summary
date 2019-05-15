<template>
  <div id="app">
      <router-view ref="router" v-if="isRouterAlive" />
  </div>
</template>

<script>
  export default {
    name: 'App',
    provide () {
      return {
        reload: this.reload
      }
    },
    data () {
      return {
        isRouterAlive: true
      }
    },
    methods: {
      reload () {
        this.isRouterAlive = false
        this.$nextTick(function () {
          this.isRouterAlive = true
        })
      }
    }
  }
</script>

<style>
  #app {
    font-family: PingFang SC,Helvetica Neue,Helvetica,Arial,Hiragino Sans GB,Heiti SC,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    height: 100%;
    text-align: center;
    color: #2c3e50;
  }
</style>
