<template>
  <div>数据：{{$store.state.name}}</div>
  <div>计算属性：{{$store.getters.formatName}}</div>
  <button @click="update">updateName</button>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'APP',
  setup () {
    const store = useStore()
    const name = ref(store.state.name)
    const { formatName } = store.getters
    const update = () => {
      // store.commit('updateName', '李四')
      store.dispatch('updateName')
    }

    return { name, formatName, update }
  }
}
</script>

<style>

</style>
