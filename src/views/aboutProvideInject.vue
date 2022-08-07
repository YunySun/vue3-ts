<!--
 * @Description: 
 * @Author: 李昶
 * @Date: 2022-06-22 21:36:52
 * @LastEditors: 李昶
 * @LastEditTime: 2022-08-07 11:40:08
 * @Profile: 一个比较废柴的前端开发
-->
<template>
    <div class="wrapper">
        {{ count }}
        <my-provide-component title="mike" v-model.capitalize="count" v-slot="slotProps">
            {{ slotProps.text }}
        </my-provide-component>
    </div>
</template>

<script lang="ts">
import { ref, provide, defineAsyncComponent, defineComponent } from 'vue';
import type { Ref } from 'vue';
// 异步引入组件
const MyProvideComponent = defineAsyncComponent(() => import('@/components/myComponentProvideInject.vue'));
// import MyComponent from '@/components/myComponentProvideInject.vue';

export default defineComponent({
    // 07
    name: 'aboutProvideInject',
    setup() {
        const count = ref(1);
        // 如果message可以变成数字 会报错
        // const message = ref('hello')
        const message: Ref<string | number> = ref('hello');
        message.value = 20;

        // provide('message', 'hello');

        function changeMessage(val: string) {
            message.value = val;
        }

        provide('messageAction', {
            message,
            changeMessage,
        });

        return {
            count,
        };
    },
    components: { MyProvideComponent },
});
</script>
