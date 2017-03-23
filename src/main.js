// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import api from './api'
import fiters from './fiters'
import Footer from './components/Footer'


Vue.component('Footer', Footer);

import 'mint-ui/lib/style.css';

Vue.config.productionTip = false

var infiniteScroll =  require('vue-infinite-scroll');// get vue-infinite-scroll
Vue.use(infiniteScroll)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  fiters,
  api,
  render: h => h(App)
}).$mount('#app')
