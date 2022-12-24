<template>
  <div class="goods-image" @mouseleave="hideOrShow(false)" @mouseenter="hideOrShow(true)">
    <div v-show="layerPosition.show" class="large" :style="[{ backgroundImage: `url(${images[currIndex]})`, backgroundPositionX: -2 * layerPosition.x + 'px', backgroundPositionY: -2 * layerPosition.y + 'px' }]"></div>
    <div class="middle" ref="target">
      <img :src="images[currIndex]" alt="" />
      <div v-show="layerPosition.show" :style="{ left: layerPosition.x + 'px', top: layerPosition.y + 'px' }" class="layer"></div>
    </div>
    <ul class="small">
      <li v-for="(img, i) in images" :key="img" :class="{ active: i === currIndex }">
        <img @mouseenter="currIndex = i" :src="img" alt="" />
      </li>
    </ul>
  </div>
</template>

<script>
import { useMouseInElement } from '@vueuse/core'
import { ref, computed, reactive } from 'vue'
export default {
  name: 'GoodsImage',
  props: {
    images: {
      type: Array,
      default: () => []
    }
  },
  setup() {
    const target = ref(null)
    const { elementX, elementY, isOutside } = useMouseInElement(target)
    // 控制遮罩层移动
    let show = false
    const hideOrShow = (flag) => {
      show = flag
    }
    const layerPosition = computed(() => {
      const temp = reactive({})
      temp.show = !isOutside.value
      if (elementX.value < 100) {
        temp.x = 0
      } else if (elementX.value > 300) {
        temp.x = 200
      } else {
        temp.x = elementX.value - 100
      }
      if (elementY.value < 100) {
        temp.y = 0
      } else if (elementY.value > 300) {
        temp.y = 200
      } else {
        temp.y = elementY.value - 100
      }
      return temp
    })

    // const layerX = ref(0)
    // const layerY = ref(0)
    // layerX.value = elementX.value
    // layerY.value = elementY.value
    // 显示图片的索引
    const currIndex = ref(0)
    return { currIndex, target, layerPosition, hideOrShow }
  }
}
</script>
<style scoped lang="less">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
  z-index: 500;
  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }
  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
    position: relative;
    cursor: move;
    .layer {
      width: 200px;
      height: 200px;
      background: rgba(0, 0, 0, 0.2);
      left: 0;
      top: 0;
      position: absolute;
    }
  }
  .small {
    width: 80px;
    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;
      &:hover,
      &.active {
        border: 2px solid @xtxColor;
      }
    }
  }
}
</style>
