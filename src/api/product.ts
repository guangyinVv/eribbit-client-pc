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
/**
 * 获取热销榜数据
 * @param param0 -商品ID，商品数量，type为类型，1为24小时，2为周榜，3为总榜
 * @returns Promise
 */
export const findGoodsHot = ({ id, limit = 3, type = 1 }:{id:string|string[], limit?:number, type?:number}) => {
  return request('/goods/hot', 'get', { id, limit, type })
}

/**
 * 查询商品评价信息
 * @param id -商品id
 * @returns Promise
 */
export const findGoodsCommentInfo = (id:string|string[]) => {
  // return request(`/goods/${id}/evaluate`, 'get')
  return request(`https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate`, 'get')
}

export const findGoodsCommentList = (id:string|string[], params:any) => {
  return request(`https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate/page`, 'get', params)
}
