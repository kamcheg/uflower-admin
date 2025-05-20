import { createRouter, createWebHistory } from 'vue-router'
import { EmptyLayout } from '@/layouts/empty'
import { DefaultLayout } from '@/layouts/default'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../pages/page-home.vue'),
        },
        {
          path: 'products',
          name: 'products',
          component: () => import('../pages/page-products.vue'),
        },
        {
          path: 'orders',
          name: 'orders',
          component: () => import('../pages/page-orders.vue'),
        },
        {
          path: 'customers',
          name: 'customers',
          component: () => import('../pages/page-customers.vue'),
        },
      ]
    },
    {
      path: '',
      component: EmptyLayout,
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('../pages/page-login.vue'),
        }
      ]
    }
  ],
})

export default router
