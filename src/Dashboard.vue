<template>
    <div>
      <selectors v-bind:options="collections" id='collection'></selectors>
      <selectors v-bind:options="ranges" id='range'></selectors>

      <p>
        Welcome to the beta release of DigitalNZ's metrics dashboard. Here you can find metrics about the different collections DigitalNZ brings together. These metrics reflect the entire DigitalNZ data service of which <a href="https://www.digitalnz.org/">digitalnz.org</a> is one of many interfaces.
      </p>

      <div v-for="type in results.types">
        <resultBox :title="type.title" :number="results[type.key]" :description="type.description"></resultBox>
      </div>

    </div>
</template>

<script>
import selectors from './components/selector-menu'
import resultBox from './components/result-box'
import dateFormat from 'dateFormat'
import { boxTypes } from './components/box-types'
import fectchMetrics from './fetchers/fetch-metrics'

export default {
  name: 'dashboard',

  components: {
    selectors, resultBox
  },

  data () {
    return {
      collections: this.$root.collections,
      ranges: this.$root.ranges,
      selection: {
        collection: 'all',
        range: 1
      },
      results: {
        new: null,
        items: null,
        interactions: null,
        impressions: null,
        sets: null,
        types: boxTypes

      }
    }
  },

  methods: {
    updateSelection (field, value) {
      this.$set(this.selection, field, value)
      this.fetch()
    },

    dateRange (days = 1) {
      const endDate = this.formatDate(new Date() - 1000 * 60 * 60 * 24 * 1)
      let startDate = new Date(new Date() - 1000 * 60 * 60 * 24 * days)
      startDate = this.formatDate(startDate)

      return `start_date=${startDate}&end_date=${endDate}`
    },

    formatDate (date) {
      return dateFormat(date, 'yyyy, mm, dd').replace(/, /g, '-')
    },

    fetch () {
      const { collection, range } = this.selection

      fectchMetrics.call(this, collection, range)
    }
  },

  mounted () {
    // Get facets and push to data storage
    this.$http.get('https://api.digitalnz.org/v3/metrics/facets')
      .then(function (response) {
        this.collections = ['all', ...response.body]
      })

    this.fetch()
  }

}
</script>
