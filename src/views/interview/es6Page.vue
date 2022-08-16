<!--
 * @Description: 
 * @Author: 李昶
 * @Date: 2022-08-16 22:49:53
 * @LastEditors: 李昶
 * @LastEditTime: 2022-08-16 23:29:38
 * @Profile: 一个比较废柴的前端开发
-->
<template>
    <div class="es6-wrapper article-wrapper">
        <h2 class="article-title project__title">var、let和const区别</h2>
        <div class="article-tips warning">什么声明提升？什么是暂时性死区？var、let和const区别</div>
        <h4 class="project_tittle">什么声明提升？</h4>
        <p><code-txt>var</code-txt>声明变量会产生提升的情况。函数也可以提升</p>
        <highlightjs lang="js" :code="demo1" />
        <p>为什么打印<code-txt>a</code-txt>是<code-txt>undefined</code-txt>？</p>
        <p>
            其实由于声明提升才会导致此结果，因为代码中<code-txt>console.log(a)</code-txt>这时候其实变量<code-txt>a</code-txt>还没有声明，
            但是却可以打印，就是因为变量提升。但是赋值是没有提升的功能的。
        </p>
        <p>上述代码可以解析为：</p>
        <highlightjs lang="js" :code="demo2" />
        <h4 class="project__title">什么是暂时性死区？</h4>
        <p>对于暂时性死区，其实是对申明的变量提前调用时报错。这样做更加严谨，更符合规范代码。</p>
        <highlightjs lang="js" :code="demo3" />
        <h4 class="project__title">var、let和const区别</h4>
        <ul>
            <li>函数提升优先于变量提升，会将函数变量提升至作用域顶部。</li>
            <li>
                <code-txt>var</code-txt
                >可以进行变量提升，而<code-txt>let</code-txt>、<code-txt>const</code-txt>因为暂时性死区，所以不存在变量提升。
            </li>
            <li><code-txt>var</code-txt>会将变量绑定到<code-txt>window</code-txt>上，而其他申明后不会绑定。</li>
            <li>
                <code-txt>let</code-txt
                >和<code-txt>const</code-txt>作用差不多，但是<code-txt>const</code-txt>申明变量后不能重新赋值。
            </li>
        </ul>
        <p></p>
        <h2 class="article-title project__title">JS的封装、继承、多态</h2>
        <div class="article-tips warning">什么是封装、继承、多态？</div>
    </div>
</template>

<script lang="ts">
import CodeTxt from '@/components/tools/codeTxt.vue';
import { defineComponent } from 'vue';
import data from '@/data/es6Data';

export default defineComponent({
    name: 'es6Page',
    components: { CodeTxt },
    setup() {
        return { ...data };
    },
});
</script>

<style scoped lang="scss"></style>
