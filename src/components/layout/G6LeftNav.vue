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
  name: 'G6LeftNav',
  data () {
    return {
      routes: [{
        title: 'G6首页',
        url: '/g6'
      }, {
        title: '顶部对齐缩进树',
        url: '/g6/decisionTree'
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
