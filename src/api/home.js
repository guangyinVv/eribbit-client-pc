import request from '@/utils/request.js'

/**
 *
 * @param {number} limit 获取品牌的个数
 * @returns Promise
 */
export const findBrand = (limit = 6) => {
  return request('/home/brand', 'get', { limit })
}
/**
 *  获取广告区轮播图
 * @returns Promise
 */
export const findBanner = () => {
  return request('/home/banner', 'get')
}
/**
 * 获取新鲜好物数据
 * @returns Promise
 */
export const findNew = () => {
  return request('/home/new', 'get')
}
/**
 * 获取人气推荐数据
 * @returns Promise
 */
export const findHot = () => {
  return request('/home/hot', 'get')
}
/**
 * 产品区块组件
 * @returns Promise
 */
export const findGoods = () => {
  return request('/home/goods', 'get')
}
/**
 * 最新专题
 * @returns Promise
 */
export const findSpecial = () => {
  return request('/home/special', 'get')
}
