<!--
 * @Description: 
 * @Author: 李昶
 * @Date: 2022-10-30 17:12:57
 * @LastEditors: 李昶
 * @LastEditTime: 2022-10-31 15:19:40
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
        <highlightjs lang="rust" :code="demo4" />
        <p>字符串字面量的生命周期是静态的，而s1是动态的，它们的生命周期显然不一致</p>
        <p>
            当出现了多个参数，它们的生命周期可能不一致时，返回值的生命周期就不好确定。编译器在编译某个函数时，并不知道这个函数将来有谁调用、怎么调用，所以，函数本身携带的信息，就是编译器在编译时使用的全部信息。在编译max函数时，参数s1和s2的生命周期是什么关系、返回值和参数的生命周期又有什么关系，编译器是无法确定的。
        </p>
        <p>
            生命周期参数:通过生命周期标注，告诉编译器这些引用间生命周期的约束。生命周期参数的描述方式和泛型参数一致，不过只使用小写字母。生命周期参数，描述的是参数和参数之间、参数和返回值之间的关系，并不改变原有的生命周期。
        </p>
        <highlightjs lang="rust" :code="demo5" />
        <p>
            在我们添加了生命周期参数后，s1和s2的生命周期只要大于等于（outlive）'a，就符合参数的约束，而返回值的生命周期同理，也需要大于等于'a。当main函数调用max函数时，s1和s2有相同的生命周期'a，所以它满足(s1:&'a&nbsp;str,
            s2:&'a&nbsp;str)的约束。当get_max函数调用max时，“Cynthia”是静态生命周期，它大于s1的生命周期'a，所以它也可以满足max的约束需求。
        </p>
        <h3 class="project__title">引用需要额外标注吗</h3>
        <p class="article-tips">很多函数的参数或者返回值都使用了引用，编译器却没有提示我要额外标注生命周期呢？</p>
        <p>所有使用了引用的函数，都需要生命周期的标注，只不过编译器会自动做这件事，省却了开发者的麻烦。</p>
        <highlightjs lang="rust" :code="demo6" />
        <p>
            first函数通过接受一个字符串，找到第一个单词并且返回。虽然没有做生命周期的标注，但编译器会见通过简单的规则为函数自动添加标注。
        </p>
        <ul>
            <li>所有引用类型的参数都有独立的生命周期 'a 、'b 等。</li>
            <li>如果只有一个引用型输入，它的生命周期会赋给所有输出。</li>
            <li>如果有多个引用类型的参数，其中一个是 self，那么它的生命周期会赋给所有输出。</li>
        </ul>
        <p></p>
        <p>例子中的first函数通过规则1和2，可以得到一个带生命周期的版本</p>
        <highlightjs lang="rust" :code="demo7" />
        <p>但是max函数为什么编译器不能自动处理呢？</p>
        <p>按照规则1，max函数的s1和s2分别标注为'a和'b，但是返回值不知道如何处理，这里的冲突，编译器无法解决。</p>
        <h3 class="project__title">引用标注的练习</h3>
        <highlightjs lang="rust" :code="demo8" />
        <p>
            按照编译器的规则，&mut&nbsp;&str添加生命周期后变成&'b&nbsp;mut&nbsp;&'a&nbsp;str，这将导致返回的'&str无法选择一个合适的生命周期。
        </p>
        <highlightjs lang="rust" :code="demo9" />
        <p>
            生命周期标注的目的是，在参数和返回值之间建立联系或者约束。调用函数时，传入的参数的生命周期需要大于等于（outlive）标注的生命周期。
        </p>
        <p>
            当每个函数都添加好生命周期标注后，编译器，就可以从函数调用的上下文中分析出，在传参时，引用的生命周期，是否和函数签名中要求的生命周期匹配。如果不匹配，就违背了“引用的生命周期不能超出值的生命周期”，编译器就会报错。
        </p>
        <h3 class="project__title">数据结构的生命周期标注</h3>
        <highlightjs lang="rust" :code="demo10" />
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
