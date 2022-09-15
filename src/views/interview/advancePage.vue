<!--
 * @Description: 
 * @Author: 李昶
 * @Date: 2022-09-13 13:59:09
 * @LastEditors: 李昶
 * @LastEditTime: 2022-09-15 17:18:41
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
        <p><code-txt>bind</code-txt>的区别是不直接调用，而是直接返回一个函数。</p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import data from '@/data/advanceData';
import codeTxt from '@/components/tools/codeTxt.vue';

Function.prototype.myBind = function (ctx) {
    // this 是调用myCall的函数 this必须是函数
    if (typeof this !== 'function') {
        throw new TypeError('Type Error');
    }
    let args = [...arguments].slice(1);
    // 改变调用myCall函数的this
    // this(...args); // 这时候函数的this是window
    // 函数谁调用 this就指向谁 在没有传参的基础上  函数指向为window
    ctx = ctx || window;
    ctx.fn = this; // 将函数赋值给调用myCall函数的一个属性上
    let result = ctx.fn(args);
    delete ctx.fn;
    return result;
};

function func(x, y, z) {
    console.log(x, y, z);
    console.log(this);
    return this.sound;
}

let obj = {
    sound: '你好',
};

console.log(func.myBind(obj, 1, 2, 3));

export default defineComponent({
    components: { codeTxt },
    name: 'advancePage',
    setup() {
        return {
            ...data,
        };
    },
});
</script>

<style scoped lang="scss"></style>
