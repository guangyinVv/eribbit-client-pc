<template>
  <div class='sub-category'>
    <div class="container">
      <!-- 面包屑 -->
      <SubBread />
      <SubFilterVue />
    </div>
  </div>
</template>
<script>
import SubBread from './components/sub-bread.vue'
import SubFilterVue from './components/sub-filter.vue'
export default {
  name: 'SubCategory',
  components: {
    SubBread,
    SubFilterVue
  }
}
</script>

<style>

</style>
