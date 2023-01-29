<template>
  <XtxDialog class="address-edit" :title="`${formData.id ? '修改' : '添加'}收货地址`" v-model:visible="dialogVisible">
    <div class="address-edit">
      <v-form ref="target" class="xtx-form" v-slot="{ errors }">
        <div class="xtx-form-item">
          <div class="label">*收货人：</div>
          <div class="field">
            <v-field v-model="formData.receiver" :rules="schema.receiver" name="receiver" class="input" placeholder="请输入收货人" />
          </div>
          <span class="error">{{ errors.receiver }}</span>
        </div>
        <div class="xtx-form-item">
          <div class="label">*手机号：</div>
          <div class="field">
            <v-field v-model="formData.contact" :rules="schema.contact" name="contact" class="input" placeholder="请输入手机号" />
          </div>
          <span class="error">{{ errors.contact }}</span>
        </div>
        <div class="xtx-form-item">
          <div class="label">*地区：</div>
          <div class="field">
            <xtxCity :modelValue="formData" @update:modelValue="updateAddress" placeholder="请选择所在地区" />
            <!-- <v-field :rules="schema.location" as="XtxCity" name="location" v-model="addressObj" placeholder="请选择所在地区" /> -->
          </div>
          <span class="error">{{ errors.location }}</span>
        </div>
        <div class="xtx-form-item">
          <div class="label">*详细地址：</div>
          <div class="field">
            <v-field v-model="formData.address" :rules="schema.address" name="address" class="input" placeholder="请输入详细地址" />
          </div>
          <span class="error">{{ errors.address }}</span>
        </div>
        <div class="xtx-form-item">
          <div class="label">邮政编码：</div>
          <div class="field">
            <v-field v-model="formData.postalCode" :rules="schema.postalCode" name="postalCode" class="input" placeholder="请输入邮政编码" />
          </div>
          <span class="error">{{ errors.postalCode }}</span>
        </div>
        <div class="xtx-form-item">
          <div class="label">地址标签：</div>
          <div class="field">
            <v-field v-model="formData.addressTags" :rules="schema.addressTags" name="addressTags" class="input" placeholder="请输入地址标签，逗号分隔" />
          </div>
          <span class="error">{{ errors.addressTags }}</span>
        </div>
      </v-form>
    </div>
    <template v-slot:footer>
      <XtxButton @click="cancel" type="gray" style="margin-right: 20px">取消</XtxButton>
      <XtxButton @click="submit" type="primary">确认</XtxButton>
    </template>
  </XtxDialog>
</template>
<script lang="ts">
import { ref, reactive, watch } from 'vue'
import { Form as VForm, Field as VField } from 'vee-validate'
import mySchema from '@/utils/vee-validate-schema'
import { addAddress, editAddress } from '@/api/order'
import Message from '@/components/library/Message'
type anyObject = {
  [key: string]: any
}
export default {
  name: 'AddressEdit',
  components: {
    VField,
    VForm
  },
  emits: ['on-success'],
  setup(props: any, { emit }: { emit: (event: 'on-success', ...args: any[]) => void }) {
    // 表单数据
    const formData = reactive({
      id: '',
      // 收货人
      receiver: '',
      // 手机号
      contact: '',
      // 详细地址
      address: '',
      // 邮政编码
      postalCode: '',
      // 地址标签
      addressTags: '',
      isDefault: 1,
      provinceCode: '',
      cityCode: '',
      countyCode: '',
      // 地区显示文字
      fullLocation: ''
    })
    type addressType = {
      cityCode: string
      countyCode: string
      provinceCode: string
      fullLocation: string
      [key: string]: any
    }
    // const addressObj: addressType = {
    //   cityCode: '',
    //   countyCode: '',
    //   provinceCode: '',
    //   fullLocation: ''
    // }

    const updateAddress = (address: addressType) => {
      formData.cityCode = address.cityCode
      formData.countyCode = address.countyCode
      formData.provinceCode = address.provinceCode
      formData.fullLocation = address.fullLocation
    }
    // 校验规则
    const schema = {
      receiver: mySchema.receiver,
      contact: mySchema.mobile,
      address: mySchema.address,
      postalCode: mySchema.postalCode,
      addressTags: mySchema.addressTags,
      location: mySchema.location
    }
    const dialogVisible = ref(false)
    // 打开函数
    const open = (address?: anyObject) => {
      dialogVisible.value = true
      // 修改
      if (address?.id) {
        for (const key in formData) {
          if (address[key]) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            formData[key] = address[key]
          } else {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            formData[key] = ''
          }
        }
      } else {
        // 添加
        // 打开的时候把之前的数据清空掉
        for (const key in formData) {
          if (key !== 'isDefault') {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            formData[key] = ''
          } else {
            formData[key] = 1
          }
        }
        // 因为修改了数据，有可能出现校验失败提示，要处理一下
        target.value.resetForm()
      }
    }
    // 取消
    const cancel = () => {
      dialogVisible.value = false
    }
    const target: any = ref(null)
    // 提交表单
    const submit = async () => {
      const { valid }: { valid: boolean } = await target.value?.validate()
      if (!valid) return
      // 修改
      if (formData.id) {
        editAddress(formData).then((data) => {
          // 修改成功
          Message({ text: '修改收货地址成功', type: 'success' })
          dialogVisible.value = false
          emit('on-success', formData, true)
        })
      } else {
        addAddress(formData).then((data: any) => {
          Message({ type: 'success', text: '添加收货地址成功' })
          formData.id = data.result.id
          emit('on-success', formData)
          // 关闭窗口
          dialogVisible.value = false
        })
      }
    }
    return { dialogVisible, open, schema, formData, target, submit, updateAddress, cancel }
  }
}
</script>
<style scoped lang="less">
.xtx-dialog.address-edit {
  :deep(.wrapper) {
    width: 780px;
    .body {
      font-size: 14px;
    }
  }
  .xtx-city {
    width: 320px;
    :deep(.select) {
      height: 50px;
      line-height: 48px;
      display: flex;
      padding: 0 10px;
      justify-content: space-between;
      .placeholder {
        color: #ccc;
      }
      i {
        color: #ccc;
        font-size: 18px;
      }
      .value {
        font-size: 14px;
      }
    }
    :deep(.option) {
      top: 49px;
    }
  }
}
.xtx-form {
  padding: 0;
  span {
    color: @priceColor;
  }
  input {
    outline: none;
    &::placeholder {
      color: #ccc;
    }
  }
}
</style>
