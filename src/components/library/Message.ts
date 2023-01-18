import { createVNode, render } from 'vue'
import XtxMessage from './xtx-message.vue'

const div = document.createElement('div')
div.classList.add('xtx-message-container')
document.body.appendChild(div)

let timer:number | undefined
// message({type:'error',text:'提示文字'})
export default ({ type, text }:{type:'success'|'warn'|'error', text:string}) => {
  // 创建虚拟节点
  const vnode = createVNode(XtxMessage, { type, text })
  render(vnode, div)
  clearTimeout(timer)
  timer = setTimeout(() => {
    render(null, div)
  }, 3000)
}
