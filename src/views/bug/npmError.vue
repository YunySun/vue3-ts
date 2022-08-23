<template>
    <div class="npm-wrapper article-wrapper">
        <h2 class="project__title article-title">
            1.Syntax Error: Thread Loader (Worker 0) Cannot read property ‘length’ of undefined
        </h2>
        <p>解决方法</p>
        <ul>
            <li>删除<code-txt>node_modules</code-txt>文件夹</li>
            <li>清理缓存<code-txt>npm cache clean -f</code-txt></li>
            <li>重新安装<code-txt>npm i</code-txt></li>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import codeTxt from '@/components/tools/codeTxt.vue';

export default defineComponent({
    components: { codeTxt },
    name: 'npmError',
});
</script>

<style scoped lang="scss"></style>
