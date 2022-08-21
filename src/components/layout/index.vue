<template>
    <el-container>
        <el-header>
            <el-menu
                mode="horizontal"
                router
                background-color="#409EFF"
                text-color="#fff"
                active-text-color="#ffd04b">
                <template v-for="(route, index) in routes">
                  <el-submenu v-if="route.children" :key="index" :index="route.url" >
                    <template slot="title">{{ route.title }}</template>
                    <el-menu-item v-for="(child, idx) in route.children" :key="idx" :index="child.url">
                      {{ child.title }}
                    </el-menu-item>
                  </el-submenu>
                  <template v-else>
                    <el-menu-item  :key="index" :index="route.url">
                      {{ route.title }}
                    </el-menu-item>
                  </template>
                </template>
            </el-menu>
        </el-header>
        <el-container class="layout_content">
            <el-aside v-if="isAsideShow">
              <router-view name="aside" />
            </el-aside>
            <el-main>
                <router-view />
            </el-main>
        </el-container>
        <el-container>
            <el-footer>Footer</el-footer>
        </el-container>
    </el-container>
</template>

<script>
import { ASIDE_ROUTE_LIST } from '@/constants/route'

export default {
  name: 'AppLayout',
  data () {
    return {
      routes: [{
        title: '前端可视化',
        url: '/'
      }, {
        title: '前端框架',
        url: '/dataview',
        children: [
          {
            title: 'G6',
            url: '/g6'
          }, {
            title: 'D3',
            url: '/d3'
          }, {
            title: 'ECharts',
            url: '/echarts'
          }
        ]
      }, {
        title: 'SVG',
        url: '/svg'
      }, {
        title: 'Canvas',
        url: '/canvas'
      }, {
        title: 'WebGL',
        url: '/webgl'
      }, {
        title: 'Others',
        url: '/others'
      }],
      isAsideShow: false
    }
  },
  watch: {
    '$route' (to, from) {
      this.isAsideShow = ASIDE_ROUTE_LIST.includes(to.name)
    }
  }
}
</script>
<style scoped>
.el-header {
    padding: 0;
}
.layout_content {
  min-height: calc(100vh - 120px);
}
.el-aside {
    padding: 20px;
    height: calc(100vh - 120px);
}
.el-footer {
    background-color: #409EFF;
    color: #fff;
    line-height: 60px;
    text-align: center;
}
</style>
