<template>
  <div>app</div>
  <div>{{$store.state.user.profile.id}}</div>
  <button @click="updateUserInfo" >update</button>
</template>

<script>
import { useStore } from 'vuex'
import request from '@/utils/request'
export default {
  setup () {
    const store = useStore()
    const updateUserInfo = () => {
      store.commit('setProfile', {
        id: '1234'
      })
    }
    request('member/profile', 'get')
    return { updateUserInfo }
  }
}
</script>

<style>

</style>
