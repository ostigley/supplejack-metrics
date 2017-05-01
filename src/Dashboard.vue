<template>
    <selectors></selectors>
</template>

<script>
import selectors from './components/selector-menu'
export default {
  name: 'dashboard',
  components: {
    selectors
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
