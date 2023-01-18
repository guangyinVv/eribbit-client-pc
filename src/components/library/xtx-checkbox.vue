<template>
  <div class="xtx-checkbox" @click="changeChecked">
    <i class="icon-checked" v-if="checked">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
      </svg>
    </i>
    <i v-else>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
      </svg>
    </i>
    <span>
      <slot />
    </span>
  </div>
</template>

<script lang="ts">
import { ref, watch } from 'vue'
type PropsType = {
  modelValue: boolean
}

export default {
  name: 'XtxCheckbox',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  setup(props: PropsType, { emit }: { emit: (event: string, ...args: any[]) => void }) {
    const checked = ref(props.modelValue)
    const changeChecked = () => {
      checked.value = !checked.value
      emit('update:modelValue', checked.value)
      emit('change', checked.value)
    }
    watch(
      () => props.modelValue,
      (newValue) => {
        checked.value = newValue
      }
    )
    // const checked = useVModel(props, 'modelValue', emit)
    // const changeChecked = () => {
    //   checked.value = !checked.value
    // }
    return { checked, changeChecked }
  }
}
</script>

<style lang="less" scoped>
.xtx-checkbox {
  display: inline-block;
  margin-right: 2px;

  .icon-checked {
    color: @xtxColor;

    ~ span {
      color: @xtxColor;
    }
  }

  i {
    position: relative;
    top: 3px;
  }

  span {
    margin-left: 2px;
  }
}
</style>
