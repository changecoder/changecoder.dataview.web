<template>
<div>
  <div class="data-view">
    D3
  </div>
  <dynamic-chart></dynamic-chart>
</div>

</template>

<script>
import DynamicChart from './Dynamic.vue'

export default {
  name: 'D3Page',
  components: {
    DynamicChart
  }
}
</script>

<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
