<!--
 * @Description: 
 * @Author: 李昶
 * @Date: 2022-10-26 15:43:32
 * @LastEditors: 李昶
 * @LastEditTime: 2022-10-26 23:21:26
 * @Profile: 一个比较废柴的前端开发
-->
<template>
    <div class="basic-01-wrapper article-wrapper">
        <h2 class="article-title project__title">值的生杀大权到底在谁手上？</h2>
        <p class="article-tips">从一个变量使用堆栈的行为开始，探究 Rust 设计所有权和生命周期的用意</p>
        <h3 class="project__title">变量在函数调用时发生了什么?</h3>
        <highlightjs lang="rust" :code="demo1" />
        <p>
            通过这段函数知道是定义了一个数组data和一个值v，
            然后通过传递给函数find_pos，在data中查找v是否存在并且如果存在则返回v在data数组的下标，不返回的话则返回None
        </p>
        <p>
            数组为动态数组，动态数组因为大小在编译期无法确定，所以放在堆上，并且在栈上有一个包含了长度和容量的胖指针指向
            堆上的内存。
        </p>
        <p>
            在调用find_pos时，main函数的局部变量data和v作为参数传递给find_pos，所以他们会放在find_pos的参数区。这时候，堆上面的内存就有了2个引用。不光如此，每次将data作为参数传第一次，堆上的内存就会被多引用一次。
        </p>
        <p>
            堆上的内存究竟什么时候能释放，尤其在多个调用栈引用时，很难厘清，取决于最后一个引用什么时候结束。所以，这样一个看似简单的函数调用，给内存管理带来了极大麻烦。
        </p>
        <p>对于堆内存上的多次引用，不同语言也是有自己的方案：</p>
        <ul>
            <li>
                C/C++要求开发者手动处理，
                非常不便。这需要在写代码时高度自律，按照前人总结的最佳实践来操作。但人必然会犯错，一个不慎就会导致内存安全问题，要么内存泄露，要么使用已释放内存，导致程序崩溃。
            </li>
            <li>
                Java 等语言使用追踪式 GC, 通过定期扫描堆上数据还有没有人引用，来替开发者管理堆内存，但 GC 带来的 STW
                问题让语言的使用场景受限，性能损耗也不小。
            </li>
            <li>
                ObjC/Swift
                使用自动引用计数，在编译时自动添加维护引用计数的代码，减轻开发者维护堆内存的负担。但同样地，它也会有不小的运行时性能损耗。
            </li>
        </ul>
        <p></p>
        <h2 class="project__title">Rust是如何解决堆内存多次引用的问题的</h2>
        <h3 class="project__title">Rust的解决思路</h3>
        <p>
            在 Rust 以前，引用是一种随意的、可以隐式产生的、对权限没有界定的行为，比如 C 里到处乱飞的指针、Java
            中随处可见的按引用传参，它们可读可写，权限极大。而 Rust 决定限制开发者随意引用的行为。
        </p>
        <p>
            其实作为开发者，我们在工作中常常能体会到：恰到好处的限制，反而会释放无穷的创意和生产力。最典型的就是各种开发框架，比如
            React、Ruby on Rails 等，他们限制了开发者使用语言的行为，却极大地提升了生产力。
        </p>
        <h3 class="project__title">所有权和 Move 语义</h3>
        <p>Rust对于变量的一些规则</p>
        <ul>
            <li>一个值只能被一个变量所拥有，这个变量被称为所有者</li>
            <li>
                一个值同一时刻只能有一个所有者，也就是说不能有两个变量拥有相同的值。所以对应刚才说的变量赋值、参数传递、函数返回等行为，旧的所有者会把值的所有权转移给新的所有者，以便保证单一所有者的约束。
            </li>
            <li>当所有者离开作用域，其拥有的值被丢弃，内存得到释放</li>
        </ul>
        <p></p>
        <p>核心就是保证单一所有权。其中第二条规则讲的所有权转移是Move语义，Rust从C++那里学习和借鉴了这个概念。</p>
        <p>作用域指的是一个代码块，在Rust中，一个花括号括起来的代码区域就是一个作用域。</p>
        <p>
            所以main()函数中的data，被移动到find_pos()后，就失效了，编译器会保证main()
            函数随后的代码无法访问这个变量，这样，就确保了堆上的内存依旧只有唯一的引用。
        </p>
        <highlightjs lang="rust" :code="demo2" />
        <p>
            此函数有2处错误，在main函数中创建了不可变数据data，然后将data值赋值给data1，按照所有权的规则，赋值之后data则失去所有权，则不能访问了，随后，data1作为参数传给函数sum，在main函数中，data1也不能被访问了。所以后面一九获取data1和data则会报错。
        </p>
        <p>
            如果要在把data1传给sum，同时，还想让main能够访问data，可以调用data.clone()把data复制一份出来给
            data1，这样，在堆上就有vec![1,2,3,4]两个互不影响且可以独立释放的副本
        </p>
        <p>所有权规则，解决了谁真正拥有数据的生杀大权问题，让堆上数据的多重引用不复存在，这是它最大的优势。</p>
        <p>
            但是，这也会让代码变复杂，尤其是一些只存储在栈上的简单数据，如果要避免所有权转移之后不能访问的情况，我们就需要手动复制，会非常麻烦，效率也不高。
        </p>
        <p>Rust考虑到了这一点，提供了两种方案：</p>
        <p>
            如果你不希望值的所有权被转移，在Move语义外，Rust提供了Copy语义。如果一个数据结构实现了Copy
            trait，那么它就会使用Copy语义。这样，在你赋值或者传参时，值会自动按位拷贝（浅拷贝）。
        </p>
        <p>如果你不希望值的所有权被转移，又无法使用Copy语义，那你可以“借用”数据。</p>
        <h3 class="project__title">Copy语义和Copy trait</h3>
        <p>
            代码编译器给出的错误，提示的是data的类型Vec没有实现Copy trait，在赋值或者函数调用的时候无法
            Copy，于是就按默认使用Move语义。而Move之后，原先的变量data无法访问，所以出错。所以只要值的类型实现了Copy
            trait，就可以自动使用Copy语义进行拷贝。
        </p>
        <p>如何实现Copy trait</p>
        <highlightjs lang="rust" :code="demo3" />
        <ul>
            <li>原生类型，包含函数、不可变引用和裸指针实现了Copy</li>
            <li>数组和元组，如果其内部的数据结构实现了 Copy，那么它们也实现了 Copy；</li>
            <li>可变引用没有实现 Copy；</li>
            <li>非固定大小的数据结构，没有实现 Copy。</li>
        </ul>
        <p></p>
        <h3 class="project__title">小结</h3>
        <ul>
            <li>
                所有权：一个值只能被一个变量所拥有，且同一时刻只能有一个所有者，当所有者离开作用域，其拥有的值被丢弃，内存得到释放。
            </li>
            <li>Move语义：赋值或者传参会导致值 Move，所有权被转移，一旦所有权转移，之前的变量就不能访问。</li>
            <li>
                Copy语义：如果值实现了Copy trait，那么赋值或传参会使用Copy
                语义，相应的值会被按位拷贝（浅拷贝），产生新的值。
            </li>
        </ul>
        <p></p>
        <p>
            通过单一所有权模式，Rust
            解决了堆内存过于灵活、不容易安全高效地释放的问题，不过所有权模型也引入了很多新的概念，比如Move/Copy语义。
        </p>
        <p>Rust 通过单一所有权来限制任意引用的行为</p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import data from '@/data/rust/01BasicData';

export default defineComponent({
    name: '01BasicPage',
    setup() {
        return { ...data };
    },
});
</script>

<style scoped lang="scss"></style>
