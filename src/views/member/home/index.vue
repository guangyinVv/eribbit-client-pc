<template>
  <div class="member-home">
    <HomeOverview />
    <HomePanel title="我的收藏">
      <GoodsItem v-for="item in goods" :key="item.id" :goods="item" />
    </HomePanel>
    <HomePanel title="我的足迹">
      <GoodsItem v-for="item in goods" :key="item.id" :goods="item" />
    </HomePanel>
    <GoodsRelevant />
  </div>
</template>

<script lang="ts">
import { findCollect } from '@/api/member'
import GoodsItem from '@/views/category/components/goods-item.vue'
import GoodsRelevant from '@/views/goods/components/goods-relevant.vue'
import HomePanel from '@/views/member/home/components/home-panel.vue'
import { Ref, ref } from 'vue'
import HomeOverview from './components/home-overview.vue'

export default {
  name: '',
  components: { HomeOverview, HomePanel, GoodsRelevant, GoodsItem },
  setup() {
    const goods: Ref<{ id: string }[] | null> = ref(null)
    findCollect({ page: 1, pageSize: 4 }).then((data: any) => {
      goods.value = data.items
    })
    return { goods }
  }
}
</script>

<style scoped lang="less">
.member-home {
  :deep(.xtx-carousel) .carousel-btn.prev {
    left: 5px;
  }
  :deep(.xtx-carousel) .carousel-btn.next {
    right: 5px;
  }
}
</style>
