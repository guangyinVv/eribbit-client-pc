import request from '@/utils/request'

export const getNewCartGoods = (skuId:string) => {
  return request(`goods/stock/${skuId}`, 'get')
}
