<!--
 * @Description: 
 * @Author: 李昶
 * @Date: 2022-06-15 21:57:33
 * @LastEditors: 李昶
 * @LastEditTime: 2022-08-09 10:20:42
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
        <h3 class="project__title">元素ref</h3>
        <input class="project__input" ref="textInputRef" type="text" placeholder="请输入" />
        <el-button type="primary" plain round @click="consoleRefAction">console input ref</el-button>
        <h3 class="project__title">数组元素ref</h3>
        <ul>
            <li v-for="{ name } in userArr" :key="name" ref="userArrRef">{{ name }}</li>
        </ul>
        <el-button type="primary" plain round @click="userArrRefAction">userArrRef</el-button>
        <h3>组件ref</h3>
        <el-tabs>
            <el-tab-pane :label="name" v-for="{ name } in userArr" :key="name" ref="componentArrRef">{{
                name
            }}</el-tab-pane>
        </el-tabs>
        <el-button type="primary" plain round @click="componentArrRefAction">componentArrRef</el-button>
    </div>
</template>

<script lang="ts">
import { reactive, ref } from 'vue';
import { PageUser } from '@/interface/common';

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
        const userRef = ref<PageUser>({
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

        const textInputRef = ref<null | HTMLElement>(null);
        function consoleRefAction() {
            console.log(textInputRef.value);
        }

        // 元素数组ref
        const userArr: PageUser[] = reactive([
            {
                date: '2022-08-08',
                name: '李昶',
                address: '安徽芜湖无为',
            },
            {
                date: '2022-08-08',
                name: '叶四帅',
                address: '浙江杭州',
            },
            {
                date: '2022-08-08',
                name: '王凤山',
                address: '上海',
            },
        ]);

        const userArrRef = ref<HTMLElement[]>([]);

        function userArrRefAction() {
            console.log(userArrRef.value);
        }

        const componentArrRef = ref<HTMLElement[]>([]);

        function componentArrRefAction() {
            console.log(componentArrRef.value);
        }

        return {
            count,
            minusAction,
            addAction,
            userRef,
            // userObjRef,
            date,
            name,
            address,
            textInputRef,
            consoleRefAction,
            userArr,
            userArrRef,
            userArrRefAction,
            componentArrRef,
            componentArrRefAction,
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
    p+p {
        margin-top: 10px;
    }
}

.el-input+.el-input {
    margin-top: 20px;
}

.project__input {
    border: 1px solid lightgray;
}
</style>
