<!--
 * @Description: 
 * @Author: 李昶
 * @Date: 2022-06-15 21:57:33
 * @LastEditors: 李昶
 * @LastEditTime: 2022-08-03 22:43:53
 * @Profile: 一个比较废柴的前端开发
-->
<template>
    <div>
        <button @click="increment">Count is: {{ count }}</button>
        <span>{{ foo + 1 }}</span>
    </div>
</template>

<script>
import { ref, reactive } from 'vue';

export default {
    setup() {
        const count = ref(0);
        console.log(count);
        console.log(count.value);

        count.value += 1;
        console.log(count.value);

        const objectRef = ref({ count: 0 });

        // 这是响应式的替换
        objectRef.value = { count: 1 };

        const obj = {
            foo: ref(1),
            bar: ref(2),
        };

        function callSomeFunction(foo) {
            const newFoo = foo;
            newFoo.value = 4;
            console.log(obj.foo);
        }

        callSomeFunction(obj.foo);

        function increment() {
            count.value += 1;
        }

        // ref在响应式对象中的解包
        const count2 = ref(0);
        const state = reactive({ count: count2 });

        console.log('reactive count: ', state.count);
        state.count = 1;
        console.log('ref count: ', count2.value);

        // 如果将一个新的ref赋值给一个关联了已有ref的property 那么它会替换掉旧的ref
        const otherCount = ref(2);
        state.count = otherCount;
        console.log('新关联ref的reactive count: ', state.count);
        // 原始ref现在已经和state.count失去联系
        console.log('原始的ref count: ', count2.value);

        /** 数组和集合类型的ref解包
         * 不像响应式对象 当ref作为响应式数组或像Map这种原生集合类型的元素被访问的时候 不会进行解包
         */
        const books = reactive([ref('Vue 3 Guide')]);
        console.log('reactive内创建数组中的ref值: ', books[0].value);

        const map = reactive(new Map([['count', ref(0)]]));
        console.log('reactive创建map集合: ', map.get('count').value);
        return {
            count,
            increment,
            ...obj,
        };
    },
};
</script>

<style lang="scss"></style>
