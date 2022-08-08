<!--
 * @Description: 
 * @Author: 李昶
 * @Date: 2022-08-08 23:20:36
 * @LastEditors: 李昶
 * @LastEditTime: 2022-08-08 23:39:05
 * @Profile: 一个比较废柴的前端开发
-->
<template>
    <div class="provide-wrapper">
        <h3 class="project__title">Provide 和 Inject</h3>
        <el-button type="primary" round plain @click="changeProvideRefAction">change provideRef</el-button>
        <provide-component />
    </div>
</template>

<script lang="ts">
import { defineComponent, provide, ref } from 'vue';
import provideComponent from '../components/provideComponent.vue';

export default defineComponent({
    components: { provideComponent },
    name: 'ProvidePage',

    setup() {
        const provideRef = ref<string>('provideRef');
        provide('provideRef', provideRef);

        function changeProvideRefAction() {
            provideRef.value = 'change provideRef';
        }
        return { changeProvideRefAction };
    },
});
</script>

<style></style>
