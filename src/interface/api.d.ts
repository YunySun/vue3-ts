/*
 * @Description: 一个比较废柴的前端开发
 * @Author: 李昶
 * @Date: 2022-06-23 14:35:36
 * @LastEditors: 李昶
 * @LastEditTime: 2022-06-23 14:39:33
 */
export interface HttpResponse<T = any> {
  data: T,
  message: string,
  status: number,
}