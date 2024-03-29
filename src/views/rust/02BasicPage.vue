<!--
 * @Description: 
 * @Author: 李昶
 * @Date: 2022-10-26 23:22:26
 * @LastEditors: 李昶
 * @LastEditTime: 2022-10-27 16:35:01
 * @Profile: 一个比较废柴的前端开发
-->
<template>
    <div class="basic-01-wrapper article-wrapper">
        <h2 class="article-title project__title">所有权：值的借用是如何工作的？</h2>
        <p>
            当进行变量赋值、传参和函数返回时，如果涉及的数据结构没有实现Copy trait，就会默认使用Move
            语义转移值的所有权，失去所有权的变量将无法继续访问原来的数据；如果数据结构实现了Copy trait，就会使用Copy
            语义，自动把值复制一份，原有的变量还能继续访问。
        </p>
        <p class="article-tips">当你不希望值的所有权被转移，又因为没有实现 Copy trait 而无法使用 Copy 语义，怎么办</p>
        <h3 class="project__title">Borrow语义</h3>
        <p>
            Borrow语义允许一个值的所有权，在不发生转移的情况下，被其它上下文使用。就好像住酒店或者租房那样，旅客/租客只有房间的临时使用权，但没有它的所有权。另外，Borrow语义通过引用语法（&或者&mut）来实现>。
        </p>
        <p>
            在Rust中，“借用”和“引用”是一个概念，只不过在其他语言中引用的意义和Rust不同，所以Rust提出了新概念“借用”，便于区分。在其他语言中，引用是一种别名，你可以简单理解成鲁迅之于周树人，多个引用拥有对值的无差别的访问权限，本质上是共享了所有权；而在Rust下，所有的引用都只是借用了“临时使用权”，它并不破坏值的单一所有权约束。因此默认情况下，Rust的借用都是只读的，就好像住酒店，退房时要完好无损。但有些情况下，我们也需要可变的借用，就像租房，可以对房屋进行必要的装饰。
        </p>
        <p>如果想避免Copy或者Move，可以使用借用，或者说引用。</p>
        <h3 class="project__title">只读借用/引用</h3>
        <p>引用是一个受控的指针，指向某个特定的类型。其它语言中，函数传参有2种方式：传值和传引用。</p>
        <p>
            以Java为例，给函数传一个整数，这是传值，和Rust里的Copy语义一致；而给函数传一个对象，或者任何堆上的数据结构，Java都会自动隐式地传引用。刚才说过，Java的引用是对象的别名，这也导致随着程序的执行，同一块内存的引用到处都是，不得不依赖GC进行内存回收。
        </p>
        <p>
            但Rust没有传引用的概念，Rust所有的参数传递都是传值，不管是Copy还是Move。所以在Rust中，你必须显式地把某个数据的引用，传给另一个函数。
        </p>
        <p>
            Rust的引用实现了Copy
            trait，所以按照Copy语义，这个引用会被复制一份交给要调用的函数。对这个函数来说，它并不拥有数据本身，数据只是临时借给它使用，所有权还在原来的拥有者那里。在Rust里，引用是一等公民，和其他数据类型地位相等。
        </p>
        <highlightjs lang="rust" :code="demo1" />
        <p>
            data1、&data和传到sum()里的data1都指向data本身，这个值的地址是固定的。但是它们引用的地址都是不同的，这印证了我们讲Copy
            trait的时候，介绍过只读引用实现了Copy trait，也就意味着引用的赋值、传参都会产生新的浅拷贝。
        </p>
        <p>
            虽然data有很多只读引用指向它，但堆上的数据依旧只有data一个所有者，所以值的任意多个引用并不会影响所有权的唯一性。
        </p>
        <p>
            新问题：一旦data离开了作用域被释放，如果还有引用指向data，岂不是造成我们想极力避免的使用已释放内存（use
            after free）这样的内存安全问题？怎么办呢？
        </p>
        <h3 class="project__title">借用的生命周期及其约束</h3>
        <p>所以，对值的引用也要有约束，这个约束是：借用不能超过值的生存期。</p>
        <p>
            在上面的代码中，sum函数处在main函数下一层调用栈中，它结束之后main函数还会继续执行，所以在main函数中定义的
            data生命周期要比sum中对data的引用要长，这样不会有任何问题。
        </p>
        <highlightjs lang="rust" :code="demo2" />
        <p>
            生命周期更长的main函数变量r，引用了生命周期更短的local_ref函数里的局部变量，这违背了有关引用的约束，所以
            Rust不允许这样的代码编译通过。因为local_ref函数结束了但是main还会继续执行，而这也就是借用的值已经释放了，但是引用的值还存在。违背了引用的约束。
        </p>
        <p class="article-tips">那么，如果在堆内存中，使用栈内存的引用，可以么？</p>
        <p>
            堆内存的生命周期比栈内存的要更长更灵活，所以如果堆使用栈的引用的话，栈释放后，而堆还在使用，就违背了引用约束了。
        </p>
        <p>
            把一个本地变量的引用存入一个可变数组中。从基础知识的学习中我们知道，可变数组存放在堆上，栈上只有一个胖指针指向它，
        </p>
        <highlightjs lang="rust" :code="demo3" />
        <highlightjs lang="rust" :code="demo4" />
        <p>发现都是对栈的引用，上述2个列子第一个例子成功了，第二个却失败了。</p>
        <p>
            堆变量的生命周期不具备任意长短的灵活性，因为堆上内存的生死存亡，跟栈上的所有者牢牢绑定。而栈上内存的生命周期，又跟栈的生命周期相关，所以我们核心只需要关心调用栈的生命周期。因為堆內存都是依賴棧內存而存在，比如堆內存裡的Vec是依賴棧上的胖指針存在，胖指針收回了則堆上的Vec也要收回了。不過順序是堆內存先回收再是棧內存。
        </p>
        <p>demo2上r引用的是local_ref函数的值，而r所在的函数main的生命周期比local_ref的长，所以违反了约束</p>
        <p>
            demo3上data在栈上指向堆上的Vec动态数组，然后将&v添加到data上，堆上内存的生命周期等于data的生命周期，和v的生命周期也一样，所以没有报错。
        </p>
        <p>
            demo4上堆内存的生命周期等于data的生命周期，所以无法引用比他生命周期短的v，其实就是main函数在调用local_ref函数，而v的生命周期只是local_ref存在的时间，而main是在local_ref后释放，所以生命周期更长，所以无法引用。
        </p>
        <h3 class="project__title">可变借用/引用</h3>
        <p>
            在没有引入可变借用之前，因为一个值同一时刻只有一个所有者，所以如果要修改这个值，只能通过唯一的所有者进行。但是，如果允许借用改变值本身，会带来新的问题。
        </p>
        <div class="article-tips">多个可变引用共存</div>
        <highlightjs lang="rust" :code="demo5" />
        <p>
            这段代码在遍历可变数组data的过程中，还往data里添加新的数据，这是很危险的动作，因为它破坏了循环的不变性（loop
            invariant），容易导致死循环甚至系统崩溃。所以，在同一个作用域下有多个可变引用，是不安全的。
        </p>
        <div class="article-tips">多个可变引用是不安全的，那如果同时有一个可变引用和若干个只读引用，会有问题吗？</div>
        <highlightjs lang="rust" :code="demo6" />
        <p>
            不可变数组data1引用了可变数组data中的一个元素，这是个只读引用。后续我们往data中添加了100个元素，在调用data.push()时，我们访问了data的可变引用。这段代码中，data
            的只读引用和可变引用共存，似乎没有什么影响，因为 data1 引用的元素并没有任何改动。
        </p>
        <p>
            这里有内存不安全的潜在操作：如果继续添加元素，堆上的数据预留的空间不够了，就会重新分配一片足够大的内存，把之前的值拷过来，然后释放旧的内存。这样就会让data1中保存的&data[0]引用失效，导致内存安全问题。
        </p>
        <h3 class="project__title">Rust的限制</h3>
        <p>
            多个可变引用共存、可变引用和只读引用共存这两种问题，通过GC等自动内存管理方案可以避免第二种，但是第一个问题GC也无济于事。
        </p>
        <p>Rust对可变引用的使用也做了严格的约束：</p>
        <ul>
            <li>
                在一个作用域内，仅允许一个活跃的可变引用。所谓活跃，就是真正被使用来修改数据的可变引用，如果只是定义了，却没有使用或者当作只读引用使用，不算活跃。
            </li>
            <li>在一个作用域内，活跃的可变引用（写）和只读引用（读）是互斥的，不能同时存在。</li>
        </ul>
        <p></p>
        <h3 class="project__title">小结</h3>
        <ul>
            <li>
                一个值在同一时刻只有一个所有者。当所有者离开作用域，其拥有的值会被丢弃。赋值或者传参会导致值Move，所有权被转移，一旦所有权转移，之前的变量就不能访问。
            </li>
            <li>如果值实现了Copy trait，那么赋值或传参会使用 Copy 语义，相应的值会被按位拷贝，产生新的值。</li>
            <li>一个值可以有多个只读引用。</li>
            <li>
                一个值可以有唯一一个活跃的可变引用。可变引用（写）和只读引用（读）是互斥的关系，就像并发下数据的读写互斥那样。
            </li>
            <li>引用的生命周期不能超出值的生命周期。</li>
        </ul>
        <p></p>
        <img src="../../assets/img/10.png" width="1200" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import data from '@/data/rust/02BasicData';

export default defineComponent({
    name: '02BasicPage',
    setup() {
        return { ...data };
    },
});
</script>

<style scoped lang="scss"></style>
