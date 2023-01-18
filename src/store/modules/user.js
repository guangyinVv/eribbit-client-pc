export default {
  namespaced: true,
  state: () => {
    return {
      profile: {
        id: '',
        avatar: '',
        nickname: '',
        account: '',
        mobile: '',
        token: ''
      },
      // 登录后的回调地址
      redirectUrl: '/'
    }
  },
  mutations: {
    setUser (state, profile) {
      state.profile = profile
    },
    setRedirectUrl (state, url) {
      state.redirectUrl = url
    }
  }

}
