import defaultImg from '@/assets/images/200.png'
// context(目录路径,是否加载子目录,加载文件的正则规则)
const importFn = require.context('./', false, /\.vue$/)
export default {
  install (app) {
    // 根据keys批量注册
    importFn.keys().forEach(path => {
      const component = importFn(path).default
      app.component(component.name, component)
    })
    // app.component(carousel.name, carousel)
    // app.component(xtxSkeleton.name, xtxSkeleton)
    // app.component(moreVue.name, moreVue)
    // app.component(XtxBread.name, XtxBread)
    // app.component(XtxBreadItem.name, XtxBreadItem)

    // 定义图片懒加载指令
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
