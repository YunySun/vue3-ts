<!--
 * @Description: 
 * @Author: 李昶
 * @Date: 2022-09-29 14:38:47
 * @LastEditors: 李昶
 * @LastEditTime: 2022-10-03 17:48:42
 * @Profile: 一个比较废柴的前端开发
-->
<template>
    <div class="install-wrapper article-wrapper">
        <h2 class="project__title article-title">安装和了解Rust</h2>
        <h3 class="project__title">安装Rust</h3>
        <p><a class="link" href="https://www.rust-lang.org/learn/get-started" target="_blank">rust</a>下载地址</p>
        <p>安装的时候会弹出cmd终端，所有操作选择1后，在终端输入rustc -V和cargo -V如果可以获取版本号则安装成功。</p>
        <h3 class="project__title">vscode在extensions中安装的扩展推荐。</h3>
        <ul>
            <li>
                rust-analyzer：它会实时编译和分析你的 Rust 代码，提示代码中的错误，并对类型进行标注。你也可以使用官方的
                Rust 插件取代。
            </li>
            <li>rust syntax：为代码提供语法高亮。</li>
            <li>crates：帮助你分析当前项目的依赖是否是最新的版本。</li>
            <li>
                better toml：Rust 使用 toml 做项目的配置管理。better toml 可以帮你语法高亮，并展示 toml 文件中的错误。
            </li>
            <li>rust test lens：可以帮你快速运行某个 Rust 测试。</li>
            <li>Native Debug</li>
        </ul>
        <p></p>
        <h3 class="project__title">命令</h3>
        <highlightjs lang="cmd" :code="demo1" />
        <h3 class="project__title">第一个Rust程序：通过HTTP请求获取网站首页，并且转换成md文件保存</h3>
        <p>通过cargo new scrape_url生成新项目，入口在src/main.rs。在Cargo.toml文件添加依赖</p>
        <highlightjs :code="demo2" />
        <p>
            Cargo.toml是Rust项目的配置管理文件，符合toml语法，上一步为这个项目添加了2个依赖：reqwest和html2md。reqwest是一个Http客户端，他的使用方式应该和JS下axios类似；html2md很明显是将HTMl文本转换成md。接下来操作src/main.rs文件。
        </p>
        <highlightjs :code="demo3" />
        <p>保存后，通过命令行进入该项目目录，输入cargo run，程序运行后得到如下输出：</p>
        <highlightjs :code="demo4" />
        <p>并且在当前目录下生成了一个rust.md文件。其内容就是设置的网站的内容。</p>
        <h3 class="project__title">Rust的基本特点：</h3>
        <ul>
            <li>
                Rust是通过名为cargo的工具来管理项目的，类似于Nodejs的npm，用来对依赖管理和开发中的任务管理，如编译、运行
                、测试 等等操作。
            </li>
            <li>
                Rust的整体语法偏C/C++风格。函数体是用花括号{}包裹，表达式之间用分号；分隔，访问结构体成员函数或者变量
                时使用的点.运算符，访问命名空间或者对象的静态函数使用的双冒号::运算符。如果简化对命名空间内函数或者数据的引用，可以使用use关键字，如use
                std::fs。其可执行函数入口为main函数。
            </li>
            <li>
                Rust虽然是一门强类型语言，但编译器支持类型推导。当然这样降低了代码的可读性，不过编译器使用了
                rust-analyzer 插件，变量的类型会自动提示
            </li>
            <li>Rust 支持宏编程，很多基础的功能比如 println!() 都被封装成一个宏，便于开发者写出简洁的代码。</li>
        </ul>
        <p></p>
        <h3 class="project__title">Rust的其它特点：</h3>
        <ul>
            <li>Rust 的变量默认是不可变的，如果要修改变量的值，需要显式地使用 mut 关键字。</li>
            <li>
                除了 let / static / const / fn 等少数语句外，Rust 绝大多数代码都是表达式（expression）。所以 if / while
                / for / loop 都会返回一个值，函数最后一个表达式就是函数的返回值，这和函数式编程语言一致。
            </li>
            <li>Rust 支持面向接口编程和泛型编程。</li>
            <li>Rust 有非常丰富的数据类型和强大的标准库。</li>
            <li>Rust 有非常丰富的控制流程，包括模式匹配（pattern match）。</li>
        </ul>
        <p></p>
        <h3 class="project__title">基本语法和基础数据类型</h3>
        <h4 class="project__title">变量和函数</h4>
        <p>
            Rust
            支持类型推导，在编译器能够推导类型的情况下，变量类型一般可以省略，但常量（const）和静态变量（static）必须声明类型。定义变量的时候，根据需要，你可以添加
            mut 关键字让变量具备可变性。默认变量不可变是一个很重要的特性，它符合最小权限原则（Principle of Least
            Privilege），有助于我们写出健壮且正确的代码。当你使用 mut 却没有修改变量，Rust
            编译期会友好地报警，提示你移除不必要的 mut。
        </p>
        <p>在 Rust 下，函数是一等公民，可以作为参数或者返回值。</p>
        <highlightjs :code="demo5" />
        <p>
            fn(i32) -> i32是apply函数的第二个参数类型，表明接受一个函数作为参数，这个参数必须是一个且类型是i32，返回值
            类型也是i32。
        </p>
        <p>
            Rust 函数参数的类型和返回值的类型都必须显式定义，如果没有返回值可以省略，返回
            unit。函数内部如果提前返回，需要用 return
            关键字，否则最后一个表达式就是其返回值。如果最后一个表达式后添加了; 分号，隐含其返回值为 unit。
        </p>
        <highlightjs :code="demo6" />
        <h4 class="project__title">数据结构</h4>
        <p>
            了解了函数如何定义后，我们来看看 Rust
            数据结构是程序的核心组成部分，在对复杂的问题进行建模时，我们就要自定义数据结构。Rust 非常强大，可以用 struct
            定义结构体，用 enum 定义标签联合体（tagged union），还可以像 Python 一样随手定义元组（tuple）类型。
        </p>
        <highlightjs lang="rust" :code="demo7" />
        <p>1.Gender：一个枚举类型，在 Rust 下，使用 enum 可以定义类似 C 的枚举类型</p>
        <p>
            2.UserId/TopicId ：struct 的特殊形式，称为元组结构体。它的域都是匿名的，可以用索引访问，适用于简单的结构体。
        </p>
        <p>3.User/Topic：标准的结构体，可以把任何类型组合在结构体里使用。</p>
        <p>4.Event：标准的标签联合体，它定义了三种事件：Join、Leave、Message。每种事件都有自己的数据结构。</p>
        <p>
            在定义数据结构的时候，一般会加入修饰，为数据结构引入一些额外的行为。在 Rust 里，数据的行为通过 trait
            来定义，暂时认为 trait 定义了数据结构可以实现的接口，类似 Java 中的 interface。
        </p>
        <p>
            一般我们用impl关键字为数据结构实现 trait，但Rust提供了派生宏（derive
            macro），可以大大简化一些标准接口的定义，比如 #[derive(Debug)] 为数据结构实现了Debug trait，提供了debug
            能力，这样可以通过 {:?}，用 println! 打印出来。
        </p>
        <p>
            在定义 UserId / TopicId 时我们还用到了 Copy / Clone 两个派生宏，Clone 让数据结构可以被复制，而 Copy
            则让数据结构可以在参数传递的时候自动按字节拷贝。
        </p>
        <h3 class="project__title">控制流程</h3>
        <p>
            顺序执行就是一行行代码往下执行。在执行的过程中，遇到函数，会发生函数调用。函数调用是代码在执行过程中，调用另一个函数，跳入其上下文执行，直到返回。
        </p>
        <p>
            Rust 的循环和大部分语言都一致，支持死循环 loop、条件循环 while，以及对迭代器的循环 for。循环可以通过 break
            提前终止，或者 continue 来跳到下一轮循环。
        </p>
        <p>满足某个条件时会跳转， Rust 支持分支跳转、模式匹配、错误跳转和异步跳转。</p>
        <p>分支跳转就是我们熟悉的 if/else；</p>
        <p>Rust 的模式匹配可以通过匹配表达式或者值的某部分的内容，来进行分支跳转；</p>
        <p>在错误跳转中，当调用的函数返回错误时，Rust 会提前终止当前函数的执行，向上一层返回错误。</p>
        <p>
            在 Rust 的异步跳转中 ，当 async 函数执行 await
            时，程序当前上下文可能被阻塞，执行流程会跳转到另一个异步任务执行，直至 await 不再阻塞。
        </p>
        <highlightjs lang="rust" :code="demo8" />
        <p>
            Rust 的 for 循环可以用于任何实现了 IntoIterator trait 的数据结构。在执行过程中，IntoIterator
            会生成一个迭代器，for 循环不断从迭代器中取值，直到迭代器返回 None 为止。因而，for
            循环实际上只是一个语法糖，编译器会将其展开使用 loop 循环对迭代器进行循环访问，直至返回 None。
        </p>
        <p>
            在 fib_for 函数中， 2…n 这样的语法，想必 Python 开发者一眼就能明白这是 Range 操作，2…n 包含 2 &lt;= x &lt; n
            的所有值。和 Python 一样，在 Rust 中，你也可以省略 Range 的下标或者上标，比如：
        </p>
        <highlightjs lang="rust" :code="demo9" />
        <p>
            和 Python 不同的是，Range 不支持负数，所以你不能使用 arr[1..-1] 这样的代码。这是因为，Range 的下标上标都是
            usize 类型，不能为负数。
        </p>
        <h3 class="project__title">模式匹配</h3>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import data from '@/data/rust/installData';

export default defineComponent({
    name: 'installPage',
    setup() {
        return {
            ...data,
        };
    },
});
</script>

<style scoped lang="scss"></style>
