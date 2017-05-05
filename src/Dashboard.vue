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
export default {
  name: 'dashboard',
  components: {
    selectors, resultBox
  },
  data () {
    return {
      collections: this.$root.collections,
      ranges: this.$root.ranges,
      collection: 'all',
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
    dateRange (days = 1) {
      const endDate = this.formatDate(new Date() - 1000 * 60 * 60 * 24 * 1)
      let startDate = new Date(new Date() - 1000 * 60 * 60 * 24 * days)
      startDate = this.formatDate(startDate)

      return `start_date=${startDate}&end_date=${endDate}`
    },

    formatDate (date) {
      return dateFormat(date, 'yyyy, mm, dd').replace(/, /g, '-')
    }
  },
  mounted () {
    this.dateRange()
    const metricsUrl = `https://api.digitalnz.org/v3/metrics?${this.dateRange()}&metrics=record,view&facets=all`

    // Get facets and push to data storage
    this.$http.get('https://api.digitalnz.org/v3/metrics/facets')
      .then(function (response) {
        this.collections = ['all', ...response.body]
      })

    // Get metrics and push to storage
    this.$http.get(metricsUrl)
      .then(function (response) {
        const record = response.body[0].record[0]
        const view = response.body[0].view[0]
        this.$set(this.results, 'new', record.total_new_records)
        this.$set(this.results, 'items', record.total_active_records)
        this.$set(this.results, 'interactions',
          view.total_source_clickthroughs + view.records_added_to_user_sets)
        this.$set(this.results, 'impressions', view.total_views)
      })

    // Get total sets and push to storage
    this.$http.get(metricsUrl.replace('metrics?', '/metrics/global?'))
      .then(function (response) {
        this.$set(this.results, 'sets', response.body[0].total_public_sets)
      })
  }

}
</script>
