<!--
 * @Description: 一个比较废柴的前端开发
 * @Author: 李昶
 * @Date: 2022-06-21 09:34:34
 * @LastEditors: 李昶
 * @LastEditTime: 2022-08-11 10:16:47
-->
<template>
    <div class="wrapper">
        <div v-if="error">Oops! Error encountered: {{ error.message }}</div>
        <div v-else-if="response">
            Data loaded:
            <!-- <pre>{{ response }}</pre> -->
            <div class="bookstore-wpp">
                <ul>
                    <li v-for="item in response" :key="item.m_id" @click="handleItem(item)">
                        <pre>{{ item }}</pre>
                    </li>
                </ul>
            </div>
        </div>
        <div v-else>loading...</div>
    </div>
</template>

<script lang="ts">
import { useRequest } from '@/uses/useRequest';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'useRequestPage',
    setup() {
        const { response, error } = useRequest({ pageconfig: 'index' });

        function handleItem(item) {
            console.log(item);
        }

        return {
            error,
            response,
            handleItem,
        };
    },
});
</script>
