<template>
<div>
<el-input
  placeholder="输入关键字进行过滤"
  v-model="filterText">
</el-input>
<el-tree
  accordion
  :data="data"
  :filter-node-method="filterNode"
  ref="tree"
></el-tree>
</div>

</template>
<script>
import mockData from '@/mock/data.json'

export default {
  name: 'OtherPage',
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    }
  },
  data () {
    return {
      filterText: '',
      data: []
    }
  },
  mounted () {
    this.data = mockData.children
  },
  methods: {
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    }
  }
}
</script>
<style>
#container {
  height: 100vh;
}
</style>
