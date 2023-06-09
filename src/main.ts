import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store, key } from './store'
// 引入element
import ElementPlus from 'element-plus'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
// 引入全局样式
import '@/styles/index.less'

// 引入动画
import 'animate.css'

import '@/icons/index'
import SvgIcon from '@/icons/SvgIcon.vue'
require('../mock/index')
// 正式环境中不显示console.log
if (process.env.NODE_ENV === 'production') {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    console.log = function () {}
}
createApp(App).use(store, key).use(router).use(ElementPlus, { locale }).component('svg-icon', SvgIcon).mount('#app')
