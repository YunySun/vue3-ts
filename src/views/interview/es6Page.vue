<!--
 * @Description: 
 * @Author: 李昶
 * @Date: 2022-08-16 22:49:53
 * @LastEditors: 李昶
 * @LastEditTime: 2022-08-18 17:23:25
 * @Profile: 一个比较废柴的前端开发
-->
<template>
    <div class="es6-wrapper article-wrapper">
        <h2 class="article-title project__title">var、let和const区别</h2>
        <div class="article-tips warning">什么声明提升？什么是暂时性死区？var、let和const区别</div>
        <h3 class="project_tittle">什么声明提升？</h3>
        <p><code-txt>var</code-txt>声明变量会产生提升的情况。函数也可以提升</p>
        <highlightjs lang="js" :code="demo1" />
        <p>为什么打印<code-txt>a</code-txt>是<code-txt>undefined</code-txt>？</p>
        <p>
            其实由于声明提升才会导致此结果，因为代码中<code-txt>console.log(a)</code-txt>这时候其实变量<code-txt>a</code-txt>还没有声明，
            但是却可以打印，就是因为变量提升。但是赋值是没有提升的功能的。
        </p>
        <p>上述代码可以解析为：</p>
        <highlightjs lang="js" :code="demo2" />
        <h3 class="project__title">什么是暂时性死区？</h3>
        <p>对于暂时性死区，其实是对申明的变量提前调用时报错。这样做更加严谨，更符合规范代码。</p>
        <highlightjs lang="js" :code="demo3" />
        <h3 class="project__title">var、let和const区别</h3>
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
        <p>封装、继承、多态是面向对象的三个基本特征。</p>
        <h3 class="project__title">封装</h3>
        <p>
            将现实中的事物抽象成计算机领域中的对象，具有对象的属性和行为，就是封装。比如人，人可以发出声音，可以唱跳rap，但是不同的人可以有不同的属性来区分不同的人，年龄、性格、性别等等。
        </p>
        <p>
            特性：数据隐藏。在正常交互情况下，保证了安全性，在不知道这个对象内部结构的情况下，知道这个对象开放的方法直接调用就行，不需要关心他如何定义这个函数的逻辑。
        </p>
        <h4>最简单的封装：函数</h4>
        <p>函数相当于将多条语句封装起来，可以在任何地方调用。</p>
        <p>缺点：</p>
        <ul>
            <li>容易被同名的函数覆盖</li>
            <li>读到函数调用就会执行</li>
        </ul>
        <p>优点：</p>
        <ul>
            <li>在函数被调用的时候才会调用</li>
            <li>代码的复用性</li>
            <li>在自己定义参数的情况下，不会被外部的参数所污染。</li>
        </ul>
        <h3>对象 实例和原型之间的封装</h3>
        <p>对象是属性的无需集合，每个属性对应一个值，值可以是原始值也可以是对象、函数等。</p>
        <p>通过对象封装数据，每次都需要重新定义，麻烦，代码重复率高。</p>
        <h4>工厂模式</h4>
        <p>通过函数</p>
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
