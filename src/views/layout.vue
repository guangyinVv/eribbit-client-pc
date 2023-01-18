<template>
  <!-- 顶部，头部，底部组件 -->
  <navbarVue />
  <headerVue />
  <headerStickyVue />
  <div class="main">
    <!-- 内容容器，二级路由 -->
    <RouterView />
  </div>
  <footerVue />
</template>

<script>
import navbarVue from '@/components/navbar.vue'
import headerVue from '@/components/header.vue'
import headerStickyVue from '@/components/header-sticky.vue'
import footerVue from '@/components/footer.vue'
import { useStore } from 'vuex'
export default {
  components: {
    navbarVue,
    headerVue,
    headerStickyVue,
    footerVue
  },
  setup() {
    const store = useStore()
    store.dispatch('category/getList')
  }
}
</script>

<style></style>
