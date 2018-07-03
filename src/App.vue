<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@font-face{
  font-family:YouYuan;
  src:url('/static/font/bosun03.otf');
}
#app {
  font-family: YouYuan;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body{
  height: 100vh;
  background: #9e9898;
  font-family: YouYuan;
}
.el-scrollbar__wrap{
  overflow-x: hidden;
}
</style>
