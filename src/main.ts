import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import library from '@/components/library'
// 重置样式的库
import 'normalize.css'
// 自己的样式库
import '@/assets/styles/common.less'
// 导入mockjs
import '@/mockjs/index'

const app = createApp(App)
app.use(library)
app.use(store)
app.use(router).mount('#app')
