<template>
  <div class="xtx-dialog" v-show="visible" :class="{ fade: dataVisible }">
    <div class="wrapper" :class="{ fade: dataVisible }">
      <div class="header">
        <h3>{{ title }}</h3>
        <a @click="closeDialog" href="JavaScript:;" class="iconfont icon-close-new">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-x" viewBox="0 0 13 13">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
        </a>
      </div>
      <div class="body">
        <slot />
      </div>
      <div class="footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { ref, watch } from 'vue'
type PropsType = {
  title: string
  visible: boolean
}
export default {
  name: 'XtxDialog',
  props: {
    title: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:visible'],
  setup(props: PropsType, { emit }: { emit: (event: 'update:visible', ...args: any[]) => void }) {
    // v-model部分双向绑定
    const dataVisible = ref(false)
    watch(
      () => props.visible,
      () => {
        setTimeout(() => {
          dataVisible.value = props.visible
        }, 0)
      },
      { immediate: true }
    )
    const closeDialog = () => {
      dataVisible.value = false
      emit('update:visible', false)
    }
    return { closeDialog, dataVisible }
  }
}
</script>
<style scoped lang="less">
.xtx-dialog {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 8887;
  background: rgba(0, 0, 0, 0);
  transition: all 0.4s;
  &.fade {
    background: rgba(0, 0, 0, 0.5);
  }
  .wrapper {
    width: 600px;
    background: #fff;
    border-radius: 4px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);
    opacity: 0;
    transition: all 0.4s;
    &.fade {
      transform: translate(-50%, -50%);
      opacity: 1;
    }
    .body {
      padding: 20px 40px;
      font-size: 16px;
      .icon-warning {
        color: @priceColor;
        margin-right: 3px;
        font-size: 16px;
      }
    }
    .footer {
      text-align: center;
      padding: 10px 0 30px 0;
    }
    .header {
      position: relative;
      height: 70px;
      line-height: 70px;
      padding: 0 20px;
      border-bottom: 1px solid #f5f5f5;
      h3 {
        font-weight: normal;
        font-size: 18px;
      }
      a {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        right: 25px;
        top: 25px;
        font-size: 24px;
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        color: #999;
        &:hover {
          color: #666;
        }
      }
    }
  }
}
</style>
