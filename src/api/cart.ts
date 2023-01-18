import request from '@/utils/request'

/**
 * 获取商品的最近价格、库存、是否有效等信息
 * @param skuId
 * @returns {Promise}
 */
export const getNewCartGoods = (skuId:string) => {
  return request(`goods/stock/${skuId}`, 'get')
}

/**
 * 获取商品对应的sku数据（specs、skus）
 * @param skuId
 * @returns {Promise}
 */
export const getGoodsSku = (skuId:string) => {
  return request(`goods/sku/${skuId}`, 'get')
}
