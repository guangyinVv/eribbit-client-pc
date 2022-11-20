export default {
  namespace: true,
  state: () => {
    return {
      profile: {
        id: '',
        avatar: '',
        nickname: '',
        account: '',
        mobile: '',
        token: ''
      }
    }
  },
  mutations: {
    setUser (state, profile) {
      state.profile = profile
    }
  }

}
