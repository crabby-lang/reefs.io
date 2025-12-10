import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../view/HomeView.vue'
import Package from '../view/PackageView.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/packages',
    name: 'Packages',
    component: Package
  },
  {
    path: '/features',
    name: 'Features',
    component: Home
  },
  {
    path: '/docs',
    name: 'Docs',
    component: Home
  },
  {
    path: '/community',
    name: 'Community',
    component: Home
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to: any, from: any, savedPosition: any) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router
