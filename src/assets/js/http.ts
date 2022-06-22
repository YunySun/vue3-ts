import ajax from 'axios';
import Qs from 'qs';

// 默认请求地址
// console.log($baseUrl)
const instance = ajax.create({ timeout: 1000 * 12 });
instance.defaults.baseURL = 'http://androidmcdn.wisnovel.com/';

// 请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 请求拦截
instance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
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
  },
);

const url = 'wis_version=1.2.9&wis_device=04543F1160-7F58-4961-9E20-012ACC053645&wis_usercode=e3a52gDNp6JnM9gA1my8fV6ooC1HqF1YNHd7hPGW9mhXuq05%2BknTAPkGaYvejYlkfqWpJLAYc2385JmVgkwMo6pH%2B7ES&wis_sex=nan&wis_channel=appstore&action=get&imtest=1';

interface ClientParameters {
  wis_version: string,
  wis_device: string,
  wis_usercode: string,
  wis_sex: string,
  wis_channel: string,
}

let parameter = Qs.parse(url);
console.log(parameter);

function getAjaxPack(api: string, data) {
  if (data) {
    parameter = Object.assign(parameter, data);
  }
  return instance.get(
    `${api}?${Qs.stringify(parameter)}`,
  );
}

function postAjaxPack(api: string, data, params): Promise<void> {
  if (params) {
    parameter = Object.assign(parameter, params);
  }
  return instance.post(
    `${api}?${Qs.stringify(parameter)}`,
    Qs.stringify(data),
  );
}

export default {
  getAjaxPack,
  postAjaxPack,
};
