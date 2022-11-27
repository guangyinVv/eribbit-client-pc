<template>
  <!-- 首页入口 -->
  <div class="home-entry">
    <div class="container">
      <!-- 左侧分类 -->
      <homeCategoryVue />
      <!-- 轮播图 -->
      <!-- <homeBannerVue /> -->
    </div>
  </div>
  <!-- 新鲜好物 -->
  <!-- 人气推荐 -->
</template>

<script>
import homeCategoryVue from './components/home-category.vue'
// import homeBannerVue from './components/home-banner.vue'
export default {
  components: {
    homeCategoryVue
    // homeBannerVue
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
