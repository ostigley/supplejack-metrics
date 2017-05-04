<template>
    <div>
      <selectors v-bind:options="collections" id='collection'></selectors>
      <selectors v-bind:options="ranges" id='range'></selectors>
    </div>
</template>

<script>
import selectors from './components/selector-menu'
export default {
  name: 'dashboard',
  components: {
    selectors
  },
  data () {
    return {
      collections: this.$root.collections,
      ranges: this.$root.ranges,
      collection: 'collection'
    }
  },
  mounted () {
    return this.$http.get('https://api.digitalnz.org/v3/metrics/facets')
      .then(function (response) {
        this.collections = ['all', ...response.body]
      })
  }

}
</script>
