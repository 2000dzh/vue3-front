import '@/design/index.scss';
//重置样式的包
import 'normalize.css'

import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'
import { router } from '@/router'

createApp(App).use(router).use(ElementPlus).use(createPinia).mount('#app')
