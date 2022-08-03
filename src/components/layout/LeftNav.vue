<template>
    <el-menu
        mode="vertical"
        class="leftNav"
        router>
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
      }, {
        title: '轴图',
        url: '/d3/axis'
      }]
    }
  }
}
</script>
<style lang="less">
.leftNav {
  height: calc(100vh - 120px);
  &.el-menu {
    margin: -20px;
    border: 1px solid #E2E2E2;
  }
}
</style>
