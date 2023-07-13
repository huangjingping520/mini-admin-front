import { createApp } from 'vue'

// import './style.css'
import './index.css'
import '@/styles/index.scss'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'

import ElSvgIcon from './utils/el-svg-icon'

import 'virtual:svg-icons-register'
import svgIcon from '@/icons/SvgIcon.vue'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

app.use(ElSvgIcon)
app.component('SvgIcon', svgIcon)

app.use(router)

app.mount('#app')
