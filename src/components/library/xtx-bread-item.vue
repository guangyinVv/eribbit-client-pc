<template>
  <div class="xtx-bread-item">
    <RouterLink v-if="to" :to="to">
      <slot />
    </RouterLink>
    <span v-else>
      <slot />
    </span>
    <!-- <i class="iconfont icon-angle-right">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right"
        viewBox="0 0 16 16">
        <path fill-rule="evenodd"
          d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
      </svg>
    </i> -->
  </div>
</template>
<script lang="ts">
export default {
  name: 'XtxBreadItem',
  props: {
    to: {
      type: [String, Object]
    }
  }
}
</script>
