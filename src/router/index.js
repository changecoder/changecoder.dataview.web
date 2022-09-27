import Vue from 'vue'
import VueRouter from 'vue-router'
import DataView from '@/views/DataView/index.vue'
import LeftNav from '@/components/layout/LeftNav.vue'
import G6LeftNav from '@/components/layout/G6LeftNav.vue'
import NotFound from '@/components/NotFound.vue'

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
    components: {
      default: () => import(/* webpackChunkName: "about" */ '@/views/G6/index.vue'),
      aside: G6LeftNav
    }
  },
  {
    path: '/g6/decisionTree',
    name: 'DecisionTree',
    components: {
      default: () => import(/* webpackChunkName: "about" */ '@/views/G6/DecisionTree.vue'),
      aside: G6LeftNav
    }
  },
  {
    path: '/g6/bloodGraph',
    name: 'BloodGraph',
    components: {
      default: () => import(/* webpackChunkName: "about" */ '@/views/G6/Lineage.vue')
    }
  },
  {
    path: '/d3',
    name: 'D3',
    components: {
      default: () => import(/* webpackChunkName: "about" */ '@/views/D3/index.vue'),
      aside: LeftNav
    }
  },
  {
    path: '/d3/tree',
    name: 'Tree',
    components: {
      default: () => import(/* webpackChunkName: "about" */ '@/views/D3/Tree.vue'),
      aside: LeftNav
    }
  },
  {
    path: '/d3/circle',
    name: 'Circle',
    components: {
      default: () => import(/* webpackChunkName: "about" */ '@/views/D3/common/Circle.vue'),
      aside: LeftNav
    }
  },
  {
    path: '/d3/lineChart',
    name: 'LineChart',
    components: {
      default: () => import(/* webpackChunkName: "about" */ '@/views/D3/common/LineChart.vue'),
      aside: LeftNav
    }
  }, {
    path: '/d3/histogram',
    name: 'Histogram',
    components: {
      default: () => import(/* webpackChunkName: "about" */ '@/views/D3/common/Histogram.vue'),
      aside: LeftNav
    }
  }, {
    path: '/d3/axis',
    name: 'Axis',
    components: {
      default: () => import(/* webpackChunkName: "about" */ '@/views/D3/common/Axis.vue'),
      aside: LeftNav
    }
  }, {
    path: '/svg',
    name: 'SVG',
    component: () => import(/* webpackChunkName: "svg" */ '@/views/Svg/index.vue')
  }, {
    path: '/canvas',
    name: 'Canvas',
    component: () => import(/* webpackChunkName: "svg" */ '@/views/Canvas/index.vue')
  }, {
    path: '/echarts',
    name: 'ECharts',
    component: () => import(/* webpackChunkName: "about" */ '@/views/ECharts/index.vue')
  }, {
    path: '/others',
    name: 'Others',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Others/index.vue')
  }, {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
