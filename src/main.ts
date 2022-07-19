/*
 * @Description: 一个比较废柴的前端开发
 * @Author: 李昶
 * @Date: 2022-05-24 11:01:11
 * @LastEditors: 李昶
 * @LastEditTime: 2022-07-19 22:32:41
 */
import { createApp } from 'vue';
// npm i -S pinia
import { createPinia } from 'pinia';
import router from '@/router';
import App from './App.vue';
import './assets/css/global.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './assets/css/common.scss';
// 创建并且挂载实例
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(createPinia()).use(router).mount('#app');
