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
