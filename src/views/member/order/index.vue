<template>
  <div class="">order</div>
  <XtxTabs>
    <XtxTabsPanel label="选项卡1" name="1">内容1</XtxTabsPanel>
    <XtxTabsPanel label="选项卡2" name="2">内容2</XtxTabsPanel>
    <XtxTabsPanel label="选项卡3" name="3">内容3</XtxTabsPanel>
  </XtxTabs>
</template>

<script lang="ts">
import XtxTabsPanel from '@/components/library/xtx-tabs-panel.vue'
import XtxTabs from '@/components/library/xtx-tabs.vue'
export default {
  name: '',
  components: {
    XtxTabs,
    XtxTabsPanel
  }
}
</script>

<style scoped lang="less"></style>
