/*
 * @Description: 一个比较废柴的前端开发
 * @Author: 李昶
 * @Date: 2022-06-22 21:36:52
 * @LastEditors: 李昶
 * @LastEditTime: 2022-08-09 15:21:35
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
                path: 'reactive',
                name: 'reactivePage',
                component: () => import('@/views/reactivePage.vue'),
                meta: {
                    title: 'Reactive',
                },
            },
            {
                path: 'ref',
                name: 'refPage',
                component: () => import('@/views/refPage.vue'),
                meta: {
                    title: 'Ref',
                },
            },
            {
                path: 'computed',
                name: 'computedPage',
                component: () => import('@/views/computedPage.vue'),
                meta: {
                    title: 'Computed',
                },
            },
            {
                path: 'lifecycle',
                name: 'lifecyclePage',
                component: () => import('@/views/lifecyclePage.vue'),
                meta: {
                    title: 'Lifecycle',
                },
            },
            {
                path: 'watch',
                name: 'watchPage',
                component: () => import('@/views/watchPage.vue'),
                meta: {
                    title: 'Watch',
                },
            },
            {
                path: 'provide',
                name: 'providePage',
                component: () => import('@/views/providePage.vue'),
                meta: {
                    title: 'Provide',
                },
            },
            {
                path: 'state',
                name: 'statePage',
                component: () => import('@/views/statePage.vue'),
                meta: {
                    title: 'State',
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
    {
        path: '/edit',
        name: 'editPage',
        component: () => import('@/views/editPage.vue'),
        meta: {
            title: '编辑器',
            icon: 'Document',
        },
    },
];

export default createRouter({
    history: createWebHashHistory(),
    routes,
});
