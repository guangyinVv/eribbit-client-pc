<template>
  <div class="cart-sku" ref="target">
    <div class="attrs" @click="toggle">
      <span class="ellipsis">{{ attrsText }}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="layer" v-if="visible">
      <div v-if="loading" class="loading"></div>
      <GoodsSku @change="(sku:any)=>changeSku(sku)" v-else :goods="goods" :skuId="skuId" />
      <XtxButton @click="submit" v-if="goods" type="primary" size="mini" style="margin-left: 60px">确认</XtxButton>
    </div>
  </div>
</template>
<script lang="ts">
import { findGoods } from '@/api/product'
import GoodsSku from '@/views/goods/components/goods-sku.vue'
import { onClickOutside } from '@vueuse/core'
import { Ref, ref } from 'vue'
type PropsType = {
  attrsText: string
  skuId?: string
  goodsId?: string
}
export default {
  name: 'CartSku',
  components: { GoodsSku },
  props: {
    attrsText: {
      type: String,
      default: ''
    },
    skuId: {
      type: String
    },
    // 商品的Id，需要通过这个获取商品的完整数据
    goodsId: {
      type: String
    }
  },
  setup(props: PropsType, { emit }: { emit: (event: string, ...args: any[]) => void }) {
    const visible = ref(false)
    const goods = ref(null)
    const loading = ref(true)
    const getGoods = () => {
      findGoods(props.goodsId as string).then((data: any) => {
        goods.value = data.result
        loading.value = false
      })
    }
    getGoods()
    const show = () => {
      visible.value = true
    }
    const hide = () => {
      visible.value = false
    }
    const toggle = () => {
      visible.value ? hide() : show()
    }
    const target = ref(null)
    onClickOutside(target, () => {
      hide()
    })
    // 点击sku组件时会触发函数，以更新我们的信息
    type CurrSkuType = {
      skuId: string
      price: string | number
      oldPrice: string | number
      inventory: string | number
      // 颜色: 魅力粉 尺寸: L码
      specsText: string
    }
    const currSku: Ref<CurrSkuType | null> = ref(null)
    const changeSku = (sku: CurrSkuType) => {
      currSku.value = sku
    }
    const submit = () => {
      // currSku被更改后，可以提交
      if (currSku.value && currSku.value.skuId !== props.skuId) {
        emit('change', currSku.value)
      }
      hide()
    }
    return { visible, toggle, target, goods, loading, submit, changeSku }
  }
}
</script>
<style scoped lang="less">
.cart-sku {
  height: 28px;
  border: 1px solid #f5f5f5;
  padding: 0 6px;
  position: relative;
  margin-top: 10px;
  display: inline-block;
  .attrs {
    line-height: 24px;
    display: flex;
    span {
      max-width: 230px;
      font-size: 14px;
      color: #999;
    }
    i {
      margin-left: 5px;
      font-size: 14px;
    }
  }
  .layer {
    position: absolute;
    left: -1px;
    top: 40px;
    z-index: 10;
    width: 400px;
    border: 1px solid @xtxColor;
    box-shadow: 2px 2px 4px lighten(@xtxColor, 50%);
    background: #fff;
    border-radius: 4px;
    font-size: 14px;
    padding: 20px;
    &::before {
      content: '';
      width: 12px;
      height: 12px;
      border-left: 1px solid @xtxColor;
      border-top: 1px solid @xtxColor;
      position: absolute;
      left: 12px;
      top: -8px;
      background: #fff;
      transform: scale(0.8, 1) rotate(45deg);
    }
    .loading {
      height: 224px;
      background: url(../../../assets/images/load.gif) no-repeat center;
    }
  }
}
</style>
