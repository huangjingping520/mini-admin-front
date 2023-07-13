import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Main from '@/views/main/index.vue'
import DashBoard from '@/views/dashboard/index.vue'

// 配置路由信息
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/home',
    name: 'Home',
    redirect: '/home/main',
    component: () => import('@/views/home/index.vue'),
    children: [
      {
        path: 'main',
        name: 'Main',
        component: Main,
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: DashBoard,
      },
    ],
  },
  // {
  //   path: '/main',
  //   name: 'Main',
  //   component: () => import('@/views/main/index.vue'),
  // },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/register/index.vue'),
  },
  // {
  //   path: '/dashboard',
  //   name: 'Dashboard',
  //   component: () => import('@/views/dashboard/index.vue'),
  // },

]

const router = createRouter({
  routes,
  history: createWebHistory(),
})

// const basicStore = useStore()

// router.beforeEach(async (to) => {
//   if (basicStore.token) {
//     if (to.path === '/')
//       return '/main'
//   }
// })
export default router
