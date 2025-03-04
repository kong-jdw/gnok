import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/PageHome.vue'),
    },
    {
      path: '/:serviceId',
      name: 'service',
      component: () => import('../views/PageService.vue'),
    },
  ],
})

export default router
