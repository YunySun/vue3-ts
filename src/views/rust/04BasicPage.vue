<!--
 * @Description: 
 * @Author: 李昶
 * @Date: 2022-10-30 17:12:57
 * @LastEditors: 李昶
 * @LastEditTime: 2022-10-30 18:30:39
 * @Profile: 一个比较废柴的前端开发
-->
<template>
    <div class="basic-04-wrapper article-wrapper">
        <h2 class="project__title article-title">生命周期：你创建的值究竟能活多久？</h2>
        <p>
            任何语言里，栈上的值都有自己的生命周期，它和帧的生命周期一致。并且堆上的内存也引入了生命周期。大部分语言的生命周期是不确定的，或者未定义。Rust通过Box::leak/Box::into_raw/ManualDrop等动作，堆内存的生命周期，会默认和其栈内存的生命周期绑在一起。
        </p>
        <h3 class="project__title">值得生命周期</h3>
        <p>
            如果一个值得生命周期贯穿整个进程得生命周期，那么这种生命周期称为静态生命周期。当值具有生命静态生命周期得时候，其引入也具有静态生命周期。可以用'static来表示。比如&'static&nbsp;str代表这是一个具有静态生命周期得字符串引用。全局变量、静态变量、字符串字面量等，都拥有静态生命周期。如果使用Box::leak得堆内存，也具有静态生命周期。
        </p>
        <p>
            如果一个值是某个作用域定义的，也就是说它被创建在栈或者堆上，那么其生命周期是动态的。当这个值得作用域结束时，
            值得生命周期也随之结束。对于动态生命周期，约定'a、'b或者'hello这样得小写字符或者字符串来表达。'后面具体是什么没有特别严得规定，主要代表得是某一段动态得生命周期，其中&'a&nbsp;str和&'b&nbsp;str表示这两个字符串引用的生命周期可能不一致。
        </p>
        <ul>
            <li>分配在堆和栈上的内存有其各自的作用域，它们的生命周期是动态的。</li>
            <li>
                全局变量、静态变量、字符串字面量、代码等内容，在编译时，会被编译到可执行文件中的BSS/Data/RoData/Text
                段，然后在加载时，装入内存。因而，它们的生命周期和进程的生命周期一致，所以是静态的。
            </li>
            <li>所以，函数指针的生命周期也是静态的，因为函数在Text段中，只要进程活着，其内存一直存在。</li>
        </ul>
        <h3 class="project__title">编译器如何识别生命周期</h3>
        <p>
            x引用内存作用域中创建的变量y。变量从开始定义到其作用域饥饿书的这段时间，则是它的生命周期，所以x的生命周期大于y的生命周期，则x引用y编译期则报错。
        </p>
        <highlightjs lang="rust" :code="demo1" />
        <p>
            y和x处在同一个作用域下，x引用y，则x的声明周期和y的生命周期是同时结束的，所以y的生命周期是大于x的，x引用y则没报错。
        </p>
        <highlightjs lang="rust" :code="demo2" />
        <p>main函数创建2个String，然后调用max函数比较大小。max函数接收2个字符串引用，返回较大的字符串的引用</p>
        <highlightjs lang="rust" :code="demo3" />
        <p>这段代码报错“expected named lifetime parameter”，编译器在编译max函数时，无法判断s1，s2和返回的生命周期。</p>
        <p>
            这段代码在main函数里s1和s2两个值的生命周期一致，并且同时引入max函数后，无论谁被返回，生命周期都不会超过s1或者s2的，但是还是报错了。
        </p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import data from '@/data/rust/04BasicData';

export default defineComponent({
    name: '04BasicPage',
    setup() {
        return {
            ...data,
        };
    },
});
</script>

<style scoped lang="scss"></style>
