import store from '@/store';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const CoachesList = () => import('@/pages/coaches/CoachesList.vue');
const CoachDetail = () => import('@/pages/coaches/CoachDetail.vue');
const ContactCoach = () => import('@/pages/requests/ContactCoach.vue');
const CoachRegistration = () => import('@/pages/coaches/CoachRegistration.vue');
const RequestsReceived = () => import('@/pages/requests/RequestsReceived.vue');

const UserAuth = () => import('@/pages/auth/UserAuth.vue');
const NotFound = () => import('@/pages/NotFound.vue');

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/coaches' },
  { path: '/coaches', component: CoachesList },
  {
    path: '/coaches/:id', component: CoachDetail, props: true,
    children: [
      { path: 'contact', component: ContactCoach }
    ]
  },
  { path: '/register', component: CoachRegistration, meta: { requiresAuth: true } },
  { path: '/requests', component: RequestsReceived, meta: { requiresAuth: true } },
  { path: '/auth', component: UserAuth, meta: { requiresUnAuth: true } },

  { path: '/:notFound(.*)', component: NotFound }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(function (to, from, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth')
  } else if (to.meta.requiresUnAuth && store.getters.isAuthenticated) {
    next('/coaches')
  } else {
    next()
  }
})

export default router
