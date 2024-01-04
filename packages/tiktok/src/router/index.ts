import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '../views/index/index.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: IndexView
    },
    {
      path: '/follow',
      name: 'follow',
      component: () => import('@/views/follow/index.vue')
    },
    {
      path: '/message',
      name: 'message',
      component: () => import('@/views/message/index.vue')
    },
    {
      path: '/mine',
      name: 'mine',
      component: () => import('@/views/mine/index.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('@/views/search/index.vue')
    }
  ]
})

export default router
