import { createApp } from 'vue'
import ElementPlus from 'element-plus'

import App from './App.vue'

import { router } from '@/router'

import '@/design/index.scss'
//重置样式的包
import 'normalize.css'
import { createPinia } from 'pinia'

createApp(App).use(router).use(ElementPlus).use(createPinia).mount('#app')
