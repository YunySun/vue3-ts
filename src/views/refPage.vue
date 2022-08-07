<!--
 * @Description: 
 * @Author: 李昶
 * @Date: 2022-06-15 21:57:33
 * @LastEditors: 李昶
 * @LastEditTime: 2022-08-07 11:31:41
 * @Profile: 一个比较废柴的前端开发
-->
<template>
    <div class="ref-wrapper">
        <h3 class="project__title">计数器</h3>
        <div class="counter-wrapper">
            <el-button type="primary" plain round @click="minusAction">-1</el-button>
            <span>{{ count }}</span>
            <el-button type="primary" plain round @click="addAction">+1</el-button>
        </div>
        <h3 class="project__title">ref对象类型</h3>
        <div class="user-wrapper">
            <p class="name">{{ userRef.name }}</p>
            <p class="address">{{ userRef.address }}</p>
            <p class="date">{{ userRef.date }}</p>
        </div>
        <h3 class="project__title">ref</h3>
        <el-input v-model="name" placeholder="Please input" />
        <el-input v-model="date" placeholder="Please input" />
        <el-input v-model="address" placeholder="Please input" />

        <!-- <div class="user-wrapper">
            <p class="name">{{ userObjRef.name }}</p>
            <p class="address">{{ userObjRef.address }}</p>
            <p class="date">{{ userObjRef.date }}</p>
        </div> -->
    </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { User } from '@/interface/common';

export default {
    name: 'refPage',
    setup() {
        // 对string number boolean类型有效
        const count = ref<number>(0);
        // 减法事件
        function minusAction() {
            count.value -= 1;
        }
        // 加法事件
        function addAction() {
            count.value += 1;
        }

        // 对对象类型
        const userRef = ref<User>({
            date: '2022-08-04',
            name: '某某',
            address: '北京',
        });

        // 响应式的替换
        userRef.value = { date: '2022-08-05', name: '李昶', address: '江苏南京' };

        // ref解构对象
        // const { date, name, address } = userRef.value;

        // 对象赋值响应
        // const userObjRef = ref({
        //     date: ref<string>('2022-08-04'),
        //     name: ref<string>('某某'),
        //     address: ref<string>('北京'),
        // });

        const date = ref<string>(userRef.value.date);
        const name = ref<string>(userRef.value.name);
        const address = ref<string>(userRef.value.address);

        return {
            count,
            minusAction,
            addAction,
            userRef,
            // userObjRef,
            date,
            name,
            address,
        };
    },
};
</script>

<style lang="scss" scoped>
.counter-wrapper {
    span {
        margin: 0 10px;
    }
}

.user-wrapper {
    p + p {
        margin-top: 10px;
    }
}

.el-input + .el-input {
    margin-top: 20px;
}
</style>
