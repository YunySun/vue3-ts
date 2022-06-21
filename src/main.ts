import { createApp } from 'vue';
// npm i -S pinia
import { createPinia } from 'pinia';
import App from './App.vue';
import http from './assets/js/http';
import router from './router';

const { postAjaxPack, getAjaxPack } = http;
// 创建并且挂载实例
const app = createApp(App);
app.config.globalProperties.$_GET = getAjaxPack;
app.config.globalProperties.$_POST = postAjaxPack;

app.use(createPinia()).use(router).mount('#app');
