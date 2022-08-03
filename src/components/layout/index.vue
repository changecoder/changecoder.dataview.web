<template>
    <el-container>
        <el-header>
            <el-menu
                mode="horizontal"
                router
                @select="handleSelect"
                background-color="#409EFF"
                text-color="#fff"
                active-text-color="#ffd04b">
                <el-menu-item v-for="(route, index) in routes" :key="index" :index="route.url">
                    {{ route.title }}
                </el-menu-item>
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
export default {
  name: 'AppLayout',
  data () {
    return {
      routes: [{
        title: '前端可视化',
        url: '/'
      }, {
        title: 'G6',
        url: '/g6'
      }, {
        title: 'D3',
        url: '/d3'
      }, {
        title: 'ECharts',
        url: '/echarts'
      }],
      isAsideShow: false
    }
  },
  methods: {
    handleSelect (key) {
      this.isAsideShow = key.startsWith('/d3')
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
