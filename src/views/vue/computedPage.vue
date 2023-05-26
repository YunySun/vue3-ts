<!--
 * @Description: 
 * @Author: 李昶
 * @Date: 2022-08-05 15:37:20
 * @LastEditors: 虾饺
 * @LastEditTime: 2023-05-23 14:36:27
 * @Profile: 一个比较废柴的前端开发
-->
<template>
    <div class="computed-wrapper">
        <h3 class="project__title">Computed</h3>
        <div class="author-wrapper">
            <p class="author">{{ author.author }}</p>
            <div class="books">
                作者写过<template v-for="book in author.books" :key="book">《<span class="rst-il">{{ book }}</span>》
                </template>这{{ bookLength }}本小说
            </div>
        </div>
        <h3 class="project__title">写入和读取方法setter getter</h3>
        <el-input v-model="fullName" placeholder="请输入英文姓名" />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';

interface User {
    author: string;
    books: string[];
}

export default defineComponent({
    name: 'computedPage',
    setup() {
        const author = ref<User>({
            author: '鲁迅',
            books: ['呐喊', '彷徨', '故事新编'],
        });

        // 模板直接操作author.books.length 有些许复杂 可以通过计算属性来描述依赖响应式状态的复杂逻辑
        const bookLength = computed<number>(() => author.value.books.length);
        // 计算属性值会基于其响应式依赖被缓存 计算属性只有再响应式依赖更新的时候才会重新计算 只要author.books不改变;
        // 无论多少次访问bookLength都会立即返回先前的计算结果;

        // 写入和读取方法setter getter
        const firstName = ref<string>('Michael');
        const lastName = ref<string>('Jackson');
        const fullName = computed<string>({
            get() {
                console.log('fistName: ', firstName.value, 'lastName: ', lastName.value);
                return `${firstName.value} ${lastName.value}`;
            },
            set(val) {
                console.log(val.split(' '));
                [firstName.value, lastName.value] = val.split(' ');
            },
        });

        return {
            author,
            bookLength,
            fullName,
        };
    },
});
</script>

<style></style>
