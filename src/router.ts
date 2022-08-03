/*
 * @Description: 一个比较废柴的前端开发
 * @Author: 李昶
 * @Date: 2022-06-22 21:36:52
 * @LastEditors: 李昶
 * @LastEditTime: 2022-08-03 22:27:39
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import commonLayout from './layout/commonLayout.vue';

export const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'homePageView',
        component: () => import('@/views/home.vue'),
        meta: {
            title: '首页',
            icon: 'HomeFilled',
        },
    },
    {
        path: '/vue',
        name: 'vue',
        redirect: '/vue/state',
        component: commonLayout,
        meta: { title: 'Vue', icon: 'Menu' },
        children: [
            {
                path: 'state',
                name: 'aboutState',
                component: () => import('@/views/aboutState.vue'),
                meta: {
                    title: 'State',
                },
            },
            {
                path: 'provide',
                name: 'aboutProvideInject',
                component: () => import('@/views/aboutProvideInject.vue'),
                meta: {
                    title: 'Provide Inject',
                },
            },
        ],
    },
    {
        path: '/useRequest',
        name: 'useRequestPage',
        component: () => import('@/views/useRequestPage.vue'),
        meta: {
            title: 'Request',
            icon: 'connection',
        },
    },
];

export default createRouter({
    history: createWebHashHistory(),
    routes,
});
