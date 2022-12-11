<template>
  <XtxBread v-if="category">
    <XtxBreadItem to="/">首页</XtxBreadItem>
    <Transition name="fade-right" mode="out-in">
      <XtxBreadItem :key="category.top.id" v-if="category.top" :to="`/category/${category.top.id}`">{{ category.top.name
      }}</XtxBreadItem>
    </Transition>
    <Transition name="fade-right" mode="out-in">
      <XtxBreadItem :key="category.sub.id" v-if="category.sub">{{ category.sub.name }}</XtxBreadItem>
    </Transition>
  </XtxBread>
</template>
<script>
import { computed } from '@vue/reactivity'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
export default {
  name: 'SubBread',
  setup () {
    const store = useStore()
    const route = useRoute()
    // category 存了大分类和小分类
    const category = computed(() => {
      const cate = {}
      store.state.category.list.forEach(top => {
        if (top.children) {
          const sub = top.children.find(sub => sub.id === route.params.id)
          if (sub) {
            cate.top = { id: top.id, name: top.name }
            cate.sub = { id: sub.id, name: sub.name }
          }
        }
      })
      return cate
    })
    return { category }
  }
}
</script>
