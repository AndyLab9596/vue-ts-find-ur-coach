import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const CoachesList = () => import('@/pages/coaches/CoachesList.vue');

const UserAuth = () => import('@/pages/auth/UserAuth.vue');
const NotFound = () => import('@/pages/NotFound.vue');

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/coaches' },
  { path: '/coaches', component: CoachesList },

  { path: '/auth', component: UserAuth },
  { path: '/:notFound(.*)', component: NotFound }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
