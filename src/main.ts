import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import { store } from '@/store/index'

// 引入element
import ElementPlus from 'element-plus'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
// 引入全局样式
import '@/styles/index.less'

// 引入动画
import 'animate.css'

import '../mock/index'

import 'virtual:svg-icons-register'
import SvgIcon from '@/icons/SvgIcon.vue'

createApp(App).use(store).use(router).use(ElementPlus, { locale }).component('svg-icon', SvgIcon).mount('#app')
