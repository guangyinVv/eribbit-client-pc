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

<script lang="ts">
import navbarVue from '@/components/navbar.vue'
import headerVue from '@/components/header.vue'
import headerStickyVue from '@/components/header-sticky.vue'
import footerVue from '@/components/footer.vue'
import { useStore } from 'vuex'
import Message from '@/components/library/Message'
export default {
  components: {
    navbarVue,
    headerVue,
    headerStickyVue,
    footerVue
  },
  setup() {
    const store = useStore()
    store.dispatch('cart/findCart').then(() => {
      Message({ type: 'success', text: '更新购物车成功' })
    })
  }
}
</script>

<style></style>
