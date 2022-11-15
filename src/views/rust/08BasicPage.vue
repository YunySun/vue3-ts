<template>
    <div class="basic-08-wrapper article-wrapper">
        <h2 class="project__title article-title">类型系统，有哪些需要掌握的trait</h2>
        <p class="article-tips warning">用好trait，会让代码结构更加清晰，阅读和使用都更加符合Rust生态的习惯。</p>
        <p>
            数据结构实现了Debug
            trait，那么当想打印数据结构时，就可以用{:?}来打印；如果你的数据结构实现了From，那么，可以直接使用into()方法做数据转换。
        </p>
        <h3 class="project__title">trait</h3>
        <p>Rust语言的标准库定义了大量的标准trait</p>
        <ul>
            <li>Clone/Copy trait，约定了数据被深拷贝和浅拷贝的行为；</li>
            <li>Read/Write trait，约定了对I/O读写的行为；</li>
            <li>Iterator，约定了迭代器的行为；</li>
            <li>Debug，约定了数据如何被以debug的方式显示出来的行为；</li>
            <li>Default，约定数据类型的缺省值如何产生的行为；</li>
            <li>From/TryFrom，约定了数据间如何转换的行为。</li>
        </ul>
        <h3 class="project__title">内存相关:Clone/Copy/Drop</h3>
        <h4 class="project__title">Clone trait</h4>
        <highlightjs lang="rust" :code="demo1" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import data from '@/data/rust/08BasicData';

export default defineComponent({
    name: '08BasicPage',
    setup() {
        return { ...data };
    },
});
</script>

<style scoped lang="scss"></style>
