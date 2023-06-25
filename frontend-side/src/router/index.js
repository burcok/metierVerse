import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/landingPage.vue')
    },
    {
      path: '/discover',
      name: 'discover',
      component: () => import('../views/pages/Discover.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/auth/Register.vue')
    },
    {
      path: '/resetpassword',
      name: 'resetPassword',
      component: () => import('../views/auth/resetPassword.vue')
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/pageNotFound.vue')
    },
  ]
})

export default router
