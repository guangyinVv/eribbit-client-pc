import { topCategory } from '@/api/constants'
import { findAllCategory } from '@/api/category'
export default {
  namespaced: true,
  state: () => {
    return {
      list: topCategory.map(item => ({ name: item }))
    }
  },
  mutations: {
    setList (state, topCategory) {
      state.list = topCategory
    },
    open (state, id) {
      const temp = state.list.find((item) => item.id === id)
      temp.open = true
    },
    hide (state, id) {
      const temp = state.list.find((item) => item.id === id)
      temp.open = false
    }
  },
  actions: {
    async getList ({ commit }) {
      const { result } = await findAllCategory()
      // 获取数据成功，提交mutations进行数据修改
      result.forEach((item) => {
        item.open = false
      })
      commit('setList', result)
    }
  }
}
