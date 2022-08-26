/*
 * @Description: 一个比较废柴的前端开发
 * @Author: 李昶
 * @Date: 2022-06-14 16:38:24
 * @LastEditors: 李昶
 * @LastEditTime: 2022-08-26 10:52:28
 */
import ajax from 'axios';
import Qs from 'qs';

// 默认请求地址
// console.log($baseUrl)
const instance = ajax.create({ timeout: 1000 * 12, baseURL: '/' });
// 请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const url = '';

const parameter = Qs.parse(url);
// 请求拦截
instance.interceptors.request.use(
    (config) => {
        config.params = {
            ...parameter,
            ...config.params,
        };
        return config;
    },
    (error) => Promise.reject(error)
);

// 响应拦截器
// 设置ajax的返回拦截(可以设置request拦截)
instance.interceptors.response.use(
    (response) => {
        // Indicator.close();
        if (response.status === 200) {
            return Promise.resolve(response.data);
        }
        return Promise.reject(response);
    },
    (error) => {
        if (error.message.includes('timeout')) {
            return Promise.reject(new Error('timeout'));
        }
        return Promise.reject(error);
    }
);
export default instance;
