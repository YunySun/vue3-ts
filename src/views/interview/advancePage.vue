<!--
 * @Description: 
 * @Author: 李昶
 * @Date: 2022-09-13 13:59:09
 * @LastEditors: 李昶
 * @LastEditTime: 2022-09-19 17:08:14
 * @Profile: 一个比较废柴的前端开发
-->
<template>
    <div class="advance-wrapper article-wrapper">
        <h2 class="article-title project__title">实现call、apply、bind函数</h2>
        <div class="article-tips warning">call、apply、bind函数是如何实现的</div>
        <h3 class="project__title">call的使用</h3>
        <highlightjs lang="js" :code="demo1" />
        <ul>
            <li>函数调用，并将<code-txt>this</code-txt>绑定到第一个参数对象上</li>
            <li>从第二个参数后作为调用函数的传参</li>
            <li>调用<code-txt>call</code-txt>的一定是一个函数，并且调用后立即执行。</li>
            <li>返回值为调用<code-txt>call</code-txt>函数的返回值</li>
        </ul>
        <p></p>
        <highlightjs lang="js" :code="demo2" />
        <h3>apply</h3>
        <p><code-txt>apply</code-txt>函数相对于<code-txt>call</code-txt>的区别只是在传参上有所不同，传的为数组。</p>
        <highlightjs lang="js" :code="demo3" />
        <h3>bind</h3>
        <p><code-txt>bind</code-txt>的区别是不直接调用，而是直接返回一个函数。并且返回的函数可以继续传值。</p>
        <highlightjs lang="js" :code="demo4" />

        <h2 class="article-title project__title">new</h2>
        <div class="article-tips warning">new的原理，通过new创建的对象和通过字面量创建的有什么区别？</div>
        <p>调用<code-txt>new</code-txt>的过程会发生什么：</p>
        <ul>
            <li>生成一个对象</li>
            <li>链接到原型</li>
            <li>绑定<code-txt>this</code-txt></li>
            <li>返回新对象</li>
        </ul>
        <p></p>
        <p>实现一个类似于<code-txt>new</code-txt>的函数</p>
        <ul>
            <li>将新对象的<code-txt>__proto__</code-txt>指向传递构造函数的原型</li>
            <li>改变<code-txt>this</code-txt>指向</li>
            <li>最后返回值为对象</li>
        </ul>
        <p></p>
        <highlightjs lang="js" :code="demo5" />
        <p>
            其实通过字面量创建对象，也是通过<code-txt>new Object()</code-txt
            >生成的，而不同的是字面量创建是不需要通过作用链一层层的找到<code-txt>Object</code-txt>的。
        </p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import data from '@/data/advanceData';
import CodeTxt from '@/components/tools/codeTxt.vue';

export default defineComponent({
    components: { CodeTxt },
    name: 'advancePage',
    setup() {
        return {
            ...data,
        };
    },
});
</script>

<style scoped lang="scss"></style>
