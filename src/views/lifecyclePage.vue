<!--
 * @Description: V3组合式生命周期
 * @Author: 李昶
 * @Date: 2022-08-05 17:01:17
 * @LastEditors: 李昶
 * @LastEditTime: 2022-08-05 17:19:55
 * @Profile: 一个比较废柴的前端开发
-->
<template>
    <div class="lifecycle-wrapper">
        <h3 class="project__title">声明周期{{ setupTimestamp }}}</h3>
    </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, ref } from 'vue';

export default defineComponent({
    name: 'lifecyclePage',
    // setup不需要beforeCreate created生命周期钩子函数
    setup() {
        const setupTimestamp = ref<Date>(new Date());
        return { setupTimestamp };
    },
});
</script>

<style></style>
