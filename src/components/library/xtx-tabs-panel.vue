<template>
  <div class="xtx-tabs-panel">
    <slot></slot>
  </div>
</template>
<script lang="ts">
export default {
  name: 'XtxTabsPanel',
  props: {
    label: {
      type: String,
      default: ''
    },
    name: {
      type: [String, Number],
      default: ''
    }
  }
}
</script>

<style lang="less" scoped></style>
