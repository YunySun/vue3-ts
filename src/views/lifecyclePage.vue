<!--
 * @Description: V3组合式生命周期
 * @Author: 李昶
 * @Date: 2022-08-05 17:01:17
 * @LastEditors: 李昶
 * @LastEditTime: 2022-08-07 11:54:33
 * @Profile: 一个比较废柴的前端开发
-->
<template>
    <div class="lifecycle-wrapper">
        <h3 class="project__title">声明周期</h3>
        <el-timeline>
            <el-timeline-item :timestamp="setupTimestamp"> setup </el-timeline-item>
            <el-timeline-item :timestamp="beforeCreateTimestamp"> beforeCreate </el-timeline-item>
            <el-timeline-item :timestamp="createdTimestamp"> created </el-timeline-item>
        </el-timeline>
    </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, ref } from 'vue';

export default defineComponent({
    name: 'lifecyclePage',
    // setup不需要beforeCreate created生命周期钩子函数
    data() {
        return {
            beforeCreateTimestamp: '',
            createdTimestamp: '',
        };
    },
    beforeCreate() {
        const timestamp = `${new Date().getTime()}`;
        console.log(`beforeCreate时间戳:${timestamp}`);
        this.$nextTick(() => {
            this.beforeCreateTimestamp = timestamp;
        });
    },
    created() {
        this.createdTimestamp = `${new Date().getTime()}`;
        console.log(`created时间戳:${this.createdTimestamp}`);
    },
    setup() {
        const setupTimestamp = ref<string>(`${new Date().getTime()}`);
        console.log(`setup时间戳:${setupTimestamp.value}`);
        return { setupTimestamp };
    },
});
</script>

<style></style>
