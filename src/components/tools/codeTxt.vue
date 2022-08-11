<!--
 * @Description: 
 * @Author: 李昶
 * @Date: 2022-08-11 15:58:04
 * @LastEditors: 李昶
 * @LastEditTime: 2022-08-11 16:03:38
 * @Profile: 一个比较废柴的前端开发
-->
<template>
    <code><slot></slot></code>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'codeTxt',
});
</script>

<style scoped lang="scss">
code {
    background-color: #fff5f5;
    color: #ff502c;
    padding: 1px 5px;
}
</style>
