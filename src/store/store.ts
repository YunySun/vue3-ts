/*
 * @Description:
 * @Author: 李昶
 * @Date: 2022-06-21 09:20:26
 * @LastEditors: 李昶
 * @LastEditTime: 2022-08-09 09:55:06
 * @Profile: 一个比较废柴的前端开发
 */
import { defineStore } from 'pinia';

// 第一个参数是应用程序中
/** 创建一个用于全局存储数据实例的useStore函数 可以是useStore、useUser...
 * @param {string} id state的唯一id
 * @param options 配置参数
 */
export const useStore = defineStore('store', {
    // 推荐使用 完整的类型判断的箭头函数
    state: () => ({
        // 所有属性都将自动推断出类型
        counter: 0,
        name: 'Michael',
        isAdmin: true,
        items: [],
    }),
});
