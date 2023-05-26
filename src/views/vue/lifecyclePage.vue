<!--
 * @Description: V3组合式生命周期
 * @Author: 李昶
 * @Date: 2022-08-05 17:01:17
 * @LastEditors: 虾饺
 * @LastEditTime: 2023-05-23 14:45:52
 * @Profile: 一个比较废柴的前端开发
-->
<template>
    <div class="lifecycle-wrapper">
        <h3 class="project__title">声明周期</h3>
        <div class="project__title" @click="countIncrease">点击更新{{ count }}</div>
        <el-timeline>
            <el-timeline-item :timestamp="setupTimestamp"> setup </el-timeline-item>
            <el-timeline-item :timestamp="beforeCreateTimestamp"> beforeCreate </el-timeline-item>
            <el-timeline-item :timestamp="createdTimestamp"> created </el-timeline-item>
            <el-timeline-item :timestamp="beforeMountTimestamp"> beforeMount </el-timeline-item>
            <el-timeline-item :timestamp="mountedTimestamp"> mounted </el-timeline-item>
            <el-timeline-item :timestamp="beforeUpdateTimestamp"> beforeUpdate </el-timeline-item>
            <el-timeline-item :timestamp="updatedTimestamp"> updated </el-timeline-item>
        </el-timeline>
        <h3 class="project__title">子组件生命周期</h3>
        <lifecycle-component :child-data="count" />
    </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, ref } from 'vue';

export default defineComponent({
    // 生命周期 setup->beforeCreate->created->beforeMount->子组件setup->子组件beforeCreate->子组件created->子组件beforeMount->子组件mounted->mounted
    // 更新 beforeUpdate -> 子组件beforeUpdate -> updated ->子组件updated
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
        const count = ref<number>(1);
        const setupTimestamp = ref<string>(`${new Date().getTime()}`);
        const beforeMountTimestamp = ref<string>('');
        const mountedTimestamp = ref<string>('');
        const beforeUpdateTimestamp = ref<string>('');
        const updatedTimestamp = ref<string>('');
        console.log(`setup时间戳:${setupTimestamp.value}`);
        onBeforeMount(() => {
            beforeMountTimestamp.value = `${new Date().getTime()}`;
            console.log(`beforeMount时间戳:${beforeMountTimestamp.value}`);
        });
        onMounted(() => {
            mountedTimestamp.value = `${new Date().getTime()}`;
            console.log(`mounted时间戳:${mountedTimestamp.value}`);
        });
        onBeforeUpdate(() => {
            beforeUpdateTimestamp.value = `${new Date().getTime()}`;
            console.log(`beforeUpdate时间戳:${beforeUpdateTimestamp.value}`);
        });
        onUpdated(() => {
            updatedTimestamp.value = `${new Date().getTime()}`;
            console.log(`updated时间戳:${updatedTimestamp.value}`);
        });
        function countIncrease() {
            count.value += 1;
        }
        return {
            count,
            setupTimestamp,
            beforeMountTimestamp,
            mountedTimestamp,
            countIncrease,
            beforeUpdateTimestamp,
            updatedTimestamp,
        };
    },
});
</script>

<style></style>
