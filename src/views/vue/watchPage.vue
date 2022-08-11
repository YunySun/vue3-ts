<!--
 * @Description: 
 * @Author: 李昶
 * @Date: 2022-08-08 14:15:57
 * @LastEditors: 李昶
 * @LastEditTime: 2022-08-08 17:05:36
 * @Profile: 一个比较废柴的前端开发
-->
<template>
    <div class="watch-wrapper">
        <h3 class="project__title">Watch</h3>
        <p @click="randomAction">watch监听{{ random }}</p>
        <h3 class="project__title">Watch监听返回值的函数</h3>
        <p>
            <span @click="randomXAction">{{ randomX }}</span
            >+<span @click="randomYAction">{{ randomY }}</span
            >={{ randomSum }}
        </p>
        <h3 class="project__title">Watch监听对象的属性</h3>
        <p @click="changeRandomObjAction">randomObjAttr的random属性为:{{ randomObjAttr.random }}</p>

        <h3 class="project__title">WatchEffect监听对象并提前调用一次</h3>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch, watchEffect } from 'vue';

interface watchObjInterface {
    random: number;
}

export default defineComponent({
    name: 'watchPage',
    setup() {
        function randomByNumber(num: number) {
            return Math.ceil(num * Math.random());
        }

        const random = ref<number>(0);
        function randomAction() {
            random.value = randomByNumber(100);
        }
        const randomSum = ref<number>(0);

        const randomX = ref<number>(0);
        function randomXAction() {
            randomX.value = randomByNumber(300);
        }

        const randomY = ref<number>(0);
        function randomYAction() {
            randomY.value = randomByNumber(200);
        }

        watch(random, (val) => {
            console.log('random watch: ', val);
        });

        // 监听return值的函数
        watch(
            () => {
                return randomX.value + randomY.value;
            },
            (sum) => {
                randomSum.value = sum;
            }
        );

        // 监听多个来源数组
        watch([randomX, () => randomY.value], ([val1, val2]) => {
            console.log(`randomX: ${val1}, randomY: ${val2}`);
        });

        // 监听对象的属性
        const randomObjAttr = reactive<watchObjInterface>({ random: 0 });
        function changeRandomObjAction() {
            randomObjAttr.random = randomByNumber(200);
        }
        // watch(randomObjAttr.random, (val) => {
        //     console.log('random watch: ', val);
        // });
        watch(
            () => randomObjAttr.random,
            (val, oldVal) => {
                console.log('randomObjAttr watch: ', val);
                console.log('old randomObjAttr watch: ', oldVal);
            }
        );

        // watchEffect 在刚开始就会调用一下
        watchEffect(() => {
            console.log('watchEffect randomObjAttr', randomObjAttr.random);
        });

        return {
            random,
            randomAction,
            randomX,
            randomXAction,
            randomY,
            randomYAction,
            randomSum,
            randomObjAttr,
            changeRandomObjAction,
        };
    },
});
</script>

<style></style>
