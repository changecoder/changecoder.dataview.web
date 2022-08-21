<template>
  <div>
    <div>动态图像</div>
    <svg id="chart" width="600" height="500">
      <text class="time" x="300" y="50" text-anchor="middle">6:00</text>
      <text class="origin-text" x="90" y="75" text-anchor="end">MEL</text>
      <text class="dest-text" x="510" y="75" text-anchor="start">SYD</text>
      <circle class="origin-dot" r="5" cx="100" cy="75" />
      <circle class="dest-dot" r="5" cx="500" cy="75" />
      <line class="origin-dest-line" x1="110" y1="75" x2="490" y2="75" />
    </svg>
  </div>
</template>
<script>
export default {
  name: 'DynamicView',
  data () {
    return {
      dataset: [
      ]
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>
<style>

</style>
