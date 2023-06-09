<template>
  <div class="xtx-pay-checkout-page">
    <div class="container">
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem to="/cart">购物车</XtxBreadItem>
        <XtxBreadItem>填写订单</XtxBreadItem>
      </XtxBread>
      <div class="wrapper">
        <!-- 收货地址 -->
        <h3 class="box-title">收货地址</h3>
        <div class="box-body" v-if="order">
          <CheckoutAddress @change="changeAddress" :list="order.userAddresses" />
        </div>
        <!-- 商品信息 -->
        <h3 class="box-title">商品信息</h3>
        <div class="box-body">
          <table class="goods">
            <thead>
              <tr>
                <th width="520">商品信息</th>
                <th width="170">单价</th>
                <th width="170">数量</th>
                <th width="170">小计</th>
                <th width="170">实付</th>
              </tr>
            </thead>
            <tbody v-if="order">
              <tr v-for="goods in order.goods" :key="goods.id">
                <td>
                  <a href="javascript:;" class="info">
                    <img :src="goods.picture" alt="" />
                    <div class="right">
                      <p>{{ goods.name }}</p>
                      <p>{{ goods.attrsText }}</p>
                    </div>
                  </a>
                </td>
                <td>&yen;{{ goods.price }}</td>
                <td>{{ goods.count }}</td>
                <td>&yen;{{ goods.totalPrice }}</td>
                <td>&yen;{{ goods.totalPayPrice }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 配送时间 -->
        <h3 class="box-title">配送时间</h3>
        <div class="box-body">
          <a class="my-btn active" href="javascript:;">不限送货时间：周一至周日</a>
          <a class="my-btn" href="javascript:;">工作日送货：周一至周五</a>
          <a class="my-btn" href="javascript:;">双休日、假日送货：周六至周日</a>
        </div>
        <!-- 支付方式 -->
        <h3 class="box-title">支付方式</h3>
        <div class="box-body">
          <a class="my-btn active" href="javascript:;">在线支付</a>
          <a class="my-btn" href="javascript:;">货到付款</a>
          <span style="color: #999">货到付款需付5元手续费</span>
        </div>
        <!-- 金额明细 -->
        <h3 class="box-title">金额明细</h3>
        <div class="box-body">
          <div class="total" v-if="order">
            <dl>
              <dt>商品件数：</dt>
              <dd>{{ order.summary.goodsCount }}件</dd>
            </dl>
            <dl>
              <dt>商品总价：</dt>
              <dd>¥{{ order.summary.totalPrice }}</dd>
            </dl>
            <dl>
              <dt>运<i></i>费：</dt>
              <dd>¥{{ order.summary.postFee }}</dd>
            </dl>
            <dl>
              <dt>应付总额：</dt>
              <dd class="price">¥{{ order.summary.totalPayPrice }}</dd>
            </dl>
          </div>
        </div>
        <!-- 提交订单 -->
        <div class="submit">
          <XtxButton @click="submitOrder" type="primary">提交订单</XtxButton>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { createOrder, submitOrder as submitOrderFn } from '@/api/order'
import Message from '@/components/library/Message'
import { provide, reactive, Ref, ref } from 'vue'
import { useRouter } from 'vue-router'
import CheckoutAddress from '../components/checkout-address.vue'
type anyObject = {
  [key: string]: any
}
export default {
  name: 'XtxCheckout',
  components: { CheckoutAddress },
  setup() {
    const order: Ref<null | { goods: any[]; summary: anyObject; userAddresses: any[] }> = ref(null)
    createOrder().then((data: { result: any }) => {
      order.value = data.result
      reqParams.goods = data.result.goods.map(({ skuId, count }: { skuId: string; count: number }) => ({ skuId, count }))
    })

    type ReqParamsType = {
      deliveryTimeType: number
      payType: number
      payChannel: number
      buyerMessage: string
      goods: anyObject[]
      addressId: null | string
    }
    const reqParams: ReqParamsType = reactive({
      // 收货地址的ID
      deliveryTimeType: 1,
      payType: 1,
      payChannel: 1,
      buyerMessage: '',
      goods: [],
      addressId: null
    })
    // const addressId: Ref<null | string> = ref(null)
    const changeAddress = (id: string) => {
      reqParams.addressId = id
    }
    // 添加可用于切换的地址
    const addAddress = (value: anyObject) => {
      const jsonValue = JSON.stringify(value)
      order.value?.userAddresses.unshift(JSON.parse(jsonValue))
    }
    provide('addAddress', addAddress)
    // 修改可用于切换的地址
    const modifyAddress = (value: anyObject) => {
      const address = order.value?.userAddresses.find((item) => item.id === value.id)
      for (const key in value) {
        address[key] = value[key]
      }
    }
    provide('modifyAddress', modifyAddress)
    const router = useRouter()
    // 提交订单
    const submitOrder = () => {
      if (!reqParams.addressId) {
        return Message({ type: 'warn', text: '您还未选择收货地址' })
      }
      submitOrderFn(reqParams).then((data: any) => {
        Message({ type: 'success', text: '提交订单成功' })
        router.push(`/member/pay?orderId=${data.result.id}`)
      })
    }
    return { order, changeAddress, submitOrder }
  }
}
</script>
<style scoped lang="less">
.xtx-pay-checkout-page {
  .wrapper {
    background: #fff;
    padding: 0 20px;
    .box-title {
      font-size: 16px;
      font-weight: normal;
      padding-left: 10px;
      line-height: 70px;
      border-bottom: 1px solid #f5f5f5;
    }
    .box-body {
      padding: 20px 0;
    }
  }
}
.address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }
    > ul {
      flex: 1;
      padding: 20px;
      li {
        line-height: 30px;
        span {
          color: #999;
          margin-right: 5px;
          > i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }
    > a {
      color: @xtxColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }
  .action {
    width: 420px;
    text-align: center;
    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;
      &:first-child {
        margin-right: 10px;
      }
    }
  }
}
.goods {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  .info {
    display: flex;
    text-align: left;
    img {
      width: 70px;
      height: 70px;
      margin-right: 20px;
    }
    .right {
      line-height: 24px;
      p {
        &:last-child {
          color: #999;
        }
      }
    }
  }
  tr {
    th {
      background: #f5f5f5;
      font-weight: normal;
    }
    td,
    th {
      text-align: center;
      padding: 20px;
      border-bottom: 1px solid #f5f5f5;
      &:first-child {
        border-left: 1px solid #f5f5f5;
      }
      &:last-child {
        border-right: 1px solid #f5f5f5;
      }
    }
  }
}
.my-btn {
  width: 228px;
  height: 50px;
  border: 1px solid #e4e4e4;
  text-align: center;
  line-height: 48px;
  margin-right: 25px;
  color: #666666;
  display: inline-block;
  &.active,
  &:hover {
    border-color: @xtxColor;
  }
}
.total {
  dl {
    display: flex;
    justify-content: flex-end;
    line-height: 50px;
    dt {
      i {
        display: inline-block;
        width: 2em;
      }
    }
    dd {
      width: 240px;
      text-align: right;
      padding-right: 70px;
      &.price {
        font-size: 20px;
        color: @priceColor;
      }
    }
  }
}
.submit {
  text-align: right;
  padding: 60px;
  border-top: 1px solid #f5f5f5;
}
</style>
