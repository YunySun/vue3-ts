<!--
 * @Description: 一个比较废柴的前端开发
 * @Author: 李昶
 * @Date: 2022-06-22 21:36:52
 * @LastEditors: 李昶
 * @LastEditTime: 2022-07-20 15:18:32
-->
<template>
    <div class="home-wpp">
        <router-link to="/provide">07关于Provide和Inject</router-link>
        <router-link to="/useRequest">08使用Axios请求</router-link>
        <router-link to="/state">关于状态管理Pinia</router-link>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'homePageView',
    setup() {
        console.log('123');
    },
});
</script>

<style scoped lang="scss"></style>
