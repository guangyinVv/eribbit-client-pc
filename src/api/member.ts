import request from '@/utils/request'
/**
 * 获取收藏分页数据
 * @param param
 * @returns
 */
export const findCollect = ({ page = 1, pageSize = 10, collectType = 1 }) => {
  return request('/member/collect', 'get', { page, pageSize, collectType })
}
