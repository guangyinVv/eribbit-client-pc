<template>
  <!-- 新鲜好物 -->
  <div class="home-new" ref="target">
    <HomePanel title="新鲜好物" sub-title="新鲜出炉，品质靠谱">
      <template #right>
        <moreVue path="/" />
      </template>
      <div style="position: relative;height: 406px;">
        <Transition name="fade">
          <ul v-if="goods.length" ref="pannel" class="goods-list">
            <li v-for="item in goods" :key="item.id">
              <RouterLink :to="`/product/${item.id}`">
                <img v-lazyload="item.picture" alt="">
                <p class="name ellipsis">{{ item.name }}</p>
                <p class="price">&yen;{{ item.price }}</p>
              </RouterLink>
            </li>
          </ul>
          <HomeSkeleton v-else bg="#f0f9f4" />
        </Transition>
      </div>
    </HomePanel>
  </div>
</template>

<script lang="ts">
import HomePanel from './home-panel.vue'
import { findNew } from '@/api/home'
import HomeSkeleton from './home-skeleton.vue'
// import { Ref, ref } from 'vue'
import { useLazyData } from '@/hooks/index'
export default {
  components: { HomePanel, HomeSkeleton },
  setup() {
    // const goods = ref([])
    // const target: Ref<HTMLDivElement> | Ref<null> = ref(null)
    // findNew().then((data) => {
    //   goods.value = data.result
    // })
    const { target, result }: any = useLazyData(findNew)

    return { goods: result, target }
  }
}
</script>

<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;

  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }

    .price {
      color: @priceColor;
    }
  }
}
</style>
