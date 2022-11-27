<template>
  <div class="container">
    <div class="home-entry">
      <!-- 左侧分类 -->
      <homeCategoryVue />
      <!-- 轮播图 -->
    </div>
  </div>
</template>

<script>
import homeCategoryVue from './components/home-category.vue'
export default {
  components: {
    homeCategoryVue
  }
}
</script>

<style lang="less" scoped>
// @import url(@/assets/styles/mixins.less);
.home {
  width: 100px;
  height: 100px;
  background: @xtxColor;
  .hoverShadow()
}
</style>>
