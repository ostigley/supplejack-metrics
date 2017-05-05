import _ from 'lodash'
export default function (collection, range) {
  const url = `https://api.digitalnz.org/v3/metrics?${this.dateRange(range)}&metrics=record,view&facets=${collection}`
  this.$http.get(url)
    .then(function (response) {
      const newRecords = _.reduce(response.body, (sum, result) => sum + result.record[0].total_new_records, 0)
      const items = _.reduce(response.body, (sum, result) => sum + result.record[0].total_active_records, 0)
      const interactions = _.reduce(response.body, (sum, result) => sum + result.view[0].total_source_clickthroughs + result.view[0].records_added_to_user_sets, 0)
      const impressions = _.reduce(response.body, (sum, result) => sum + result.view[0].total_views, 0)

      this.$set(this.results, 'new', newRecords)
      this.$set(this.results, 'items', items)
      this.$set(this.results, 'interactions', interactions)
      this.$set(this.results, 'impressions', impressions)
    })

  if (!this.results.sets) {
    this.$http.get(url.replace('metrics?', '/metrics/global?'))
    .then(function (response) {
      this.$set(this.results, 'sets', response.body[0].total_public_sets)
    })
  }
}

