<template>
  <div class="goods-tabs">
    <nav>
      <a @click="activeName = 'GoodsDetail'" :class="{ active: activeName === 'GoodsDetail' }" href="javascript:;">商品详情</a>
      <a @click="activeName = 'GoodsComment'" :class="{ active: activeName === 'GoodsComment' }" href="javascript:;"
        >商品评价<span>({{ goods.commentCount }})</span></a
      >
    </nav>
    <!-- 切换内容的地方 -->
    <!-- <GoodsDetail />
    <GoodsComment /> -->
    <KeepAlive>
      <component :is="activeName" />
    </KeepAlive>
  </div>
</template>

<script lang="ts">
import { ref, inject } from 'vue'
import GoodsDetail from './goods-detail.vue'
import GoodsComment from './goods-comment.vue'
export default {
  name: '',
  components: {
    GoodsDetail,
    GoodsComment
  },
  setup() {
    // 商品详情 GoodsDetail
    // 商品评价 GoodsComment
    const activeName = ref('GoodsDetail')
    const goods: any = inject('goods')
    return { activeName, goods }
  }
}
</script>

<style lang="less" scoped>
.goods-tabs {
  min-height: 600px;
  background: #fff;
  nav {
    height: 70px;
    line-height: 70px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    a {
      padding: 0 40px;
      font-size: 18px;
      position: relative;
      > span {
        color: @priceColor;
        font-size: 16px;
        margin-left: 10px;
      }
      &:first-child {
        border-right: 1px solid #f5f5f5;
      }
      &.active {
        &::before {
          content: '';
          position: absolute;
          left: 40px;
          bottom: -1px;
          width: calc(100% - 80px);
          height: 2px;
          background: @xtxColor;
        }
      }
    }
  }
}
</style>
