<!--
 * @Description: 
 * @Author: 李昶
 * @Date: 2022-09-13 13:59:09
 * @LastEditors: 李昶
 * @LastEditTime: 2022-09-14 11:20:01
 * @Profile: 一个比较废柴的前端开发
-->
<template>
    <div class="advance-wrapper article-wrapper">
        <h2 class="article-title project__title">实现call、apply、bind函数</h2>
        <div class="article-tips warning">call、apply、bind函数是如何实现的</div>
        <h3 class="project__title">call的使用</h3>
        <highlightjs lang="js" :code="demo1" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import data from '@/data/advanceData';

export default defineComponent({
    name: 'advancePage',
    setup() {
        return {
            ...data,
        };
    },
});
</script>

<style scoped lang="scss"></style>
