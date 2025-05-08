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
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})

export default router
