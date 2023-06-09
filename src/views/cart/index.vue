<template>
  <div class="xtx-cart-page">
    <div class="container">
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem>购物车</XtxBreadItem>
      </XtxBread>
      <div class="cart">
        <table>
          <thead>
            <tr>
              <th width="120"><XtxCheckbox @change="checkAll" :modelValue="$store.getters['cart/isCheckAll']">全选</XtxCheckbox></th>
              <th width="400">商品信息</th>
              <th width="220">单价</th>
              <th width="180">数量</th>
              <th width="180">小计</th>
              <th width="140">操作</th>
            </tr>
          </thead>
          <!-- 有效商品 -->
          <tbody>
            <tr v-if="$store.getters['cart/validList'].length === 0">
              <td colspan="6">
                <CartNone />
              </td>
            </tr>

            <tr v-for="goods in $store.getters['cart/validList']" :key="goods.skuId">
              <td><XtxCheckbox @change="(selectedState:boolean) => checkOne(goods.skuId, selectedState)" :modelValue="goods.selected" /></td>
              <td>
                <div class="goods">
                  <RouterLink :to="`/product/${goods.id}`">
                    <img :src="goods.picture" alt="" />
                  </RouterLink>
                  <div>
                    <p class="name ellipsis">{{ goods.name }}</p>
                    <!-- 选择规格组件 -->
                    <CartSku @change="(newSku) => updateCartSku(goods.skuId, newSku)" :goodsId="goods.id" :skuId="goods.skuId" :attrs-text="goods.attrsText" />
                  </div>
                </div>
              </td>
              <td class="tc">
                <p>&yen;{{ goods.nowPrice }}</p>
                <p v-if="goods.price > goods.nowPrice">
                  比加入时降价 <span class="red">&yen;{{ goods.price - goods.nowPrice }}</span>
                </p>
              </td>
              <td class="tc">
                <XtxNumbox :max="goods.stock" @change="(count:number)=>updateCount(goods.skuId,count)" :modelValue="goods.count" />
              </td>
              <!-- 小计 -->
              <td class="tc">
                <p class="f16 red">&yen;{{ (Math.round(goods.nowPrice * 100) * goods.count) / 100 }}</p>
              </td>
              <td class="tc">
                <p><a href="javascript:;">移入收藏夹</a></p>
                <p><a @click="deleteCart(goods.skuId)" class="green" href="javascript:;">删除</a></p>
                <p><a href="javascript:;">找相似</a></p>
              </td>
            </tr>
          </tbody>
          <!-- 无效商品 -->
          <tbody v-if="$store.getters['cart/invalidList'].length > 0">
            <tr>
              <td colspan="6"><h3 class="tit">失效商品</h3></td>
            </tr>
            <tr v-for="goods in $store.getters['cart/invalidList']" :key="goods.skuId">
              <td><XtxCheckbox style="color: #eee" /></td>
              <td>
                <div class="goods">
                  <RouterLink to="/"><img :src="goods.picture" alt="" /></RouterLink>
                  <div>
                    <p class="name ellipsis">{{ goods.name }}</p>
                    <p class="attr">{{ goods.attrsText }}</p>
                  </div>
                </div>
              </td>
              <td class="tc">
                <p>&yen;{{ goods.nowPrice }}</p>
              </td>
              <td class="tc">{{ goods.count }}</td>
              <td class="tc">
                <p>&yen;{{ (Math.round(goods.nowPrice * 100) * goods.count) / 100 }}</p>
              </td>
              <td class="tc">
                <p><a @click="deleteCart(goods.skuId)" class="green" href="javascript:;">删除</a></p>
                <p><a href="javascript:;">找相似</a></p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 操作栏 -->
      <div class="action">
        <div class="batch">
          <XtxCheckbox @change="checkAll" :modelValue="$store.getters['cart/isCheckAll']">全选</XtxCheckbox>
          <a @click="batchDeleteCart" href="javascript:;">删除商品</a>
          <a href="javascript:;">移入收藏夹</a>
          <a href="javascript:;" @click="deleteInvalidCart">清空失效商品</a>
        </div>
        <div class="total">
          共 {{ $store.getters['cart/validTotal'] }} 件商品，已选择 {{ $store.getters['cart/selectedTotal'] }} 件，商品合计：
          <span class="red">¥{{ $store.getters['cart/selectedAmount'] }}</span>
          <XtxButton @click="checkout" type="primary">下单结算</XtxButton>
        </div>
      </div>
      <!-- 猜你喜欢 -->
      <GoodRelevant />
    </div>
  </div>
