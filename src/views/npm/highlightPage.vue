<template>
    <div class="highlight-wrapper article-wrapper">
        <h2 class="article-title">Highlight.js</h2>
        <h2 class="article-title">安装</h2>
        <div class="article-tips">npm i -S highlight.js @highlightjs/vue-plugin</div>
        <h2 class="article-title">main.ts文件中引入</h2>
        <highlightjs language="ts" :code="mainTsCode" />
        <h2 class="article-title">在vue文件中调用</h2>
        <highlightjs language="ts" :code="vueCode" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'highlightPage',
    setup() {
        const mainTsCode = `import { createApp } from 'vue';
// npm i -S pinia
import { createPinia } from 'pinia';
import router from '@/router';
import highlightVuePlugin from '@highlightjs/vue-plugin';
import 'highlight.js/styles/monokai-sublime.css';
import 'highlight.js/lib/common';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import App from './App.vue';
import './assets/css/global.css';
import './assets/css/common.scss';
// 创建并且挂载实例
const app = createApp(App);
app.use(highlightVuePlugin);

Object.keys(ElementPlusIconsVue).forEach((item) => {
    app.component(item, ElementPlusIconsVue[item]);
});
// console.log(Object.entries(ElementPlusIconsVue));

// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//     app.component(key, component);
// }

app.use(createPinia()).use(router).mount('#app');`;

        const vueCode = `<highlightjs language="ts" autodetect :code="mainTs" />`;
        return { mainTsCode, vueCode };
    },
});
</script>

<style scoped lang="scss"></style>
