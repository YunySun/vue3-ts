import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'homePageView',
    component: () => import('@/views/home.vue'),
  },
  {
    path: '/state',
    name: 'aboutState',
    component: () => import('@/views/aboutState.vue'),
  },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
