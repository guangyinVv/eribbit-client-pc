<template>
  <div class="home-banner">
    <carouselVue />
  </div>

</template>

<script>
// import carouselVue from '@/components/library/carousel.vue'
export default {
  components: {
    // carouselVue
  }
}
</script>

<style lang="less" scoped>
.home-banner {
  width: 1240px;
  height: 500px;
  left: 0;
  top: 0;
  position: absolute;
  z-index: 98;
}
</style>
