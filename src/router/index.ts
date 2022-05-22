import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const CoachesList = () => import('@/pages/coaches/CoachesList.vue');
const CoachDetail = () => import('@/pages/coaches/CoachDetail.vue');
const ContactCoach = () => import('@/pages/requests/ContactCoach.vue');

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

  { path: '/auth', component: UserAuth },
  { path: '/:notFound(.*)', component: NotFound }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
