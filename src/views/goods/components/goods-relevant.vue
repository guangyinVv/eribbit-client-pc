<template>
  <div class="goods-relevant">
    <div class="header">
      <i class="icon" />
      <span class="title">猜你喜欢</span>
    </div>
    <!-- 此处使用改造后的xtx-carousel.vue -->
    <XtxCarousel :sliders="sliders" />
  </div>
</template>

<script lang="ts">
import { findRelevantGoods } from '@/api/product'
import { Ref, ref } from 'vue'

// props的类型
type PropsType = {
  goodsId: string | number
}
export default {
  // 同类推荐，猜你喜欢
  name: 'GoodsRelevant',
  props: ['goodsId'],
  setup(props: PropsType) {
    const sliders: Ref<any[]> = ref([])
    findRelevantGoods({ id: props.goodsId }).then((data: any) => {
      const pageSize = 4
      const pageCount = Math.ceil(data.result.length / pageSize)
      for (let i = 0; i < pageCount; i++) {
        const sliderDataArray = data.result.slice(pageSize * i, pageSize * (i + 1))
        sliders.value.push(sliderDataArray)
      }
    })
    return { sliders }
  }
}
</script>

<style scoped lang="less">
.goods-relevant {
  background: #fff;
  min-height: 460px;
  margin-top: 20px;
  .header {
    height: 80px;
    line-height: 80px;
    padding: 0 20px;
    .title {
      font-size: 20px;
      padding-left: 10px;
    }
    .icon {
      width: 16px;
      height: 16px;
      display: inline-block;
      border-top: 4px solid @xtxColor;
      border-right: 4px solid @xtxColor;
      box-sizing: border-box;
      position: relative;
      transform: rotate(45deg);
      &::before {
        content: '';
        width: 10px;
        height: 10px;
        position: absolute;
        left: 0;
        top: 2px;
        background: lighten(@xtxColor, 40%);
      }
    }
  }
  :deep(.xtx-carousel) {
    height: 380px;
    .carousel {
      &-indicator {
        bottom: 30px;
        span {
          &.active {
            background: @xtxColor;
          }
        }
      }
      &-btn {
        top: 110px;
        opacity: 1;
        background: rgba(0, 0, 0, 0);
        color: #ddd;
        i {
          font-size: 30px;
        }
        svg {
          height: 30px;
          width: 30px;
        }
      }
    }
  }
}
</style>
