<!--
 * @Description: 
 * @Author: 李昶
 * @Date: 2022-08-08 23:22:28
 * @LastEditors: 李昶
 * @LastEditTime: 2022-08-08 23:37:21
 * @Profile: 一个比较废柴的前端开发
-->
<template>
    <div class="provide-component-wrapper">
        <p>{{ provideRef }}</p>
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
