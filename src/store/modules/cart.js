import { getNewCartGoods } from '@/api/cart'
export default {
  namespaced: true,

  state: () => {
    return {
      list: []
    }
  },
  // getters，相当于计算属性
  getters: {
    // 有效商品列表:库存大于0，isEffective为true
    validList (state) {
      return state.list.filter(goods => goods.stock > 0 && goods.isEffective)
    },
    // 有效商品数量
    validTotal (state, getters) {
      return getters.validList.reduce((p, c) => p + c.count, 0) || 0
    },
    // 有效商品总价格
    validAmount (state, getters) {
      return getters.validList.reduce((p, c) => p + c.count * Math.round(c.nowPrice * 100), 0) / 100 || 0
    },
    // 无效商品列表
    invalidList (state) {
      return state.list.filter(goods => goods.stock <= 0 || !goods.isEffective)
    },
    // 已选商品列表
    selectedList (state, getters) {
      return getters.validList.filter(item => item.selected === true)
    },
    // 已选商品总件数
    selectedTotal (state, getters) {
      return getters.selectedList.reduce((p, c) => p + c.count, 0 || 0)
    },
    // 已选商品总金额
    selectedAmount (state, getters) {
      return getters.selectedList.reduce((p, c) => p + c.count * Math.round(c.nowPrice * 100), 0) / 100 || 0
    },
    // 是否全选
    isCheckAll (state, getters) {
      return getters.validList.length > 0 && getters.validList.length === getters.selectedList.length
    }
  },
  // 修改内容必须在这里修改
  mutations: {
    // 加入购物车
    insertCart (state, payload) {
      // 插入数据规则：
      // 1. 先找有没有相同商品，有相同商品，则把数量累加一下
      // 2. 没有相同商品，直接保存
      const sameIndex = state.list.findIndex(goods => goods.skuId === payload.skuId)
      if (sameIndex > -1) {
        const count = state.list[sameIndex].count
        payload.count += count
        // 删掉原来的
        state.list.splice(sameIndex, 1)
      }
      state.list.unshift(payload)
    },
    /**
     * 修改购物车商品
     * @param {*} state
     * @param {*} goods {skuId,...}
     */
    updateCart (state, goods) {
      const updateGoods = state.list.find(item => item.skuId === goods.skuId)
      if (!updateGoods) throw Error('未找到该商品')
      for (const key in goods) {
        if (goods[key] !== undefined && goods[key] !== null && goods[key] !== '') {
          updateGoods[key] = goods[key]
        }
      }
    },
    // 删除购物车商品
    deleteCart (state, skuId) {
      const goodsIndex = state.list.findIndex(item => item.skuId === skuId)
      if (goodsIndex > -1) { state.list.splice(goodsIndex, 1) }
    }
  },
  // 可同步可异步，但不能直接修改数据
  actions: {
    checkAllCart (ctx, selected) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 已登录
        } else {
          // 未登录
          ctx.getters.validList.forEach(goods => {
            ctx.commit('updateCart', { skuId: goods.skuId, selected })
          })
        }
      })
    },
    // 添加购物车
    insertCart (ctx, payload) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 已登录
          resolve()
        } else {
          // 未登录
          ctx.commit('insertCart', payload)
          resolve()
        }
      })
    },
    // 更新购物车信息
    findCart (ctx) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 已登录
        } else {
          const promiseArr = ctx.state.list.map(goods => {
            return getNewCartGoods(goods.skuId)
          })
          Promise.all(promiseArr).then(dataList => {
            // 更新本地购物车
            dataList.forEach((data, i) => {
              ctx.commit('updateCart', { skuId: ctx.state.list[i].skuId, ...data.result })
            })
            resolve()
          })
        }
      })
    },
    // 单条删除购物车信息
    deleteCart (ctx, skuId) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 已登录
        } else {
          // 未登录
          ctx.commit('deleteCart', skuId)
          resolve()
        }
      })
    },
    // 修改购物车（选中状态，数量）
    updateCart (ctx, payload) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 已登录
        } else {
          ctx.commit('updateCart', payload)
          resolve()
        }
      })
    },
    /**
     * 批量删除
     * @param {*} ctx
     * @param {*} payload -这里的payload如果为true，则表示删除的无效商品
     * @returns {Promise}
     */
    batchDelete (ctx, payload) {
      const target = payload ? 'invalidList' : 'selectedList'
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 已登录
        } else {
          ctx.getters[target].forEach(goods => {
            ctx.commit('deleteCart', goods.skuId)
          })
          resolve()
        }
      })
    },
    updateCartSku (ctx, { oldSkuId, newSku }) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 已登录
        } else {
          const oldGoods = ctx.state.list.find(item => item.skuId === oldSkuId)
          const { skuId, price: nowPrice, specsText: attrsText, inventory: stock, oldPrice: price } = newSku
          ctx.commit('deleteCart', oldSkuId)
          const newGoods = { ...oldGoods, skuId, price, attrsText, stock, nowPrice }
          ctx.commit('insertCart', newGoods)
          resolve()
        }
      })
    }
  }
}
