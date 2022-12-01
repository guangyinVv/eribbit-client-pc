import carousel from './carousel.vue'
import xtxSkeleton from './xtx-skeleton.vue'
import moreVue from './more.vue'
import defaultImg from '@/assets/images/200.png'
export default {
  install (app) {
    app.component(carousel.name, carousel)
    app.component(xtxSkeleton.name, xtxSkeleton)
    app.component(moreVue.name, moreVue)
    defineDirective(app)
  }
}
const defineDirective = (app) => {
  // 图片懒加载指令
  app.directive('lazyload', {
    mounted (el, binding) {
      const observer = new IntersectionObserver(([{ isIntersecting }]) => {
        if (isIntersecting) {
          observer.unobserve(el)
          el.src = binding.value
          el.onerror = () => {
            el.src = defaultImg
          }
        }
      }, {
        threshold: 0.01
      })
      observer.observe(el)
    }
  })
}
