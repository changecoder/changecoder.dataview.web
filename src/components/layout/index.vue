<template>
    <el-container>
        <el-header>
            <el-menu
                mode="horizontal"
                router
                background-color="#409EFF"
                text-color="#fff"
                active-text-color="#ffd04b">
                <el-menu-item v-for="(route, index) in routes" :key="index" :index="route.url">
                    {{ route.title }}
                </el-menu-item>
            </el-menu>
        </el-header>
        <el-container>
            <el-aside>
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
        title: '知识图谱',
        url: '/knowledgeGraph'
      }, {
        title: '数据血缘',
        url: '/dataLineage'
      }, {
        title: '知识表示',
        url: '/knowledgeRepresentation'
      }]
    }
  }
}
</script>
<style scoped>
.el-header {
    padding: 0;
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
