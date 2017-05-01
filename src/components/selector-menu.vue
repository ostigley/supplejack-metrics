<template>
  <div class="selectors">
    <select v-for="collection in collections" v-on:change="console.log('changed')">
      <option v-bind:value="collection">{{collection}}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'selectors',
  data () {
    return {
      collections: this.$root.collections
    }
  }
}
</script>
