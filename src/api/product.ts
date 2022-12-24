import request from '@/utils/request'
import { AxiosResponse } from 'axios'
/**
 * 获取商品详情
 * @param {String} id -商品id
 * @returns Promise
 */
export const findGoods = (id: string | number) => {
  return request('/goods', 'get', { id })
}

/**
 * 获取推荐商品|猜你喜欢
 * @param param0 - 商品ID，传入则是相关推荐，不传入的话就是猜你喜欢
 * @returns Promise
 */
export const findRelevantGoods = ({ id, limit = 16 }:{ id:string|number, limit?:number }) => {
  return request('/goods/relevant', 'get', { id, limit })
}
