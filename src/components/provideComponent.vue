<!--
 * @Description: 
 * @Author: 李昶
 * @Date: 2022-08-08 23:22:28
 * @LastEditors: 李昶
 * @LastEditTime: 2022-08-09 09:28:17
 * @Profile: 一个比较废柴的前端开发
-->
<template>
    <div class="provide-component-wrapper">
        <p class="project__title">{{ provideRef }}</p>
    </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';

export default defineComponent({
    name: 'provideComponent',
    setup() {
        const provideRef = inject('provideRef');
        return { provideRef };
    },
});
</script>

<style></style>
