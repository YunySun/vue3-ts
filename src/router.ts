/*
 * @Description: 一个比较废柴的前端开发
 * @Author: 李昶
 * @Date: 2022-06-22 21:36:52
 * @LastEditors: 李昶
 * @LastEditTime: 2022-07-19 23:00:02
 */
import { createRouter, createWebHashHistory } from 'vue-router';

export const routes = [
  {
    path: '/',
    name: 'homePageView',
    component: () => import('@/views/home.vue'),
    meta: {
      title: '首页',
    },
  },
  {
    path: '/provide',
    name: 'aboutProvideInject',
    component: () => import('@/views/aboutProvideInject.vue'),
    meta: {
      title: 'Vue Provide Inject',
    }
  },
  {
    path: '/state',
    name: 'aboutState',
    component: () => import('@/views/aboutState.vue'),
    meta: {
      title: 'Vue State',
    }
  },
  {
    path: '/useRequest',
    name: 'useRequestPage',
    component: () => import('@/views/useRequestPage.vue'),
    meta: {
      title: 'Request',
    }
  },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});