</template>
<script lang="ts">
import Message from '@/components/library/Message'
import GoodRelevant from '@/views/goods/components/goods-relevant.vue'
import CartNone from './components/cart-none.vue'
import { useStore } from 'vuex'
import Confirm from '@/components/library/Confirm'
import { ComponentOptionsBase, ComponentOptionsMixin, SetupContext } from 'vue'
import { LooseRequired } from '@vue/shared'
import CartSku from './components/cart-sku.vue'
import router from '@/router'
export default {
  name: 'XtxCartPage',
  components: { GoodRelevant, CartNone, CartSku },
  setup(): any {
    const store = useStore()
    // 单选
    const checkOne = (skuId: string, selectedState: boolean) => {
      store.dispatch('cart/updateCart', { skuId, selected: selectedState })
    }
    // 全选
    const checkAll = (selected: boolean) => {
      store.dispatch('cart/checkAllCart', selected)
    }
    // 删除
    const deleteCart = (skuId: string) => {
      Confirm({ title: '提示', text: '确认删除吗？' })
        .then(() => {
          store.dispatch('cart/deleteCart', skuId).then(() => {
            Message({ type: 'success', text: '删除成功' })
          })
        })
        .catch(() => {})
    }
    // 删除选中的商品
    const batchDeleteCart = () => {
      Confirm({ title: '提示', text: '确认删除选中的商品吗？' })
        .then(() => {
          store.dispatch('cart/batchDelete').then(() => {
            Message({ type: 'success', text: '删除成功' })
          })
        })
        .catch(() => {})
    }
    // 删除无效商品
    const deleteInvalidCart = () => {
      Confirm({ title: '提示', text: '确认清空失效商品吗？' })
        .then(() => {
          store.dispatch('cart/batchDelete', true).then(() => {
            Message({ type: 'success', text: '删除成功' })
          })
        })
        .catch(() => {})
    }
    // 更新商品数量
    const updateCount = (skuId: string, count: number) => {
      store.dispatch('cart/updateCart', { skuId, count })
    }
    // 更新sku信息（修改规格）
    type SkuType = {
      skuId: string
      price: string | number
      oldPrice: string | number
      inventory: string | number
      // 颜色: 魅力粉 尺寸: L码
      specsText: string
    }
    // 更新购物车商品的规模
    const updateCartSku = (oldSkuId: string, newSku: SkuType) => {
      store.dispatch('cart/updateCartSku', { oldSkuId, newSku })
    }
    // 结算
    const checkout = () => {
      if (store.getters['cart/selectedList'].length === 0) {
        return Message({ type: 'warn', text: '还未选择商品' })
      }
      if (!store.state.user.profile.token) {
        return Confirm({ title: '提示', text: '登录后才能结算，现在去登录吗？' })
          .then(() => {
            router.push('/login?redirectUrl=' + encodeURIComponent('/member/checkout'))
          })
          .catch((e) => {})
      }
      router.push('/member/checkout')
    }
    return { checkOne, checkAll, deleteCart, batchDeleteCart, deleteInvalidCart, updateCount, updateCartSku, checkout }
  }
}
</script>
<style scoped lang="less">
.tc {
  text-align: center;
  .xtx-numbox {
    margin: 0 auto;
    width: 120px;
  }
}
.red {
  color: @priceColor;
}
.green {
  color: @xtxColor;
}
.f16 {
  font-size: 16px;
}
.goods {
  display: flex;
  align-items: center;
  img {
    width: 100px;
    height: 100px;
  }
  > div {
    width: 280px;
    font-size: 16px;
    padding-left: 10px;
    .attr {
      font-size: 14px;
      color: #999;
    }
  }
}
.action {
  display: flex;
  background: #fff;
  margin-top: 20px;
  height: 80px;
  align-items: center;
  font-size: 16px;
  justify-content: space-between;
  padding: 0 30px;
  .xtx-checkbox {
    color: #999;
  }
  .batch {
    a {
      margin-left: 20px;
    }
  }
  .red {
    font-size: 18px;
    margin-right: 20px;
    font-weight: bold;
  }
}
.tit {
  color: #666;
  font-size: 16px;
  font-weight: normal;
  line-height: 50px;
}
.xtx-cart-page {
  .cart {
    background: #fff;
    color: #666;
    table {
      border-spacing: 0;
      border-collapse: collapse;
      line-height: 24px;
      th,
      td {
        padding: 10px;
        border-bottom: 1px solid #f5f5f5;
        &:first-child {
          text-align: left;
          padding-left: 30px;
          color: #999;
        }
      }
      th {
        font-size: 16px;
        font-weight: normal;
        line-height: 50px;
      }
    }
  }
}
</style>
