<!--
 * @Description: 
 * @Author: 李昶
 * @Date: 2022-09-13 13:59:09
 * @LastEditors: 李昶
 * @LastEditTime: 2022-09-13 16:58:16
 * @Profile: 一个比较废柴的前端开发
-->
<template>
    <div class="advance-wrapper article-wrapper">
        <h2 class="article-title project__title">实现call、apply、bind函数</h2>
        <div class="article-tips warning">call、apply、bind函数是如何实现的</div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'advancePage',
    setup() {
        Function.prototype.myCall = function (ctx) {
            console.log(this, [...arguments].slice(1));
        };
        function c() {
            return this.b;
        }
        const a = { b: 1 };
        const d = c.myCall(a, 1);
        console.log(d);
        return {};
    },
});
</script>

<style scoped lang="scss"></style>
