<!--
 * @Description: 
 * @Author: 李昶
 * @Date: 2022-11-03 15:40:14
 * @LastEditors: 李昶
 * @LastEditTime: 2022-11-03 22:44:55
 * @Profile: 一个比较废柴的前端开发
-->
<template>
    <div class="basic-07-wrapper article-wrapper">
        <h2 class="project__title article-title">trait</h2>
        <p>
            特设多态包括运算符重载，是指同一种行为有很多不同的实现；而把子类型当成父类型使用，比如Cat当成Animal使用，属于子类型多态。
        </p>
        <h3 class="project__title">trait</h3>
        <p>
            trait是Rust中的接口，它定义了类型使用这个接口的行为。你可以类比到自己熟悉的语言中理解，trait对于Rust而言，相当于interface于Java、protocol之于Swift、type
            class之于Haskell。
        </p>
        <h3 class="project__title">基于trait</h3>
        <p>如std::io::Write的定义。</p>
        <highlightjs lang="rust" :code="demo1" />
        <p>
            这些方法也被称作关联函数（associate function）。在trait中，方法可以有缺省的实现，对于这个Write
            trait，只需要实现write和flush两个方法，其他都有缺省实现。如果将trait类比为父类，实现trait的类型比为子类，那么缺省实现的方法就相当于子类中可以重载但不是必须重载的方法。
        </p>
        <p>Self代表当前的类型，比如File类型实现了Write，那么实现过程中使用到的Self就指代File。</p>
        <p>
            self在用作方法的第一个参数时，实际上是self:Self的简写，所以&self是self:&Self,而&mut self是self:&mut Self。
        </p>
        <highlightjs lang="rust" :code="demo2" />
        <p>
            从代码中，实现了write和flush方法，其他方法都用缺省实现，这样BufBuilder对Write
            trait的实现是完整的。如果没有实现write或者flush，Rust编译器会报错，你可以自己尝试一下。数据结构一旦实现了某个trait，那么这个trait内部的方法都可以被使用，比如这里我们调用了buf.write_all()。write_all接受两个参数：&mut
            self和&[u8]，第一个参数传递的是buf这个变量的可变引用，第二个参数传递的是b"Hello world!"。
        </p>
        <h3 class="project__title">trait练习</h3>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import data from '@/data/rust/07BasicData';

export default defineComponent({
    name: '07BasicPage',
    setup() {
        return {
            ...data,
        };
    },
});
</script>

<style lang="scss" scoped></style>
