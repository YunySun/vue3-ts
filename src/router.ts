import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'homePageView',
    component: () => import('@/views/home.vue'),
  },
  {
    path: '/provide',
    name: 'aboutProvideInject',
    component: () => import('@/views/aboutProvideInject.vue'),
  },
  {
    path: '/state',
    name: 'aboutState',
    component: () => import('@/views/aboutState.vue'),
  },
  {
    path: '/useRequest',
    name: 'useRequestPage',
    component: () => import('@/views/useRequestPage.vue'),
  },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
