<template>
  <div class="checkout-address">
    <div class="text">
      <div v-if="!showAddress" class="none">您需要先添加收货地址才可提交订单。</div>
      <template v-else>
        <ul>
          <li>
            <span>收<i />货<i />人：</span>{{ showAddress.receiver }}
          </li>
          <li><span>联系方式：</span>{{ showAddress.contact.replace(/^(\d{3})\d{4}(\d{4})/, '$1****$2') }}</li>
          <li><span>收货地址：</span>{{ showAddress.fullLocation }}{{ showAddress.address }}</li>
        </ul>
        <a @click="openAddressEdit(showAddress)" href="javascript:;">修改地址</a>
      </template>
    </div>
    <div class="action">
      <XtxButton @click="openConfirm" class="btn">切换地址</XtxButton>
      <XtxButton @click="openAddressEdit" class="btn">添加地址</XtxButton>
    </div>
  </div>
  <XtxDialog class="toggleAddress" v-model:visible="dialogVisible" title="切换收货地址">
    <div @click="selectedAddress = item" :class="{ active: selectedAddress && selectedAddress.id === item.id }" class="text item" v-for="item in list" :key="item.id">
      <ul>
        <li>
          <span>收<i />货<i />人：</span>{{ item.receiver }}
        </li>
        <li><span>联系方式：</span>{{ item.contact }}</li>
        <li><span>收货地址：</span>{{ item.fullLocation.replace(/ /g, '') + item.address }}</li>
      </ul>
    </div>
    <template #footer>
      <XtxButton @click="dialogVisible = false" type="gray" style="margin-right: 20px">取消</XtxButton>
      <XtxButton @click="changeSelectedAddress" type="primary">确认</XtxButton>
    </template>
  </XtxDialog>
  <!-- 编辑组件 -->
  <AddressEdit @on-success="successHandler" ref="AddressEditVisible" />
</template>
<script lang="ts">
import { inject, Ref, ref } from 'vue'
import AddressEdit from './address-edit.vue'
type anyObject = {
  [key: string]: any
}
type PropsType = {
  list: anyObject[]
}
export default {
  name: 'CheckoutAddress',
  components: { AddressEdit },
  props: ['list'],
  emits: ['change'],
  setup(props: PropsType, { emit }: { emit: (event: 'change', ...args: any[]) => void }) {
    // 1. 找到默认收货地址
    // 2. 如果没有默认收货地址，则选择第一个收货地址
    // 3. 如果没有任何收货地址，则提示没有收货地址
    const showAddress: Ref<null | anyObject> = ref(null)
    const defaultAddress = props.list.find((item) => item.isDefault === 0)
    if (props.list) {
      if (defaultAddress) {
        showAddress.value = defaultAddress
      } else {
        showAddress.value = !props.list.length ? null : (props.list[0] as anyObject[])
      }
    }
    // 控制弹出框的显示与隐藏
    const dialogVisible = ref(false)
    // 将地址的id传递给父组件
    emit('change', showAddress.value?.id)
    // 记录切换地址时被选中的地址对象
    const selectedAddress: Ref<null | anyObject> = ref(null)
    // 点击确认按钮
    const changeSelectedAddress = () => {
      showAddress.value = selectedAddress.value
      emit('change', showAddress.value?.id)
      // 选择完地址后将数据清空
      selectedAddress.value = null
      dialogVisible.value = false
    }
    // 打开弹出层
    const openConfirm = () => {
      selectedAddress.value = null
      dialogVisible.value = true
    }
    // 控制AddressEdit编辑组件的显示与隐藏
    const AddressEditVisible: Ref<null | { open: (address?: anyObject | null) => void }> = ref(null)
    const openAddressEdit = (address?: anyObject | null) => {
      if (address) {
        AddressEditVisible.value?.open(address)
      } else {
        AddressEditVisible.value?.open()
      }
    }
    // 添加地址成功后的回调函数
    const addAddress = inject('addAddress', Function, true)
    const successHandler = (formData: anyObject) => {
      console.log(addAddress)
      addAddress(formData)
    }
    return { showAddress, dialogVisible, selectedAddress, changeSelectedAddress, openConfirm, AddressEditVisible, openAddressEdit, successHandler }
  }
}
</script>
<style scoped lang="less">
.toggleAddress {
  :deep(.body) {
    max-height: 350px;
    overflow-y: auto;
  }
}
.checkout-address {
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
.xtx-dialog {
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    &.item {
      border: 1px solid #f5f5f5;
      margin-bottom: 10px;
      cursor: pointer;
      &.active,
      &:hover {
        border-color: @xtxColor;
        background: lighten(@xtxColor, 50%);
      }
      > ul {
        padding: 10px;
        font-size: 14px;
        line-height: 30px;
      }
    }
  }
}
</style>
