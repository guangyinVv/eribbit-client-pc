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

// 合并购物车（合并数据库和本地购物车）
export const mergeCart = (cartList:object[]) => {
  return request('/member/cart/merge', 'post', cartList)
}

/**
 * 登录后获取新的购物车列表
 * @returns {Promise}
 */
export const findCart = () => {
  return request('/member/cart', 'get')
}
/**
 * 加入购物车
 * @param {skuId和count}
 * @returns
 */
export const insertCart = ({ skuId, count }:{skuId:string, count:number|string}) => {
  return request('/member/cart', 'post', { skuId, count })
}

/**
 * 删除购物车商品
 * @param ids 商品skuId的数组
 */
export const deleteCart = (ids:string[]) => {
  return request('/member/cart', 'delete', { ids })
}

/**
 * 修改商品的数量或是否选中
 * @param {skuId,selected,count}
 * @returns
 */
export const updateCart = ({ skuId, selected, count }:{ skuId:string, selected:boolean, count:string|number }) => {
  return request(`/member/cart/${skuId}`, 'put', { selected, count })
}
/**
 * 全选或者取消全选
 * @param {selected,ids}
 */
export const checkAllCart = ({ selected, ids }:{selected:boolean, ids:string[]}) => {
  return request('/member/cart/selected', 'put', { selected, ids })
}
