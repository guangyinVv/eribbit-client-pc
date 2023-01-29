// 订单有关的api函数
import request from '@/utils/request'
type anyObject = {
  [key: string]: any
}
// 生成订单
export const createOrder: () => any = () => {
  return request('/member/order/pre', 'get')
}
// 添加地址
export const addAddress = (form: anyObject) => {
  return request('/member/address', 'post', form)
}
// 修改地址
export const editAddress = (form: anyObject) => {
  return request(`/member/address/${form.id}`, 'put', form)
}
