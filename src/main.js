// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import Dashboard from './Dashboard'
import Selectors from './components/selector-menu'

Vue.config.productionTip = false
Vue.use(VueResource)

/* eslint-disable no-new */
new Vue({
  el: '#dashboard',
  template: '<Dashboard/>',
  components: { Dashboard, Selectors },
  data: {
    collections: ['all', 'other'],
    ranges: [1, 7, 28, 365]
  },
  devtools: true
})

