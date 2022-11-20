import { createStore } from 'vuex'
import user from './modules/user'
import cart from './modules/cart'
import catagory from './modules/catagory'
// 导入数据持久化插件
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  modules: {
    user,
    cart,
    catagory
  },
  plugins: [createPersistedState({
    key: 'erabbit',
    paths: ['user', 'cart']
  })]
})
