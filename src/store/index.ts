import { createStore } from 'vuex'

export default createStore({
  // 数据
  state: {
    name: '张三'
  },
  // 计算属性
  getters: {
    formatName (state) {
      return state.name + '!!!'
    }
  },
  // 修改state数据的方法
  // 需要用store.commit调用
  mutations: {
    updateName (state, params) {
      state.name = params
    }
  },
  // 用于发送请求并改数据
  // 需要用store.dispatch函数调用
  actions: {
    updateName (ctx) {
      setTimeout(() => {
        ctx.commit('updateName', '赵五')
      }, 1000)
    }
  },
  modules: {
  }
})
