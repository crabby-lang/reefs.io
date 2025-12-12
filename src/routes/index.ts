import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../view/HomeView.vue'
import Package from '../view/PackageView.vue'
import Documentation from '../view/DocumentationView.vue'
import Community from '../view/CommunityView.vue'
import Publish from '../view/PublishView.vue'
import { verifySessionGuard } from '../lib/routeGuards'

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
    component: Documentation
  },
  {
    path: '/community',
    name: 'Community',
    component: Community
  },
  {
    path: '/publish',
    component: Publish
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

// Apply global guard to verify sessions
router.beforeEach(verifySessionGuard)

export default router
