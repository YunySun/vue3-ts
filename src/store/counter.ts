/*
 * @Description:
 * @Author: 李昶
 * @Date: 2022-06-21 11:49:53
 * @LastEditors: 李昶
 * @LastEditTime: 2022-08-09 09:53:39
 * @Profile: 一个比较废柴的前端开发
 */
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counterStore', {
    state: () => ({
        counter: 0,
    }),
});
