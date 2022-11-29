import { ref } from 'vue'
// 从vueuse引入监视可视区的函数
import { useIntersectionObserver } from '@vueuse/core'
/**
 *
 * @param {Element} target DOM元素
 * @param {Function} apiFn API函数
 */
export const useLazyData = (target, apiFn) => {
  const result = ref([])
  const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }]) => {
      if (isIntersecting) {
        stop()
        apiFn().then(data => {
          result.value = data.result
        })
      }
    }
  )
  return result
}
