/*
 * @Description: 一个比较废柴的前端开发
 * @Author: 李昶
 * @Date: 2022-05-24 11:01:11
 * @LastEditors: 李昶
 * @LastEditTime: 2022-06-24 13:50:20
 */
import { createApp } from 'vue';
// npm i -S pinia
import { createPinia } from 'pinia';
import router from '@/router';
import App from './App.vue';
// import { ElButton } from 'element-plus';
// import 'element-plus/dist/index.css'

// 创建并且挂载实例
const app = createApp(App);

// app.use(ElButton);
app.use(createPinia()).use(router).mount('#app');
