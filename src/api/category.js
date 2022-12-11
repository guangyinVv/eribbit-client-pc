// 定义首页需要的接口函数
import request from '@/utils/request'

/**
 * 获取首页头部分类数据
 */
export const findAllCategory = () => {
  return request('/home/category/head', 'get')
}
/**
 *  获取各个子类目下推荐商品
 * @param {String} id
 * @returns Promise
 */
export const findTopCategory = (id) => {
  return request('/category', 'get', { id })
}
/**
 * 获取二级类目下的筛选条件数据
 * @param {String} id
 * @returns Promise
 */
export const findSubCategoryFilter = (id) => {
  return request('/category/sub/filter', 'get', { id })
}
