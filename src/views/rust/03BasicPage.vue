<!--
 * @Description: 
 * @Author: 李昶
 * @Date: 2022-10-27 16:37:12
 * @LastEditors: 李昶
 * @LastEditTime: 2022-10-27 17:23:58
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
        <p>现在我们用Rc来实现之前无法实现的DAG。</p>
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
