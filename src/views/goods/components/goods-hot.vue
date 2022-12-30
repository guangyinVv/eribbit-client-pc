<template>
  <div class="goods-hot">
    <h3>{{ title }}</h3>
    <div>
      <GoodsItem v-for="item in goodsList" :key="item['id']" :goods="item" />
    </div>
  </div>
</template>
<script lang="ts">
import GoodsItem from '@/views/category/components/goods-item.vue'
import { computed, Ref, ref } from 'vue'
import { findGoodsHot } from '@/api/product'
import { useRoute } from 'vue-router'
type PropsType = {
  type: 1 | 2 | 3
}
export default {
  name: 'GoodsHot',
  components: { GoodsItem },
  props: {
    type: {
      type: Number,
      default: 1
    }
  },
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  setup(props: PropsType) {
    // const titleObj = { 1: '24小时热销榜', 2: '周热销榜', 3: '总热销榜' }
    const titleObj = { 1: '24小时热销榜', 2: '周热销榜', 3: '总热销榜' }
    const title = computed(() => {
      return titleObj[props.type]
    })
    const goodsList: Ref<any[]> = ref([])
    const route = useRoute()
    findGoodsHot({ id: route.params.id, type: props.type, limit: 3 }).then((data: any) => {
      goodsList.value = data.result
    })
    return { title, goodsList }
  }
}
</script>
<style scoped lang="less">
.goods-hot {
  h3 {
    height: 70px;
    background: @helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }
  :deep(.goods-item) {
    background: #fff;
    width: 100%;
    margin-bottom: 10px;
    img {
      width: 200px;
      height: 200px;
    }
    p {
      margin: 0 10px;
    }
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
}
</style>
