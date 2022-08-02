import Vue from 'vue'
import VueRouter from 'vue-router'
import DataView from '@/views/DataView/index.vue'
import LeftNav from '@/components/layout/LeftNav.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'DataView',
    component: DataView
  },
  {
    path: '/g6',
    name: 'G6',
    component: () => import(/* webpackChunkName: "about" */ '../views/G6/index.vue')
  },
  {
    path: '/d3',
    name: 'D3',
    components: {
      default: () => import(/* webpackChunkName: "about" */ '../views/D3/index.vue'),
      aside: LeftNav
    }
  },
  {
    path: '/d3/lineChart',
    name: 'LineChart',
    components: {
      default: () => import(/* webpackChunkName: "about" */ '../views/D3/common/LineChart.vue'),
      aside: LeftNav
    }
  }, {
    path: '/d3/histogram',
    name: 'Histogram',
    components: {
      default: () => import(/* webpackChunkName: "about" */ '../views/D3/common/Histogram.vue'),
      aside: LeftNav
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
