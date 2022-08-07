import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import * as usedElements from '@/elements'

import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/theme.less'

import 'default-passive-events'

Vue.config.productionTip = false

Object.keys(usedElements).forEach(key => Vue.use(usedElements[key]))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
