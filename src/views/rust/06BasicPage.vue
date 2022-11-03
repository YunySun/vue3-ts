<!--
 * @Description: 
 * @Author: 李昶
 * @Date: 2022-11-01 09:53:32
 * @LastEditors: 李昶
 * @LastEditTime: 2022-11-03 14:18:39
 * @Profile: 一个比较废柴的前端开发
-->
<template>
    <div class="basic-06-wrapper article-wrapper">
        <h2 class="project__title article-title">类型系统</h2>
        <p>
            类型系统很大程度上塑造了语言的用户体验以及程序的安全性。为什么这么说？因为，在机器码的世界中，没有类型而言，指令仅仅和立即数或者内存打交道，内存中存放的数据都是字节流。类型系统完全是一种工具，编译器在编译时对数据做静态检查，或者语言在运行时对数据做动态检查的时候，来保证某个操作处理的数据是开发者期望的数据类型。
        </p>
        <h3 class="project__title">类型系统基本概念与分类</h3>
        <p>
            类型，是对值的区分，它包含了值在内存中的长度、对齐以及值可以进行的操作等信息。类型系统其实就是，对类型进行定义、检查和处理的系统。按定义后类型是否可以隐式转换，可以分为强类型和弱类型。Rust不同类型间不能自动转换，所以是强类型语言，而C/C++/JavaScript会自动转换，是弱类型语言。
        </p>
        <p>
            按类型检查的时机，在编译时检查还是运行时检查，可以分为静态类型系统和动态类型系统。对于静态类型系统，还可以进一步分为显式静态和隐式静态，Rust/Java/Swift等语言都是显式静态语言，而Haskell是隐式静态语言。
        </p>
        <p>在类型系统中，多态是一个非常重要的思想，它是指在使用相同的接口时，不同类型的对象，会采用不同的实现。</p>
        <p>
            对于动态类型系统，多态通过鸭子类型（duck typing）实现；而对于静态类型系统，多态可以通过参数多（parametric
            polymorphism）、特设多态（adhoc polymorphism）和子类型多态（subtype polymorphism）实现。
        </p>
        <ul>
            <li>参数多态是指，代码操作的类型是一个满足某些约束的参数，而非具体的类型。</li>
            <li>
                特设多态是指同一种行为有多个不同实现的多态。比如加法，可以1+1，也可以是“abc”+“cde”、matrix1+matrix2、甚至matrix1+vector1。在面向对象编程语言中，特设多态一般指函数的重载。
            </li>
            <li>子类型多态是指，在运行时，子类型可以被当成父类型使用。</li>
        </ul>
        <p></p>
        <p>在Rust中，参数多态通过泛型来支持、特设多态通过trait来支持、子类型多态可以用trait object来支持。</p>
        <img src="../../assets/img/15.png" width="800" />
        <h3 class="project__title">Rust类型系统</h3>
        <p>
            按不同阶段的分类，在定义时，Rust不允许类型的隐式转换，也就是说，Rust是强类型语言；同时在检查时，Rust使用了静态类型系统，在编译期保证类型的正确。强类型加静态类型，使得Rust是一门类型安全的语言。从内存的角度看，类型安全是指代码，只能按照被允许的方法，访问它被授权访问的内存。
        </p>
        <p>
            在此基础上，Rust还进一步对内存的访问进行了读/写分开的授权。所以，Rust下的内存安全更严格：代码只能按照被允许的方法和被允许的权限，访问它被授权访问的内存。为了做到这么严格的类型安全，Rust中除了let/fn/static/const
            这些定义性语句外，都是表达式，而一切表达式都有类型，所以可以说在Rust中，类型无处不在。
        </p>
        <p>
            在Rust中，对于一个作用域，无论是if/else/for循环，还是函数，最后一个表达式的返回值就是作用域的返回值，如果表达式或者函数不返回任何值，那么它返回一个unit()。unit是只有一个值的类型，它的值和类型都是()。
        </p>
        <p>
            unit的应用非常广泛，除了作为返回值，它还被大量使用在数据结构中，比如Result&lt;(),Error&gt;表示返回的错误类型中，我们只关心错误，不关心成功的值，再比如HashSet实际上是HashMap的一个类型别名。作为静态类型语言，Rust提供了大量的数据类型，但是在使用的过程中，进行类型标注是很费劲的，所以Rust类型系统贴心地提供了类型推导。
        </p>
        <p>
            而对比动态类型系统，静态类型系统还比较麻烦的是，同一个算法，对应输入的数据结构不同，需要有不同的实现，哪怕这些实现没有什么逻辑上的差异。对于这些问题可以使用泛型（参数多态）。
        </p>
        <h3 class="project__title">数据类型</h3>
        <p>
            Rust的原生类型包括字符、整数、浮点数、布尔值、数组（array）、元组（tuple）、切片（slice）、指针、引用、函数等
        </p>
        <img src="../../assets/img/16.png" width="800" />
        <p>在原生类型的基础上，Rust 标准库还支持非常丰富的组合类型</p>
        <img src="../../assets/img/17.png" width="800" />
        <h3 class="project__title">类型推导</h3>
        <p>
            作为静态类型系统的语言，虽然能够在编译期保证类型的安全，但一个很大的不便是，代码撰写起来很繁杂，到处都要进行类型的声明。Rust的数据类型相当多，所以，为了减轻开发者的负担，Rust支持局部的类型推导。
        </p>
        <p>
            在一个作用域之内，Rust可以根据变量使用的上下文，推导出变量的类型，这样我们就不需要显式地进行类型标注了。比如这段代码，创建一个BTreeMap后，往这个map里添加了key为“hello”、value为“world”的值
        </p>
        <highlightjs lang="rust" :code="demo1" />
        <p>
            Rust编译器可以从上下文中推导出，BTreeMap的类型K和V都是字符串引用&str，所以这段代码可以编译通过，然而，如果你把insert语句注释去掉，Rust编译器就会报错：“type
            annotations needed for `BTreeMap&lt;K,
            V&gt;`”。Rust编译器需要足够的上下文来进行类型推导，所以有些情况下，编译器无法推导出合适的类型。
        </p>
        <highlightjs lang="rust" :code="demo2" />
        <p>
            collect是Iterator
            trait的方法，它把一个iterator转换成一个集合。因为很多集合类型都实现了iterator，所以这里的collect
            的返回值无法判断。所以代码提示consider giving `even_numbers` an explicit type: `:
            _`。这里编译器只是无法推断出集合类型，但集合类型内部元素的类型，还是可以根据上下文得出。
        </p>
        <highlightjs lang="rust" :code="demo3" />
        <p>除了给变量一个显式的类型外，我们也可以让 collect 返回一个明确的类型。</p>
        <highlightjs lang="rust" :code="demo4" />
        <p>在泛型函数后使用::<span v-lr>T</span>来强制使用类型T，这种写法被称为turbofish。</p>
        <highlightjs lang="rust" :code="demo5" />
        <p>
            turbofish的写法在很多场景都有优势，因为在某些上下文中，你想直接把一个表达式传递给一个函数或者当成一个作用域的返回值。
        </p>
        <p>即使上下文中含有类型的信息，也需要开发者为变量提供类型，比如常量和静态变量的定义。</p>
        <highlightjs lang="rust" :code="demo6" />
        <p>
            这可能是因为const/static主要用于定义全局变量，它们可以在不同的上下文中使用，所以为了代码的可读性，需要明确的类型声明。
        </p>
        <h3 class="project__title">用泛型实现参数多态</h3>
        <p>
            参数化类型可以极大地增强代码的复用性，减少代码的冗余。几乎所有支持静态类型系统的现代编程语言，都支持参数化类型。
        </p>
        <highlightjs lang="rust" :code="demo7" />
        <p>T代表任意类型，当Option有值时是Some(T)，否则是None。</p>
        <p>定义刚才这个泛型数据结构的时候，就像是在定义函数。</p>
        <ul>
            <li>
                函数，是把重复代码中的参数抽取出来，使其更加通用，调用函数的时候，根据参数的不同，我们得到不同的结果；
            </li>
            <li>
                而泛型，是把重复数据结构中的参数抽取出来，在使用泛型类型时，根据不同的参数，我们会得到不同的具体类型。
            </li>
        </ul>
        <p></p>
        <highlightjs lang="rust" :code="demo8" />
        <p>
            Vec有两个参数，一个是T，是列表里的每个数据的类型，另一个是A，它有进一步的限制A:Allocator
            ，也就是说A需要满足Allocator
            trait。A这个参数有默认值Global，它是Rust默认的全局分配器，这也是为什么Vec虽然有两个参数，使用时都只需要用T。生命周期标注也是泛型的一部分，一个生命周期'a代表任意的生命周期，和T代表任意类型是一样的。
        </p>
        <highlightjs lang="rust" :code="demo9" />
        <p>
            Cow（Clone-on-Write）是Rust中一个很有意思且很重要的数据结构。它就像Option一样，在返回数据的时候，提供了一种可能：要么返回一个借用的数据（只读），要么返回一个拥有所有权的数据（可写）。对于拥有所有权的数据B，第一个是生命周期约束。这里B的生命周期是'a，所以B需要满足'a，这里和泛型约束一样，也是用B:'a来表示。当Cow内部的类型B生命周期为'a时，Cow自己的生命周期也是'a。B还有两个约束:?Sized和“where&nbsp;B:ToOwned”。
        </p>
        <p>
            在表述泛型参数的约束时，Rust允许两种方式，一种类似函数参数的类型声明，用“:”来表明约束，多个约束之间用+来表示；另一种是使用where子句，在定义的结尾来表明参数的约束。两种方法都可以，且可以共存。?Sized是一种特殊的约束写法，?代表可以放松问号之后的约束。由于Rust默认的泛型参数都需要是Sized，也就是固定大小的类型，所以这里?Sized代表用可变大小的类型。
        </p>
        <p>ToOwned 是一个 trait，它可以把借用的数据克隆出一个拥有所有权的数据。</p>
        <p>所以这里对 B 的三个约束分别是:</p>
        <ul>
            <li>生命周期 'a</li>
            <li>长度可变 ?Sized</li>
            <li>符合 ToOwned trait</li>
        </ul>
        <p></p>
        <p>
            Cow这个enum里<span v-lr>B as ToOwned</span>::Owned 的含义：它对B做了一个强制类型转换，转成ToOwned
            trait，然后访问ToOwned trait内部的Owned类型。
        </p>
        <p>
            在Rust里，子类型可以强制转换成父类型，B可以用ToOwned约束，所以它是ToOwned
            trait的子类型，因而B可以安全地强制转换成ToOwned。这里B as ToOwned是成立的。
        </p>
        <p>
            上面Vec和Cow的例子中，泛型参数的约束都发生在开头struct或者enum的定义中，其实，很多时候，我们也可以在不同的实现下逐步添加约束
        </p>
        <highlightjs lang="rust" :code="demo10" />
        <p>逐步添加约束，可以让约束只出现在它不得不出现的地方，这样代码的灵活性最大</p>
        <h3 class="project__title">泛型函数</h3>
        <p>
            在声明一个函数的时候，我们还可以不指定具体的参数或返回值的类型，而是由泛型参数来代替。对函数而言，这是更高阶的抽象。
        </p>
        <highlightjs lang="rust" :code="demo11" />
        <p>
            单态化的好处是，泛型函数的调用是静态分派（static
            dispatch），在编译时就一一对应，既保有多态的灵活性，又没有任何效率的损失，和普通函数调用一样高效。但是对比刚才编译会展开的代码也能很清楚看出来，单态化有很明显的坏处，就是编译速度很慢，一个泛型函数，编译器需要找到所有用到的不同类型，一个个编译，所以Rust编译代码的速度总被人吐槽，这和单态化脱不开干系（另一个重要因素是宏）。同时，这样编出来的二进制会比较大，因为泛型函数的二进制代码实际存在N份。
        </p>
        <p>
            因为单态化，代码以二进制分发会损失泛型的信息。如果写了一个库，提供了如上的id()函数，使用这个库的开发者如果拿到的是二进制，那么这个二进制中必须带有原始的泛型函数，才能正确调用。但单态化之后，原本的泛型信息就被丢弃了。
        </p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import data from '@/data/rust/06BasicData';

export default defineComponent({
    name: '06BasicPage',
    setup() {
        return {
            ...data,
        };
    },
});
</script>

<style scoped lang="scss"></style>
