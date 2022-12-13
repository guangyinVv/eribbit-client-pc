<template>
  <!-- 筛选区 -->
  <div class="sub-filter" v-if="filterData && !filterLoading">
    <div class="item">
      <div class="head">品牌：</div>
      <div class="body">
        <!-- <a href="javascript:;">全部</a> -->
        <a @click="filterData.brands.selectedBrands = item.id"
          :class="{ active: item.id === filterData.brands.selectedBrands }" href="javascript:;"
          v-for="item in filterData.brands" :key="item.id">{{ item.name }}</a>
      </div>
    </div>
    <div class="item" v-for="i in filterData.saleProperties" :key="i.id">
      <div class="head">{{ i.name }}：</div>
      <div v-if="filterData" class="body">
        <!-- <a href="javascript:;">全部</a> -->
        <a @click="i.selectedProp = item.id" :class="{ active: item.id === i.selectedProp }" href="javascript:;"
          v-for="item in i.properties" :key="item.id">{{ item.name }}</a>
      </div>
    </div>
  </div>
  <div v-else class="sub-filter">
    <XtxSkeleton class="item" width="800px" height="40px" />
    <XtxSkeleton class="item" width="800px" height="40px" />
    <XtxSkeleton class="item" width="600px" height="40px" />
    <XtxSkeleton class="item" width="600px" height="40px" />
    <XtxSkeleton class="item" width="600px" height="40px" />
  </div>
</template>
<script>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { findSubCategoryFilter } from '@/api/category'
export default {
  name: 'SubFilter',
  setup () {
    const route = useRoute()
    const filterData = ref(null)
    // 判断是否正在加载数据
    const filterLoading = ref(false)
    watch(() => route.params.id, (newVal) => {
      // 如果二级类目的id发生变化，就获取更新数据
      if (newVal && `/category/sub/${newVal}` === route.path) {
        filterLoading.value = true
        // 发请求获取数据
        findSubCategoryFilter(newVal).then(data => {
          data.result.brands.selectedBrands = null
          data.result.brands.unshift({ id: null, name: '全部' })
          data.result.saleProperties.forEach(item => {
            item.selectedProp = null
            item.properties.unshift({ id: null, name: '全部' })
          })
          filterData.value = data.result
          filterLoading.value = false
        })
      }
    }, { immediate: true })
    return { filterData, filterLoading }
  }
}
</script>
<style scoped lang='less'>
// 筛选区
.sub-filter {
  background: #fff;
  padding: 25px;

  .item {
    display: flex;
    line-height: 40px;

    .head {
      width: 80px;
      color: #999;
    }

    .body {
      flex: 1;

      a {
        margin-right: 36px;
        transition: all .3s;
        display: inline-block;

        &.active,
        &:hover {
          color: @xtxColor;
        }
      }
    }
  }
}

.xtx-skeleton {
  padding: 10px 0;
}
</style>
