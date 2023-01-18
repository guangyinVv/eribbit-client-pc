import { createVNode, render } from 'vue'
import XtxConfirm from './xtx-confirm.vue'
const div = document.createElement('div')
div.classList.add('xtx-confirm-container')

document.body.appendChild(div)
export default ({ title, text }:{title:string, text:string}) => {
  return new Promise((resolve, reject) => {
    const cancelCallback = () => {
      render(null, div)
      reject(new Error('取消'))
    }
    const successCallback = () => {
      render(null, div)
      resolve(null)
    }
    const XtxConfirmAny:any = XtxConfirm
    const vn = createVNode(XtxConfirmAny, { title, text, cancelCallback, successCallback })
    render(vn, div)
  })
}
