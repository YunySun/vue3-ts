<!--
 * @Description: 
 * @Author: 李昶
 * @Date: 2022-08-23 22:31:40
 * @LastEditors: 李昶
 * @LastEditTime: 2022-08-24 17:22:46
 * @Profile: 一个比较废柴的前端开发
-->
<template>
    <div class="async-wrapper article-wrapper">
        <h2 class="project__title article-title">并发和并行</h2>
        <div class="article-tips warning">并发和并行的区别？</div>
        <p>并发：并发是指一个时间段中几个程序都在同一个处理器上进行运行，但是一个时刻点只有一个程序在处理。</p>
        <p>并行：只多个任务同时进行</p>
        <h2 class="project__title article-title">回调函数</h2>
        <div class="article-tips warning">什么是回调函数？回调函数会有哪些缺点？</div>
        <h3>什么是回调函数？</h3>
        <highlightjs lang="js" :code="demo1" />
        <h3>回调函数最致命的缺点回调地狱，即多个回调函数嵌套，不善于阅读并且不便于维护。</h3>
        <highlightjs lang="js" :code="demo2" />
        <h3 class="project__title">回调地狱的根本原因</h3>
        <ul>
            <li>嵌套函数具有耦合性，不便于维护</li>
            <li>嵌套的过多，很难处理问题</li>
        </ul>
        <p></p>
        <p>回调函数还有一些问题，如<code-txt>try catch</code-txt>来捕获错误，不可以直接<code-txt>return</code-txt>。</p>
        <h2 class="project__title article-title">Generator</h2>
        <p><code-txt>Generator</code-txt>：一个可以控制函数执行的函数。</p>
        <highlightjs lang="js" :code="demo3" />
        <p>代码解析：</p>
        <p>
            <code-txt>Generator</code-txt
            >函数和其他的函数不同，会返回一个迭代器。在执行一次<code-txt>next</code-txt>后，传参会被忽略 ，并且
            会暂停在<code-txt>yield ()</code-txt
            >处，并且返回值，下一次<code-txt>next</code-txt>，则将传参相当于上一个<code-txt>yield ()</code-txt
            >返回值，不传参则<code-txt>yield ()</code-txt>返回的是<code-txt>undefined</code-txt>。一直到最后。
        </p>
        <p>可以将回调函数改为如下：</p>
        <highlightjs lang="js" :code="demo4" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import data from '@/data/asyncData';
import CodeTxt from '@/components/tools/codeTxt.vue';

export default defineComponent({
    components: { CodeTxt },
    name: 'asyncPage',
    setup() {
        return { ...data };
    },
});
</script>

<style scoped lang="scss"></style>
