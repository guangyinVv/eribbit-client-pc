import Mock from 'mockjs'
import qs from 'qs'
Mock.setup({
  // 随机延迟
  timeout: '500-1000'
})
Mock.mock(/\/my\/test/, 'get', {
  msg: '测试成功',
  result: '111'
})
Mock.mock(/\/member\/collect/, 'get', (config) => {
  const queryString = config.url.split('?')[1]
  const queryObject = qs.parse(queryString)
  const items = []
  for (let i = 0; i < queryObject.pageSize; i++) {
    items.push(Mock.mock({
      id: '@id',
      name: '@ctitle(10,20)',
      description: '@title(4,10)',
      price: '@float(100,200,2,2)',
      picture: `http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/clothes_goods_${Mock.mock('@integer(1,8)')}.jpg`
    }))
  }
  return {
    counts: 35,
    pageSize: queryObject.pageSize,
    page: queryObject.page,
    items: items
  }
})
