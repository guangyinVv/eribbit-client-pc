import { ref, onUnmounted } from 'vue'
import Message from '@/components/library/Message'
import schema from '@/utils/vee-validate-schema'
type SendCodeDelayType = (form:{[key:string]:any}, sendCodeFunc:(mobile:string)=>any, target:any, MessageText?:string)=>any
/**
 * 发送验证码的逻辑
 * @param form 表单
 * @param sendCodeFunc 发送验证码的函数
 * @param MessageText 出错后显示的信息，默认“发送验证码失败”
 * @returns
 */
const sendCodeDelay:SendCodeDelayType = (form, sendCodeFunc, target, MessageText = '发送验证码失败') => {
  // 判断一下验证码是否已发送
  const checkCode = ref(false)
  // 下次可发送验证码的时间
  const restTime = ref(-1)
  let timer: any = null
  // 发送短信验证码
  const sendMsg = async () => {
    // 在发送验证码前校验一下，告诉用户手机号校验失败
    const valid = schema.mobile(form.mobile)
    if (valid !== true) {
      return target.value.setFieldError('mobile', valid)
    }
    // 如果时间没到，不能发
    if (restTime.value > 0) return
    const { mobile } = form
    if (mobile) {
      try {
        const data: any = await sendCodeFunc(mobile)
        if (data.code === '1') {
          // 验证码发送成功
          checkCode.value = true
          restTime.value = 60
          timer = setInterval(() => {
            restTime.value--
          }, 1000)
        } else {
          checkCode.value = false
        }
      } catch (e: any) {
        if (e.response && e.response.data) {
          Message({ type: 'error', text: e.response.data.message || MessageText })
        }
        checkCode.value = false
      }
    }
  }
  onUnmounted(() => {
    clearInterval(timer)
  })
  return { restTime, sendMsg, checkCode }
}
export default sendCodeDelay
