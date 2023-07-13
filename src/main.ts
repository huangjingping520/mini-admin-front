import { createApp } from 'vue'

// import './style.css'
import './index.css'
import '@/styles/index.scss'
import App from './App.vue'

import router from './router'
import store from './store'

import ElSvgIcon from './utils/el-svg-icon'

import 'virtual:svg-icons-register'
import svgIcon from '@/icons/SvgIcon.vue'

const app = createApp(App)
app.use(ElSvgIcon)
app.component('SvgIcon', svgIcon)

app.use(router)
app.use(store)

app.mount('#app')
