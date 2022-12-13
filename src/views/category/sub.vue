<template>
  <div class="sub-category">
    <div class="container">
      <!-- 面包屑 -->
      <SubBread />
      <SubFilterVue />
      <!-- 商品面板（排序+列表） -->
      <div class="goods-list">
        <SubSort></SubSort>
        <!-- 无限加载组件 -->
        <XtxInfiniteLoading v-model:loading="loading" v-model:finished="finished" @load="getData">
          <ul>
            <li v-for="item in goodsList" :key="item.id">
              <GoodsItem :goods="item" />
            </li>
          </ul>
        </XtxInfiniteLoading>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, watch } from 'vue'
import SubBread from './components/sub-bread.vue'
import SubFilterVue from './components/sub-filter.vue'
import SubSort from './components/sub-sort.vue'
import GoodsItem from './components/goods-item.vue'
import { useRoute } from 'vue-router'
import { findSubCategoryGoods } from '@/api/category'
export default {
  name: 'SubCategory',
  components: {
    SubBread,
    SubFilterVue,
    SubSort,
    GoodsItem
  },
  setup() {
    // 加载的状态
    const loading = ref(false)
    const finished = ref(false)
    const goodsList = ref([])
    const reqParams = {
      page: 1,
      pageSize: 20
    }
    const route = useRoute()
    const getData = () => {
      loading.value = true
      // reqParams.categoryId = route.params.id
      findSubCategoryGoods(reqParams).then(({ result }) => {
        if (result.items.length) {
          goodsList.value.push(...result.items)
          reqParams.page++
        } else {
          finished.value = true
        }
        loading.value = false
      })
    }
    watch(
      () => route.params.id,
      (newVal) => {
        if (newVal && `/category/sub/${newVal}` === route.path) {
          // 重新加载，一切归零
          finished.value = false
          goodsList.value = []
          reqParams.page = 1
        }
      }
    )
    return { loading, finished, getData, goodsList }
  }
}
</script>

<style lang="less">
.goods-list /deep/ {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;

  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;

    li {
      margin-right: 20px;
      margin-bottom: 20px;

      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>
