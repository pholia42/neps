import { createRouter, createWebHashHistory } from 'vue-router';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import Home from '@/views/Home.vue';
import History from '@/views/History.vue';
import selGrid from '@/views/selGrid.vue';
import selAQI from '@/views/selAQI.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/reg',
    name: 'Register',
    component: Register,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/history',
    name: 'History',
    component: History,
    meta: { requiresAuth: true } 
  },
  {
    path: '/selgrid',
    name: 'selGrid',
    component: selGrid,
    meta: { requiresAuth: true } 
  },
  {
    path: '/selaqi',
    name: 'selAQI',
    component: selAQI,
    meta: { requiresAuth: true } 
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

// 导航守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!token) {
      next({
        path: '/',
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
