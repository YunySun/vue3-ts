/*
 * @Description: 一个比较废柴的前端开发
 * @Author: 李昶
 * @Date: 2022-06-22 08:20:15
 * @LastEditors: 李昶
 * @LastEditTime: 2022-08-24 15:00:56
 */
// axios.js
import { ref } from 'vue';
import { BookstoreBooks, ListModulesData } from '@/interface/bookstore';
import { listModules } from '../api/bookstore';
import { HttpResponse } from '../interface/api';

export function useRequest(data: ListModulesData) {
    const error = ref<HttpResponse>(null);
    const response = ref<BookstoreBooks[]>(null);

    listModules(data).then((res) => {
        if (+res.status === 1) {
            response.value = res.data;
        } else {
            error.value = res;
        }
    });

    return {
        error,
        response,
    };
}
