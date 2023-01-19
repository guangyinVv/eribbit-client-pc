<template>
  <Form ref="target" :validationSchema="schema" v-slot="{ errors }" class="xtx-form">
    <div v-if="avatar" class="user-info">
      <img :src="avatar" alt="" />
      <p>Hi，{{ nickname }} 欢迎来小兔鲜，完成绑定后可以QQ账号一键登录哦~</p>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-phone" viewBox="0 0 16 16">
            <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z" />
            <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
          </svg>
        </i>
        <Field :class="{ err: errors.mobile }" v-model="form['mobile']" name="mobile" class="input" type="text" placeholder="绑定的手机号" />
      </div>
      <div v-if="errors.mobile" class="error">
        {{ errors.mobile }}
      </div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-code">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-shield-check" viewBox="0 0 16 16">
            <path
              d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z"
            />
            <path d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
          </svg>
        </i>
        <Field :class="{ err: errors.code }" v-model="form['code']" name="code" class="input" type="text" placeholder="短信验证码" />
        <span @click="sendMsg" class="code">{{ restTime <= 0 ? '发送验证码' : restTime + '秒后发送' }}</span>
      </div>
      <div v-if="errors.code" class="error">
        {{ errors.code }}
      </div>
    </div>
    <a @click="submit" href="javascript:;" class="submit">立即绑定</a>
  </Form>
</template>

<script lang="ts">
import { reactive, Ref, ref, onUnmounted } from 'vue'
import { Field, Form } from 'vee-validate'
import mySchema from '@/utils/vee-validate-schema'
import { userQQBindLogin, userQQBindCode } from '@/api/user'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import QC from 'qc'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Message from '@/components/library/Message'
import sendCodeDelay from '@/utils/sendCode'
type PropsType = {
  unionId: string
}
export default {
  name: 'CallbackBind',
  components: {
    Form,
    Field
  },
  props: {
    unionId: {
      type: String
    }
  },
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  setup(props: PropsType) {
    const nickname: Ref<string | null> = ref(null)
    const avatar: Ref<string | null> = ref(null)
    if (QC.Login.check()) {
      QC.api('get_user_info').success((res: any) => {
        avatar.value = res.data.figureurl_qq_1 as string
        nickname.value = res.data.nickname
      })
    }
    type formType = {
      mobile: string
      code: string
    }
    const form: formType = reactive({
      mobile: '',
      code: ''
    })
    const schema = {
      mobile: mySchema.mobile,
      code: mySchema.code
    }
    const target: Ref<any> = ref(null)
    const store = useStore()
    const router = useRouter()

    // 发送验证码的时间处理函数
    const { restTime, sendMsg, checkCode } = sendCodeDelay(form, userQQBindCode, target, '发送验证码失败')

    const submit = async () => {
      // 如果还未发送验证码，则直接返回
      if (!checkCode.value) {
        Message({ type: 'warn', text: '还未发送验证码' })
        return
      }
      const { valid } = await target.value.validate()
      if (valid) {
        userQQBindLogin({
          unionId: props.unionId,
          // mobile: form.mobile,
          // code: form.code
          ...form
        })
          .then((data: any) => {
            const { id, account, avatar, mobile, nickname, token } = data.result
            store.commit('user/setUser', { id, account, avatar, mobile, nickname, token })
            store.dispatch('cart/mergeCart').then(() => {
              router.push(store.state.user.redirectUrl)
              Message({ type: 'success', text: 'QQ登录成功' })
            })
          })
          .catch((e) => {
            console.log(e)
            if (e.response && e.response.data) {
              Message({ type: 'error', text: e.response.data.message || '绑定失败' })
            }
          })
      }
    }
    return { nickname, avatar, form, schema, target, submit, restTime, sendMsg }
  }
}
</script>

<style scoped lang="less">
.user-info {
  width: 320px;
  height: 70px;
  margin: 0 auto;
  display: flex;
  background: #f2f2f2;
  align-items: center;
  padding: 0 10px;
  margin-bottom: 25px;
  img {
    background: #f2f2f2;
    width: 50px;
    height: 50px;
  }
  p {
    padding-left: 10px;
  }
}
.code {
  position: absolute;
  right: 0;
  top: 0;
  line-height: 50px;
  width: 80px;
  color: #999;
  &:hover {
    cursor: pointer;
  }
}
</style>
