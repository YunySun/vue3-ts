<!--
 * @Description: 
 * @Author: 李昶
 * @Date: 2022-08-11 10:33:25
 * @LastEditors: 李昶
 * @LastEditTime: 2022-08-11 17:27:16
 * @Profile: 一个比较废柴的前端开发
-->
<template>
    <div class="basic-wrapper article-wrapper">
        <h2 class="article-title">原始类型</h2>
        <div class="article-tips warning">原始类型有哪几种？ null是对象嘛？</div>
        <p>JS中存在着6种原始值</p>
        <ul>
            <li><code-txt>boolean</code-txt></li>
            <li><code-txt>null</code-txt></li>
            <li><code-txt>undefined</code-txt></li>
            <li><code-txt>string</code-txt></li>
            <li><code-txt>number</code-txt></li>
            <li><code-txt>symbol</code-txt></li>
        </ul>
        <p>原始类型存储的都是值，所以是没有函数可以调用的，所以<code-txt>undefined.toString()</code-txt>会报错。</p>
        <p>为什么字符串可以直接调用toString方法？</p>
        <p>
            其实在这种情况下的'1'已经不是原石类型了，而是被强制转换成了<code-txt>String</code-txt>对象类型了。所以可以调用<code-txt>toString</code-txt>函数。
        </p>
        <p>原始类型有哪些坑?</p>
        <p>
            其中<code-txt>null</code-txt>是原始类型，但是<code-txt>typeof null</code-txt
            >会输出为<code-txt>object</code-txt>这是很早就存在的一个Bug。
        </p>
        <p><code-txt>0.1+0.2 !== 0.3</code-txt>精度缺失问题。</p>
        <h2 class="article-title">对象类型</h2>
        <div class="article-tips warning">对象类型和原始类型有什么不同？函数参数是对象会有什么问题？</div>
        <p>
            除了原始类型其余的都是对象类型。对象类型和原始类型区别在于，原始类型存储的是值，而对象类型存储的是地址（指针）。当创建一个对象的时候，计算机会在内存中开辟一个空间用来存值，而这个找到这个空间就是通过指针了。
        </p>
        <p>
            通过了解对象类型，其中对象类型存储的是地址（指针），所以在赋值给另一个变量的时候，复制的也是这个对象类型存储的地址
            ，所以另一个变量在修改值的时候也会导致被赋值的变量发生改变。
        </p>
        <h4>示例一</h4>
        <highlightjs language="js" :code="demo1" />
        <p>代码解析：</p>
        <ul>
            <li>将参数a1传入test函数中</li>
            <li>其中由于a1是对象类型，所以传参a和a1是一样的地址，所以这时候修改参数a后，a1的值也会被修改</li>
            <li>
                a参数这时候重新赋值，也就重新分配地址，这时候a就和a1没有关系了，所以a2和a1没有关系，所以即使a2修改了a1也不会有变化
            </li>
        </ul>
        <p></p>
        <h2>typeof 和 instanceof</h2>
        <div class="article-tips warning">typeof是否可以正确判断类型？instanceof为什么可以正确的判断对象？</div>
        <p><code-txt>typeof</code-txt>对于原始类型除了<code-txt>null</code-txt>都可以获取正确的类型</p>
        <highlightjs language="js" :code="demo2" />
        <p><code-txt>typeof</code-txt>对于对象类型除了函数类型返回的都是<code-txt>object</code-txt></p>
        <highlightjs language="js" :code="demo3" />
        <p>
            综合上面几个类型判断，<code-txt>typeof</code-txt>对于<code-txt>null</code-txt>返回的是<code-txt>object</code-txt>类型，<code-txt>typeof</code-txt>也无法判断对象的正确类型，
            所以<code-txt>typeof</code-txt>无法准确判断原始类型和对象类型。
        </p>
        <p><code-txt>instanceof</code-txt>对于对象类型的判断，是通过原型链进行判断的，所以可以正确的判断对象类型</p>
    </div>
</template>

<script>
import CodeTxt from '@/components/tools/codeTxt.vue';
import { demo1, demo2, demo3 } from '@/data/highlightData';

export default {
    name: 'basicPage',
    components: { CodeTxt },
    setup() {
        return { demo1, demo2, demo3 };
    },
};
</script>

<style></style>
