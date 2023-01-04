<template>
  <div class="xtx-infinite-loading" ref="container">
    <slot />
    <div class="loading" v-if="loading">
      <span class="img"></span>
      <span class="text">正在加载...</span>
    </div>
    <div class="none" v-if="finished">
      <span class="img"></span>
      <span class="text">亲，没有更多了</span>
    </div>

    <!-- 用于监听是否需要加载数据的div元素 -->
    <div ref="target" class="observer"></div>
  </div>
</template>

<script lang="ts">
import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'

export default {
  name: 'XtxInfiniteLoading',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    finished: {
      type: Boolean,
      default: false
    }
  },
  setup(props: any, { emit }: any) {
    const loading = ref(props.loading)
    const finished = ref(props.finished)
    const target = ref(null)
    const { stop } = useIntersectionObserver(
      target,
      ([{ isIntersecting }]) => {
        if (isIntersecting) {
          // 这里表示进入了可视区
          if (!props.loading) {
            if (!props.finished) {
              // 表明正在发送请求
              loading.value = true
              emit('update:loading', loading.value)
              // 发送请求
              emit('load')
            } else {
              // 加载完成，停止监视
              stop()
              finished.value = true
              emit('update:finished', finished.value)
            }
          }
        }
      },
      { threshold: 0 }
    )
    return { target }
  }
}
</script>

<style scoped lang="less">
.xtx-infinite-loading {
  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;

    .img {
      width: 50px;
      height: 50px;
      background: url(../../assets/images/load.gif) no-repeat center / contain;
    }

    .text {
      color: #999;
      font-size: 16px;
    }
  }

  .none {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;

    .img {
      width: 200px;
      height: 134px;
      background: url(../../assets/images/none.png) no-repeat center / contain;
    }

    .text {
      color: #999;
      font-size: 16px;
    }
  }
}
</style>
