<!--
 * @Description: 
 * @Author: 李昶
 * @Date: 2022-08-30 15:46:50
 * @LastEditors: 李昶
 * @LastEditTime: 2022-09-01 16:54:37
 * @Profile: 一个比较废柴的前端开发
-->
<template>
    <div class="promise-wrapper article-wrapper">
        <h2 class="article-title project__title">简易Promise</h2>
        <highlightjs language="ts" :code="demo1" />
        <p>将要实现的调用</p>
        <highlightjs language="ts" :code="demo2" />
        <p>实现简易的Promise</p>
        <highlightjs language="ts" :code="demo3" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import data from '@/data/promiseData';

export default defineComponent({
    name: 'promisePage',
    setup() {
        return { ...data };
    },
});
</script>

<style scoped lang="scss"></style>
