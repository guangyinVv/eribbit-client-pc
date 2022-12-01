import { Ref, ref } from 'vue'
// 从vueuse引入监视可视区的函数
import { useIntersectionObserver } from '@vueuse/core'
/**
 * 数据懒加载
 * @param {} apiFn API函数
 */
export const useLazyData = (apiFn:()=>Promise<any>) => {
  const result = ref([])
  const target:Ref<HTMLElement> | Ref<null> = ref(null)
  const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }]) => {
      if (isIntersecting) {
        stop()
        apiFn().then(data => {
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
