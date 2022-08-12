<!--
 * @Description: 
 * @Author: 李昶
 * @Date: 2022-08-12 16:05:12
 * @LastEditors: 李昶
 * @LastEditTime: 2022-08-12 17:30:12
 * @Profile: 一个比较废柴的前端开发
-->
<template>
    <div class="basic-wrapper article-wrapper">
        <h2 class="project__title article-title">== 对比 ===</h2>
        <div class="article-tips warning">==和===有什么区别？</div>
        <p>对于<code-txt>==</code-txt>，如果类型不一样的话，会先进行类型转换，转换成同样的类型后在进行比较</p>
        <ul>
            <li>首先对比类型是否相同，如果类型相同则比较大小</li>
            <li>类型不同则类型转换</li>
            <li>
                首先先判断是否在对比<code-txt>null</code-txt>和<code-txt>undefined</code-txt>，是的话返回<code-txt
                    >true</code-txt
                >
            </li>
            <li>判断两个类型是否是字符串和数字，如果是则将字符串转换成数字然后比较</li>
            <li>判断一方是否是布尔值，是的话将布尔值转换成数字然后进行比较</li>
            <li>判断一方是否是对象切另一方是字符串，则会调用对象内置原始类型转换转换成原始类型在进行下一步</li>
        </ul>
        <p></p>
        <p>对于<code-txt>===</code-txt>就很简单了，判断类型和值是否相同，一般比较运算的时候我都喜欢用这个。</p>
        <h2 class="project__title article-title">闭包</h2>
        <div class="article-tips warning">什么是闭包？</div>
        <p>闭包的定义就是一个函数访问了包裹函数的一个变量。存在的意义就是间接访问内部的变量。</p>
        <highlightjs language="js" :code="demo1" />
        <div class="article-tips warning">for循环内异步拿到的for循环变量问题？</div>
        <highlightjs language="js" :code="demo2" />
        <p>三种解决方案：</p>
        <p>1.通过闭包的方式（立即执行函数）</p>
        <highlightjs language="js" :code="demo3" />
        <p>2.setTimeout传参</p>
        <highlightjs language="js" :code="demo4" />
        <p>3.let</p>
        <highlightjs language="js" :code="demo5" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CodeTxt from '@/components/tools/codeTxt.vue';
import data from '@/data/basicDataTwo';

export default defineComponent({
    name: 'basicPageTwo',
    components: { CodeTxt },
    setup() {
        return { ...data };
    },
});
</script>

<style scoped lang="scss"></style>
