<!--
 * @Description: 
 * @Author: 李昶
 * @Date: 2022-06-21 09:39:35
 * @LastEditors: 李昶
 * @LastEditTime: 2022-08-03 22:28:39
 * @Profile: 一个比较废柴的前端开发
-->
<template>
    <div class="state-wpp">
        <div @click="store.counter += 1">
            <span>state counter: {{ store.counter }}</span>
            <p>state name: {{ store.name }}</p>
            <p>state isAdmin: {{ store.isAdmin }}</p>
            <div>
                state items:
                <pre> {{ store.items }}</pre>
            </div>
            <button @click.prevent.stop="store.$reset">counter reset</button>
            <button @click.prevent.stop="changeStateAction">change State</button>
        </div>
        <p class="counter-store-wpp" @click="counterStore.counter += 1">
            counterStore computed tripleCounter: {{ tripleCounter }}
        </p>
        <p class="counter-mapState-wpp" @click="changeCounterState">
            counterMapState computed magicValue: {{ magicValue }}
        </p>
        <p class="counter-mapState-wpp" @click="changeWritableCounterState">
            counterMapWritableState computed counter: {{ counter }}
        </p>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
// 如果不使用setup
import { mapState, mapWritableState } from 'pinia';
import { useStore } from '@/store/store';
import { useCounterStore } from '@/store/counter';

export default defineComponent({
    name: 'aboutState',
    setup() {
        const store = useStore();
        // console.log(store);
        const counterStore = useCounterStore();
        const tripleCounter = computed<number>(() => counterStore.counter * 3);

        // 通过store更新状态
        function changeStateAction() {
            // store.$patch({
            //   counter: store.counter + 1,
            //   name: 'Michael Jackson',
            // });
            // 接受函数批量修改
            store.$patch((state) => {
                state.items.push({ name: 'shoes', quantity: 1 });
            });
        }

        return {
            store,
            tripleCounter,
            counterStore,
            changeStateAction,
        };
    },
    computed: {
        ...mapState(useCounterStore, {
            // 将counterStore的counter注册到myOwnName
            myOwnName: 'counter',
            // 可以编写访问store的函数
            double: (store) => store.counter * 2,
            // 可以正常读取'this' 但是无法正常写入
            magicValue() {
                // console.log(store, this.counter, this.double);
                return this.myOwnName + this.double;
            },
        }),
        // 可写入store的值
        ...mapWritableState(useCounterStore, ['counter']),
    },
    methods: {
        // this.myOwnName为只读属性 不可修改
        changeCounterState() {
            this.myOwnName = 1;
        },
        // 修改mapWritableState所解构的值
        changeWritableCounterState() {
            this.counter = 2;
        },
    },
});
</script>
