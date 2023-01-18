import defaultImg from '@/assets/images/200.png'
import Message from './Message'
import Confirm from './Confirm'

// context(目录路径,是否加载子目录,加载文件的正则规则)
const importFn = require.context('./', false, /\.vue$/)
export default {
  install (app) {
    // 根据keys批量注册
    importFn.keys().forEach(path => {
      const component = importFn(path).default
      app.component(component.name, component)
    })

    // 定义图片懒加载指令
    defineDirective(app)

    // 全局挂载$message
    app.config.globalProperties.$message = Message
    // 全局挂载$confirm
    app.config.globalProperties.$confirm = Confirm
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
