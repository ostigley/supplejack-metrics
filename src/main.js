// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Dashboard from './Dashboard'
import Selectors from './components/selector-menu'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#dashboard',
  template: '<Dashboard/>',
  components: { Dashboard, Selectors },
  data: {
    collections: ['all', 'other'],
    results: [],
    selection: {
      facet: 'all',
      dateRange: '1'
    }
  },
  devtools: true
})
