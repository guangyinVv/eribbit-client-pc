import { createVNode, render } from 'vue'
import XtxMessage from './xtx-message.vue'

const div = document.createElement('div')
div.classList.add('xtx-message-container')
document.body.appendChild(div)
// 用来存弹出层元素的数组
const currentArray: { [key: string]: string | number }[] = []
// 每次触发函数加一，做唯一标识
let count = 0

let timer: number | undefined

/**
 * message({type:'error',text:'提示文字'})
 */
export default ({ type, text }: { type?: 'success' | 'warn' | 'error'; text: string }) => {
  // 用时间戳做唯一标识
  const currentCount = ++count
  currentArray.push({ text, count: currentCount })

  // 创建虚拟节点
  const vnode = createVNode(XtxMessage, { type, text: currentArray })
  render(null, div)
  render(vnode, div)

  setTimeout(() => {
    const index = currentArray.findIndex((item) => item.count === currentCount)
    // 三秒后，删除这个索引
    currentArray.splice(index, 1)
    const vnode = createVNode(XtxMessage, { type, text: currentArray })
    render(null, div)
    render(vnode, div)
  }, 3000)
}
