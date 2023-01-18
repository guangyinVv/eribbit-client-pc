<template>
  <div class="xtx-numbox">
    <div class="label">{{ label }}</div>
    <div class="numbox">
      <a @click="changeNum(-1)" href="javascript:;">-</a>
      <input type="text" readonly :value="count" />
      <a @click="changeNum(1)" href="javascript:;">+</a>
    </div>
  </div>
</template>
<script lang="ts">
import { useVModel } from '@vueuse/core'
import { ref, watch } from 'vue'
interface PropsType {
  label: string
  modelValue: number
  min: number
  max: number | null
}
export default {
  name: 'XtxNumbox',
  props: {
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: Number,
      default: 1
    },
    min: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: null
    }
  },
  setup(props: PropsType, { emit }: { emit: (event: string, ...args: any[]) => void }) {
    // const count = useVModel(props, 'modelValue', emit)
    const count = ref(props.modelValue)
    watch(count, () => {
      emit('update:modelValue', count.value)
    })
    const changeNum = (step: number) => {
      const newVal = count.value + step
      // 先判断有没有最小值，是否大于等于最小值
      if (newVal < props.min) return
      // 判断有没有最大值，是否小于等于最大值
      if (props.max && newVal > props.max) return
      // 如果以上都不符合，则这个数可以用
      count.value = newVal
      // 触发change事件
      emit('change', newVal)
    }
    return { changeNum, count }
  }
}
</script>
<style scoped lang="less">
.xtx-numbox {
  display: flex;
  align-items: center;
  .label {
    width: 60px;
    color: #999;
    padding-left: 10px;
  }
  .numbox {
    width: 120px;
    height: 30px;
    border: 1px solid #e4e4e4;
    display: flex;
    > a {
      width: 29px;
      line-height: 28px;
      text-align: center;
      background: #f8f8f8;
      font-size: 16px;
      color: #666;
      &:first-of-type {
        border-right: 1px solid #e4e4e4;
      }
      &:last-of-type {
        border-left: 1px solid #e4e4e4;
      }
    }
    > input {
      width: 60px;
      padding: 0 5px;
      text-align: center;
      color: #666;
    }
  }
}
</style>
