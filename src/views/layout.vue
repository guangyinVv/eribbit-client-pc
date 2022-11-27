<template>
  <!-- 顶部，头部，底部组件 -->
  <navbarVue />
  <headerStickyVue />
  <headerVue />
  <div class="main">
    <!-- 内容容器，二级路由 -->
    <RouterView />
  </div>
  <footer>底部</footer>
</template>

<script>
import navbarVue from '@/components/navbar.vue'
import headerVue from '@/components/header.vue'
import headerStickyVue from '@/components/header-sticky.vue'
export default {
  components: {
    navbarVue,
    headerVue,
    headerStickyVue
  }
}
</script>

<style>

</style>
