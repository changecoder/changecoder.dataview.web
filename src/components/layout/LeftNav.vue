<template>
    <el-menu
        mode="el-menu-vertical-demo"
        class="leftNav"
        router
        background-color="#409EFF"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item v-for="(route, index) in routes" :key="index" :index="route.url">
            {{ route.title }}
        </el-menu-item>
    </el-menu>
</template>

<script>
export default {
  name: 'LeftNav',
  data () {
    return {
      routes: [{
        title: 'D3首页',
        url: '/d3'
      }, {
        title: '柱状图',
        url: '/d3/histogram'
      }, {
        title: '折线图',
        url: '/d3/lineChart'
      }]
    }
  }
}
</script>
<style lang="less">
.leftNav {
  &.el-menu {
    margin: -20px;
    border: 1px solid #E2E2E2;
  }
}
</style>
