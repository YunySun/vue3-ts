/*
 * @Description:
 * @Author: 李昶
 * @Date: 2022-08-09 10:05:50
 * @LastEditors: 李昶
 * @LastEditTime: 2022-08-09 11:13:02
 * @Profile: 一个比较废柴的前端开发
 */
import { defineStore } from 'pinia';
import { User } from '@/interface/common';

interface UserStore {
    user: User;
}

export const useUser = defineStore('userStore', {
    state: (): UserStore => ({
        user: {
            username: '',
            nickname: '',
            avatar: '',
            tel: '',
        },
    }),
});
