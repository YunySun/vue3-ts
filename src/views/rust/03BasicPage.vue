<!--
 * @Description: 
 * @Author: 李昶
 * @Date: 2022-10-27 16:37:12
 * @LastEditors: 李昶
 * @LastEditTime: 2022-10-27 23:56:03
 * @Profile: 一个比较废柴的前端开发
-->
<template>
    <div class="basic-03-wrapper article-wrapper">
        <h2 class="project__title article-title">所有权：一个值可以有多个所有者么？</h2>
        <ul>
            <li>一个有向无环图（DAG）中，某个节点可能有两个以上的节点指向它，这个按照所有权模型怎么表述？</li>
            <li>多个线程要访问同一块共享内存，怎么办？</li>
        </ul>
        <p></p>
        <p>
            在编译期，所有权的静态检查无法处理它们，所以为了更好的灵活性，Rust提供了运行时的动态检查，来满足特殊场景下的需求。编译时，处理大部分使用场景，保证安全性和效率；运行时，处理无法在编译时处理的场景，会牺牲一部分效率，提高灵活性。
        </p>
        <p class="article-tips">那具体如何在运行时做动态检查呢？运行时的动态检查又如何与编译时的静态检查自洽呢？</p>
        <p>Rust的答案是使用引用计数的智能指针：Rc（Reference counter）和Arc（Atomic reference counter）。</p>
        <h3 class="project__title">Rc</h3>
        <p>对某个数据结构T，我们可以创建引用计数Rc，使其有多个所有者。Rc会把对应的数据结构创建在堆上。</p>
        <highlightjs lang="rust" :code="demo1" />
        <p>如果想对数据创建更多的所有者，我们可以通过 clone() 来完成。</p>
        <p>
            对一个Rc结构进行clone()，不会将其内部的数据复制，只会增加引用计数。而当一个Rc结构离开作用域被drop()时，也只会减少其引用计数，直到引用计数为零，才会真正清除对应的内存。
        </p>
        <highlightjs lang="rust" :code="demo2" />
        <p>
            创建了三个Rc，分别是a、b和c。它们共同指向堆上相同的数据，也就是说，堆上的数据有了三个共享的所有者。在这段代码结束时，c先drop，引用计数变成2，然后b
            drop、a drop，引用计数归零，堆上内存被释放。
        </p>
        <p class="article-tips">为什么生成了对同一块内存的多个所有者，但是，编译器不抱怨所有权冲突呢？</p>
        <p>
            首先a是Rc::new(1)的所有者，然后b和c都调用了a.clone()，分别得到了一个新的Rc，所以从编译器的角度，abc都各自拥有一个Rc。
        </p>
        <highlightjs lang="rust" :code="demo3" />
        <p>所以，Rc的clone不复制实际的数据，只是一个引用计数的增加。</p>
        <div class="article-tips">Rc是怎么产生在堆上的？并且为什么这段堆内存不受栈内存生命周期的控制呢？</div>
        <h3 class="project__title">Box::leak()机制</h3>
        <p>
            在所有权模型下，堆内存的生命周期，和创建它的栈内存的生命周期保持一致。Rust必须提供一种机制，让代码可以像C/C++那样，创建不受栈内存控制的堆内存，从而绕过编译时的所有权规则。Rust提供的方式是Box::leak()。
        </p>
        <p>
            Box是Rust下的智能指针，它可以强制把任何数据结构创建在堆上，然后在栈上放一个指针指向这个数据结构，但此时堆内存的生命周期仍然是受控的，跟栈上的指针一致。Box::leak()，它创建的对象，从堆内存上泄漏出去，不受栈内存控制，是一个自由的、生命周期可以大到和整个进程的生命周期一致的对象。
        </p>
        <p>
            所以我们相当于主动撕开了一个口子，允许内存泄漏。注意，在C/C++下，其实你通过malloc分配的每一片堆内存，都类似Rust下的Box::leak()。我很喜欢Rust这样的设计，它符合最小权限原则（Principle
            of least privilege），最大程度帮助开发者撰写安全的代码。
        </p>
        <p>
            有了Box::leak()，我们就可以跳出Rust编译器的静态检查，保证Rc指向的堆内存，有最大的生命周期，然后我们再通过引用计数，在合适的时机，结束这段内存的生命周期。
        </p>
        <ul>
            <li>静态检查，靠编译器保证代码符合所有权规则；</li>
            <li>
                动态检查，通过Box::leak让堆内存拥有不受限的生命周期，然后在运行过程中，通过对引用计数的检查，保证这样的堆内存最终会得到释放。
            </li>
        </ul>
        <p></p>
        <h3 class="project__title">实现 DAG</h3>
        <p>现在用Rc来实现之前无法实现的DAG。</p>
        <p>
            假设Node就只包含id和指向下游的指针，因为DAG中的一个节点可能被多个其它节点指向，所以使用Rc&lt;Node&gt;来表述它；一个节点可能没有下游节点，所以使用Option&lt;Rc&lt;Node&gt;&gt;来描述它。
        </p>
        <ul>
            <li>new()：建立一个新的 Node。</li>
            <li>update_downstream()：设置Node的downstream。</li>
            <li>get_downstream()：clone一份Node里的downstream。</li>
        </ul>
        <p></p>
        <highlightjs lang="rust" :code="demo4" />
        <h3 class="project__title">RefCell</h3>
        <p class="article-tips">整个 DAG 在创建完成后还能修改么？</p>
        <p>在上述代码的main函数中，修改Node3使其指向一个新的节点Node</p>
        <highlightjs lang="rust" :code="demo5" />
        <p>
            编译失败并且提示“node3 cannot borrow as
            mutable”。这是因为Rc是一个只读的引用计数器，无法拿到Rc结构内部数据的可变引用，来修改这个数据。和Rc类似，RefCell也绕过了Rust编译器的静态检查，允许我们在运行时，对某个只读数据进行可变借用。
        </p>
        <h3 class="project__title">内部可变性</h3>
        <p>
            当我们使用let
            mut显式地声明一个可变的值，或者，用&mut声明一个可变引用时，编译器可以在编译时进行严格的检查，保证只有可变的值或者可变的引用，才能修改内部的数据，这被称作外部可变性，外部可变性通过mut关键字声明。但是这样还是不够灵活，有时候希望可以绕开这个编译时的检查，对未申明成mut的值或者引用，也想进行修改，就是说在编译器眼里，值是只读的，但是在运行的时候，这个值可以得到可变借用，从而修改内部的数据，这就是RefCell用到的地方。
        </p>
        <highlightjs lang="rust" :code="demo6" />
        <p>
            从上述代码知道data是一个RefCell，其初始值为1.并且没有将data声明为可变变量。之后可以通过RefCell的borrow_mut方法获取可变的内部引用，并对其进行自增的操作。最后通过RefCell的borrow方法，获得一个不可变的内部引用，并且自增得到值为2。
        </p>
        <div class="article-tips">为什么要把获取和操作可变借用的两句代码，用花括号分装到一个作用域下？</div>
        <p>
            因为根据所有权的规则，同一个作用域下，不能同时有活跃的可变借用和不可变借用。通过花括号明确的缩小了可变借用的生命周期，不至于和后续的不可变借用冲突。
        </p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import data from '@/data/rust/03BasicData';

export default defineComponent({
    name: '03BasicPage',
    setup() {
        return { ...data };
    },
});
</script>

<style scoped lang="scss"></style>
