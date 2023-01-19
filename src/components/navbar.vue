<template>
  <!-- 顶部组件 -->
  <nav>
    <div class="container">
      <ul>
        <template v-if="profile.token">
          <li>
            <a href="javascript:;">{{ profile.nickname }}</a>
          </li>
          <li @click="logout"><a href="javascript:;">退出登录</a></li>
        </template>
        <template v-else>
          <li><RouterLink to="/login">请先登录</RouterLink></li>
          <li><a href="javascript:;">免费注册</a></li>
        </template>
        <li><a href="javascript:;">我的订单</a></li>
        <li><a href="javascript:;">会员中心</a></li>
        <li><a href="javascript:;">帮助中心</a></li>
        <li><a href="javascript:;">关于我的</a></li>
        <li><a href="javascript:;">手机版</a></li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
import router from '@/router'
export default {
  setup() {
    const store = useStore()
    const profile = computed(() => {
      return store.state.user.profile
    })
    // 退出登录
    const logout = () => {
      store.commit('user/setUser', {})
      router.push('/login')
      // 清空购物车
      store.commit('cart/setCart', [])
    }
    return { profile, logout }
  }
}
</script>

<style lang="less" scoped>
nav {
  background-color: #333;
}

.container {
  background-color: #333;

  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    margin: 0;

    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;

        i {
          font-size: 14px;
          margin-right: 2px;
        }

        &:hover {
          color: @xtxColor;
        }
      }

      ~ li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>
>
