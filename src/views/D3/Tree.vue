<template>
  <div>
    <div>树图</div>
    <svg id="container"></svg>
  </div>
</template>
<script>
import SimilarTreeGraph from '@/utils/Tree'
import { dataGenerate } from '@/utils/generator'

export default {
  name: 'TreePage',
  mounted () {
    const data = dataGenerate(3)
    const treeGraph = new SimilarTreeGraph({
      dataset: data.children,
      container: 'container'
    })
    treeGraph.init()
    console.log(treeGraph.nodes)
    console.log(treeGraph.edges)
  },
  methods: {
  }
}
</script>
<style>

</style>
