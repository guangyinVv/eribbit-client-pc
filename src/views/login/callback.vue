<template>
  <LoginHeader>联合登录</LoginHeader>
  <section class="container" v-if="isBind">
    <div class="unbind">
      <div class="loading"></div>
    </div>
  </section>
  <section class="container" v-else>
    <nav class="tab">
      <a @click="hasAccount = true" :class="{ active: hasAccount }" href="javascript:;">
        <i class="iconfont icon-bind" />
        <span>已有小兔鲜账号，请绑定手机</span>
      </a>
      <a @click="hasAccount = false" :class="{ active: !hasAccount }" href="javascript:;">
        <i class="iconfont icon-edit" />
        <span>没有小兔鲜账号，请完善资料</span>
      </a>
    </nav>
    <div class="tab-content" v-if="hasAccount">
      <CallbackBind :unionId="unionId" />
    </div>
    <div class="tab-content" v-else>
      <CallbackPatch :unionId="unionId" />
    </div>
  </section>
  <LoginFooter />
</template>

<script lang="ts">
import { ref } from 'vue'
import { userQQLogin } from '@/api/user'
import LoginHeader from './components/login-header.vue'
import LoginFooter from './components/login-footer.vue'
import CallbackBind from './components/callback-bind.vue'
import CallbackPatch from './components/callback-patch.vue'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import QC from 'qc'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Message from '@/components/library/Message'
export default {
  name: 'PageCallback',
  components: { LoginHeader, LoginFooter, CallbackBind, CallbackPatch },
  setup() {
    const hasAccount = ref(true)
    // const nickname = ref(null)
    // const avatar = ref(null)
    // return { hasAccount, nickname, avatar }
    const isBind = ref(true)
    const store = useStore()
    const router = useRouter()
    const unionId = ref('')
    if (QC.Login.check()) {
      QC.Login.getMe((openId: string) => {
        unionId.value = openId
        // openId是用户的唯一标识
        userQQLogin(openId)
          .then((data: any) => {
            // 如果没出错，证明已经绑定，肯定就跳转去登录了
            const { id, account, avatar, mobile, nickname, token } = data.result
            store.commit('user/setUser', { id, account, avatar, mobile, nickname, token })
            store.dispatch('cart/mergeCart').then(() => {
              router.push(store.state.user.redirectUrl)
              Message({ type: 'success', text: '登录成功' })
              isBind.value = false
            })
          })
          .catch((e) => {
            // 出错表示还没有跟小兔鲜进行绑定
            isBind.value = false
          })
      })
    }

    return { hasAccount, isBind, unionId }
  }
}
</script>

<style scoped lang="less">
.container {
  padding: 25px 0;
  position: relative;
  height: 730px;
  .unbind {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 25px 0;
    z-index: 99;
    .loading {
      height: 100%;
      background: #fff url(../../assets/images/load.gif) no-repeat center / 100px 100px;
    }
  }
}
.tab {
  background: #fff;
  height: 80px;
  padding-top: 40px;
  font-size: 18px;
  text-align: center;
  a {
    color: #666;
    display: inline-block;
    width: 350px;
    line-height: 40px;
    border-bottom: 2px solid #e4e4e4;
    i {
      font-size: 22px;
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
      margin-left: 4px;
    }
    &.active {
      color: @xtxColor;
      border-color: @xtxColor;
    }
  }
}
.tab-content {
  min-height: 600px;
  background: #fff;
}
</style>
