<template>
  <div class="goods-comment-image">
    <div class="list">
      <a @click="currImage = url" v-for="(url, index) in pictures" :key="index" href="javascript:;" :class="{ active: currImage === url }">
        <img :src="url" alt="" />
      </a>
    </div>
    <div class="preview" v-if="currImage">
      <img :src="currImage" alt="" />
      <i @click="exitPreview" class="iconfont icon-close-new"
        ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
          <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
        </svg>
      </i>
    </div>
  </div>
</template>
<script lang="ts">
import { ref, Ref } from 'vue'
type PropsType = {
  pictures: string[]
}
export default {
  name: 'GoodsCommentImage',
  props: {
    pictures: {
      type: Array,
      default: () => []
    }
  },
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  setup(_props: PropsType) {
    const currImage: Ref<string | null> = ref(null)
    const exitPreview = () => {
      currImage.value = null
    }
    return { currImage, exitPreview }
  }
}
</script>
<style scoped lang="less">
.goods-comment-image {
  .list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    a {
      width: 120px;
      height: 120px;
      border: 1px solid #e4e4e4;
      margin-right: 20px;
      margin-bottom: 10px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      &.active {
        border-color: @xtxColor;
      }
    }
  }
}
.preview {
  width: 480px;
  height: 480px;
  border: 1px solid #e4e4e4;
  background: #f8f8f8;
  margin-bottom: 20px;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  i {
    position: absolute;
    right: 0;
    top: 0;
    width: 30px;
    height: 30px;
    background: rgba(0, 0, 0, 0.2);
    color: #fff;
    text-align: center;
    line-height: 30px;
  }
}
</style>
