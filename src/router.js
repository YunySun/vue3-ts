import { createRouter, createWebHistory } from 'vue-router';

const Home = () => import('./views/home.vue');

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
