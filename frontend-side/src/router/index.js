import { createRouter, createWebHistory } from 'vue-router'
import { getCurrentUser } from '../utils/getCurrentUser';

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
      path: '/resetPassword',
      name: 'resetPassword',
      component: () => import('../views/auth/resetPassword.vue')
    },
    {
      path: '/adminDashboard',
      name: 'adminDashboard',
      component: () => import('../views/admin/adminDashboard.vue'),
      meta: { requiresAdmin: true },
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/pageNotFound.vue')
    },
  ]
})


const getSelectedUser = () => {
  return new Promise((resolve, reject) => {
    try {
      const user = getCurrentUser();
      if (user) {
        resolve(user);
      } else {
        reject("User not found");
      }
    } catch (error) {
      reject(error);
    }
  });
};


const getUserRole = async () => {
  try {
    const userData = await getSelectedUser();
    return userData.userStatus;
  } catch (error) {
    console.log('Error getting user role:', error);
    return null;
  }
};

router.beforeEach(async (to, from, next) => {
  try {
    if (to.matched.some((record) => record.meta.requiresAdmin)) {
      const userRole = await getUserRole();

      if (userRole === "admin") {
        next()
      } else {
        next("/")
      }
    }
    else {
      next();
    }
  } catch (error) {
    next("/login");
  }

})

export default router
