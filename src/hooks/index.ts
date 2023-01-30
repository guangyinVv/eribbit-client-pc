import { Ref, ref, onUnmounted, computed } from 'vue'
// 从vueuse引入监视可视区的函数
import { useIntersectionObserver, useIntervalFn } from '@vueuse/core'
/**
 * 数据懒加载
 * @param {} apiFn API函数
 */
export const useLazyData = (apiFn: () => Promise<any>) => {
  const result = ref([])
  const target: Ref<HTMLElement> | Ref<null> = ref(null)
  const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }]) => {
      if (isIntersecting) {
        stop()
        apiFn().then((data) => {
          result.value = data.result
        })
      }
    },
    // 配置选项，只要相交的比例大于0就触发
    {
      threshold: 0
    }
  )
  return { target, result }
}

// 倒计时
export const usePayTime = () => {
  const time = ref(0)
  const { resume, pause } = useIntervalFn(
    () => {
      time.value--
      if (time.value <= 0) {
        return pause()
      }
    },
    1000,
    { immediate: false }
  )
  const start = (countdown: number) => {
    time.value = countdown
    resume()
  }
  // 将时间转为xx分xx秒
  const timeText = computed(() => {
    if (time.value <= 0) return false
    const minute = Math.floor(time.value / 60)
    const second = time.value % 60
    return `${minute}分${second}秒`
  })
  // 在组件销毁后清除计时器
  onUnmounted(() => {
    pause()
  })
  return { timeText, start }
}
