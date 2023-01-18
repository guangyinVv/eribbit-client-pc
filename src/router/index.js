import { createRouter, createWebHashHistory } from 'vue-router'
import home from '@/views/home/index.vue'
import Layout from '@/views/layout.vue'
import topCategory from '@/views/category/index.vue'
import subCategory from '@/views/category/sub.vue'
import Goods from '@/views/goods/index.vue'
import Login from '@/views/login/index.vue'
import LoginCallback from '@/views/login/callback.vue'
import Cart from '@/views/cart/index.vue'

const routes = [
  {
    // 一级路由布局容器
    path: '/',
    name: 'home',
    component: Layout,
    children: [
      { path: '/', component: home },
      { path: '/category/:id', component: topCategory },
      { path: '/category/sub/:id', component: subCategory },
      { path: '/product/:id', component: Goods },
      { path: '/cart', component: Cart }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/login/callback',
    name: 'LoginCallback',
    component: LoginCallback
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  // 控制路由跳转时网页移动到最顶端
  scrollBehavior () {
    return { top: 0 }
  }
})

export default router
