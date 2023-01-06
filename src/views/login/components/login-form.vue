<template>
  <div class="account-box">
    <div class="toggle">
      <a @click="changeMode(true)" href="javascript:;" v-if="!isMsgLogin"> <i class="iconfont icon-user"></i> 使用短信登录 </a>
      <a @click="changeMode(false)" href="javascript:;" v-else> <i class="iconfont icon-msg"></i> 使用账号登录 </a>
    </div>
    <!-- <v-form ref="target" class="form" :validation-schema="schema" v-slot="{ errors }"> -->
    <v-form ref="target" class="form" v-slot="{ errors }">
      <template v-if="!isMsgLogin">
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
              </svg>
            </i>
            <v-field :rules="schema.account" :class="{ error: errors.account }" v-model="form.account" name="account" type="text" placeholder="请输入用户名" />
            <!-- <ErrorMessage name="account" /> -->
          </div>
          <div v-if="errors.account" class="error">
            <i class="iconfont icon-warning">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
              </svg>
            </i>
            {{ errors.account }}
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-lock">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lock" viewBox="0 0 16 16">
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
              </svg>
            </i>
            <v-field :rules="schema.password" :class="{ error: errors.password }" v-model="form.password" name="password" type="password" placeholder="请输入密码" />
          </div>
          <div v-if="errors.password" class="error">
            <i class="iconfont icon-warning">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
              </svg>
            </i>
            {{ errors.password }}
          </div>
        </div>
      </template>
      <template v-else>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
              </svg>
            </i>
            <v-field :rules="schema.mobile" :class="{ error: errors.mobile }" v-model="form.mobile" name="mobile" type="text" placeholder="请输入手机号" />
          </div>
          <div v-if="errors.mobile" class="error">
            <i class="iconfont icon-warning">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
              </svg>
            </i>
            {{ errors.mobile }}
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-code">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-shield-check" viewBox="0 0 16 16">
                <path
                  d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z"
                />
                <path d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
              </svg>
            </i>
            <v-field :rules="schema.code" :class="{ error: errors.code }" v-model="form.code" name="code" type="text" placeholder="请输入验证码" />
            <span @click="sendMsg" class="code">{{ restTime > 0 ? restTime + '秒后发送' : '发送验证码' }}</span>
          </div>
          <div v-if="errors.code" class="error">
            <i class="iconfont icon-warning">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
              </svg>
            </i>
            {{ errors.code }}
          </div>
        </div>
      </template>
      <div class="form-item">
        <div class="agree">
          <v-field :rules="schema.isAgree" as="XtxCheckbox" name="isAgree" v-model="form.isAgree" />
          <span>我已同意</span>
          <a href="javascript:;">《隐私条款》</a>
          <span>和</span>
          <a href="javascript:;">《服务条款》</a>
        </div>
        <div v-if="errors.isAgree" class="error">
          <i class="iconfont icon-warning">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
            </svg>
          </i>
          {{ errors.isAgree }}
        </div>
      </div>
      <a @click="login" href="javascript:;" class="btn">登录</a>
    </v-form>
    <div class="action">
      <!-- <span id="qqLoginBtn"></span> -->
      <a href="https://graph.qq.com/oauth2.0/authorize?client_id=100556005&response_type=token&scope=all&redirect_uri=http%3A%2F%2Fwww.corho.com%3A8080%2F%23%2Flogin%2Fcallback">
        <img src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png" alt="" />
      </a>
      <div class="url">
        <a href="javascript:;">忘记密码</a>
        <a href="javascript:;">免费注册</a>
      </div>
    </div>
  </div>
  <!-- <XtxMessage text="手机号或密码错误" type="error" /> -->
</template>
<script lang="ts">
import Message from '@/components/library/Message'
import { reactive, ref } from 'vue'
import { Form as VForm, Field as VField } from 'vee-validate'
import schemaFunc from '@/utils/vee-validate-schema'
import { userAccountLogin, userMobileLogin, userMobileLoginMsg } from '@/api/user'
import store from '@/store'
import { useRoute, useRouter } from 'vue-router'
import sendCodeDelay from '@/utils/sendCode'
export default {
  name: 'LoginForm',
  components: { VForm, VField },
  setup() {
    // 是否短信登录
    const isMsgLogin = ref(false)
    // 表单信息对象
    type FormType = {
      isAgree?: boolean
      account?: null | string
      password?: null | string
      mobile?: null | string
      code?: null | string
    }
    const form: FormType = reactive({
      isAgree: false,
      account: null,
      password: null,
      mobile: null,
      code: null
    })
    const schema = {
      // 校验函数规则：返回true表示成功，返回字符串表示错误信息
      account: schemaFunc.account,
      password: schemaFunc.password,
      mobile: schemaFunc.mobile,
      code: schemaFunc.code,
      isAgree: schemaFunc.isAgree
    }
    // Form组件的实例
    const target: any = ref(null)
    // 切换短信登录和密码登录
    const changeMode = (flag: boolean) => {
      const a = target.value.resetForm()
      if (flag === isMsgLogin.value) return
      isMsgLogin.value = flag
      const tempCode = form.isAgree
      // target.value.validate().then(() => {
      form.isAgree = tempCode
      form.account = ''
      form.password = ''
      form.mobile = ''
      form.code = ''
      // })
    }

    const { restTime, sendMsg, checkCode } = sendCodeDelay(form, userMobileLoginMsg, target, '发送验证码失败')
    const router = useRouter()
    const route = useRoute()
    const login = async () => {
      // target.value.resetForm()
      // 在登录前先进行表单校验
      const { valid }: { valid: boolean } = await target.value.validate()
      if (!valid) return
      // 表单校验成功，可以继续执行操作
      // 分为账号密码登录和短信验证码登录
      let data: any
      try {
        if (isMsgLogin.value) {
          // 如果未发送验证码
          if (!checkCode.value) {
            Message({ type: 'warn', text: '还未发送验证码' })
            return
          }
          const { mobile, code } = form
          if (mobile && code) {
            data = await userMobileLogin(mobile, code)
          }
        } else {
          const { account: account1, password: password1 } = form
          if (account1 && password1) {
            data = await userAccountLogin(account1, password1)
          }
        }
      } catch (e: any) {
        if (e.response && e.response.data) {
          Message({ type: 'error', text: e.response.data.message || '登录失败' })
        }
      }
      if (data) {
        const { id, account, avatar, mobile, nickname, token } = data.result
        store.commit('setUser', { id, account, avatar, mobile, nickname, token })
        // 进行跳转
        const redirectUrl: any = route.query.redirectUrl
        router.push(redirectUrl || '/')
        Message({ type: 'success', text: '登录成功' })
      }
    }
    return { isMsgLogin, form, schema, changeMode, target, login, sendMsg, restTime }
  }
}
</script>
<style scoped lang="less">
// 账号容器
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;
    a {
      color: @xtxColor;
      i {
        font-size: 14px;
      }
    }
  }
  .form {
    padding: 0 40px;
    &-item {
      margin-bottom: 28px;
      .input {
        position: relative;
        height: 36px;
        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }
        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;
          &.error {
            border-color: @priceColor;
          }
          &.active,
          &:focus {
            border-color: @xtxColor;
          }
        }
        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }
      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }
    .agree {
      a {
        color: #069;
      }
    }
    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: @xtxColor;
      &.disabled {
        background: #cfcdcd;
      }
    }
  }
  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>
