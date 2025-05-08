import './assets/main.css'
import 'element-plus/dist/index.css'
import '@/shared/utils/axios.ts'
import queryClient from '@/shared/utils/queryClient.ts'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import { VueQueryPlugin } from '@tanstack/vue-query'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.use(VueQueryPlugin, { queryClient })

app.mount('#app')
