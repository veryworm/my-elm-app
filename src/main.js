import Vue from 'vue'
import App from './App.vue'
import Goods from 'components/v-goods/index.vue'
import Ratings from 'components/v-ratings/index.vue'
import Shops from 'components/v-shops/index.vue'
import VueRouter from 'vue-router'
import "./assets/style/reset.css"
import 'common/stylus/index.styl'

import {
  formatTime
} from 'common/js/date.js'
Vue.use(VueRouter)

Vue.filter('formatTime', function (value) {
  if (!value) {
    return
  }
  let date = new Date(value)
  return formatTime(date, 'yyyy-MM-dd hh:mm')
})

Vue.component('custom-input', {
  props: ['inputValue'],
  template: `
      <input :value="inputValue" @input="$emit('updata:inputValue',$event.target.value)"/>
  `
})

const routes = [{
    path: '/',
    component: Goods
  },
  {
    path: '/goods',
    component: Goods
  },
  {
    path: '/ratings',
    component: Ratings
  },
  {
    path: '/shops',
    component: Shops
  }
]

const router = new VueRouter({
  routes,
  'linkActiveClass': 'active'
})


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')