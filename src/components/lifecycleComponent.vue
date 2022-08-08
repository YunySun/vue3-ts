<!--
 * @Description: V3组合式生命周期
 * @Author: 李昶
 * @Date: 2022-08-05 17:01:17
 * @LastEditors: 李昶
 * @LastEditTime: 2022-08-08 13:47:00
 * @Profile: 一个比较废柴的前端开发
-->
<template>
    <div class="lifecycle-wrapper">
        <el-timeline>
            <el-timeline-item :timestamp="setupTimestamp"> 子组件setup </el-timeline-item>
            <el-timeline-item :timestamp="beforeCreateTimestamp"> 子组件beforeCreate </el-timeline-item>
            <el-timeline-item :timestamp="createdTimestamp"> 子组件created </el-timeline-item>
            <el-timeline-item :timestamp="beforeMountTimestamp"> 子组件beforeMount </el-timeline-item>
            <el-timeline-item :timestamp="mountedTimestamp"> 子组件mounted </el-timeline-item>
            <el-timeline-item :timestamp="beforeUpdateTimestamp">子组件beforeUpdate </el-timeline-item>
            <el-timeline-item :timestamp="updatedTimestamp"> 子组件updated </el-timeline-item>
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
    props: ['childData'],
    beforeCreate() {
        const timestamp = `${new Date().getTime()}`;
        console.log(`子组件beforeCreate时间戳:${timestamp}`);
        this.$nextTick(() => {
            this.beforeCreateTimestamp = timestamp;
        });
    },
    created() {
        this.createdTimestamp = `${new Date().getTime()}`;
        console.log(`子组件created时间戳:${this.createdTimestamp}`);
    },
    setup() {
        const setupTimestamp = ref<string>(`${new Date().getTime()}`);
        const beforeMountTimestamp = ref<string>('');
        const mountedTimestamp = ref<string>('');
        const beforeUpdateTimestamp = ref<string>('');
        const updatedTimestamp = ref<string>('');
        console.log(`子组件setup时间戳:${setupTimestamp.value}`);

        onBeforeMount(() => {
            beforeMountTimestamp.value = `${new Date().getTime()}`;
            console.log(`子组件beforeMount时间戳:${beforeMountTimestamp.value}`);
        });

        onMounted(() => {
            mountedTimestamp.value = `${new Date().getTime()}`;
            console.log(`子组件mounted时间戳:${mountedTimestamp.value}`);
        });

        onBeforeUpdate(() => {
            beforeUpdateTimestamp.value = `${new Date().getTime()}`;
            console.log(`子组件beforeUpdate时间戳:${beforeUpdateTimestamp.value}`);
        });

        onUpdated(() => {
            updatedTimestamp.value = `${new Date().getTime()}`;
            console.log(`子组件updated时间戳:${updatedTimestamp.value}`);
        });

        return { setupTimestamp, beforeMountTimestamp, mountedTimestamp, beforeUpdateTimestamp, updatedTimestamp };
    },
});
</script>

<style></style>
