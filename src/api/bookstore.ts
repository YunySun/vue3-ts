/*
 * @Description: 一个比较废柴的前端开发
 * @Author: 李昶
 * @Date: 2022-06-23 13:53:09
 * @LastEditors: 李昶
 * @LastEditTime: 2022-06-23 16:50:51
 */
import request from '@/api/request';
import qs from 'qs'
import { BookstoreBooks, ListModulesData } from '@/interface/bookstore'
import { HttpResponse } from '@/interface/api';

export const listModules = (data: ListModulesData): Promise<HttpResponse<BookstoreBooks[]>> => {
  return request.post('listmodules', qs.stringify(data))
}