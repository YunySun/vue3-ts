<!--
 * @Description: 
 * @Author: 李昶
 * @Date: 2022-10-12 22:11:07
 * @LastEditors: 李昶
 * @LastEditTime: 2022-10-18 23:39:37
 * @Profile: 一个比较废柴的前端开发
-->
<template>
    <div class="cli-wrapper article-wrapper">
        <h2 class="project__title article-title">HTTPie</h2>
        <p>
            写一个CLI工具，以<a class="link" href="https://httpie.io/" target="_blank">HTTPie</a
            >为例，以Rust实现这个CLI。是通过Python开发的类似cURL但对用户更加友善的命令行工具，可以更好的 诊断 HTTP服务。
        </p>
        <h3 class="project__title">功能分析</h3>
        <ul>
            <li>
                首先是做命令行解析，处理子命令和各种参数，验证用户的输入，并且将这些输入转换成我们内部能理解的参数；
            </li>
            <li>之后根据解析好的参数，发送一个 HTTP 请求，获得响应；</li>
            <li>最后输出响应</li>
        </ul>
        <p></p>
        <h3 class="project__title">需要用到的库</h3>
        <ul>
            <li>
                对于命令行解析，Rust 有很多库可以满足这个需求，我们今天使用官方比较推荐的<a
                    class="link"
                    target="_blank"
                    href="https://github.com/clap-rs/clap"
                    >clap</a
                >。
            </li>
            <li>
                对于 HTTP 客户端，在上一讲我们已经接触过<a
                    class="link"
                    target="_blank"
                    href="https://github.com/seanmonstar/reqwest"
                    >reqwest</a
                >
                ，我们就继续使用它，只不过我们这次尝个鲜，使用它的异步接口。
            </li>
            <li>
                对于格式化输出，为了让输出像Python版本的HTTPie
                那样显得生动可读，可以引入一个命令终端多彩显示的库，这里我们选择比较简单的<a
                    class="link"
                    target="_blank"
                    href="https://github.com/mackwic/colored"
                    >colored</a
                >。
            </li>
            <li>
                除此之外，我们还需要一些额外的库：用 anyhow 做错误处理、用 jsonxf 格式化 JSON 响应、用 mime 处理 mime
                类型，以及引入 tokio 做异步处理。
            </li>
        </ul>
        <p></p>
        <h3 class="project__title">CLI处理</h3>
        <p>编辑Cargo.toml文件，添加需要的依赖。</p>
        <highlightjs lang="rust" :code="demo1" />
        <p>main.rs处理cli的相关代码</p>
        <highlightjs lang="rust" :code="demo2" />
        <h3 class="project__title">验证</h3>
        <p>
            当前对用户输入没有做任何检验，如果输入错误是可能导致URL解析错误的，所以需要加入验证。一个是验证URL，另一个
            是验证body
        </p>
        <p>验证URL是合法的</p>
        <highlightjs lang="rust" :code="demo3" />
        <p>
            要确保 body 里每一项都是 key=value 的格式。可以定义一个数据结构 KvPair
            来存储这个信息，并且也自定义一个解析函数把解析的结果放入 KvPair
        </p>
        <highlightjs lang="rust" :code="demo4" />
        <p>
            这些验证代码没有放在主流程中，都是通过额外的验证函数和trait完成的，这些新添加的代码，可复用且彼此独立，并不需要
            修改主流程
        </p>
        <p>Rust 可以通过宏、trait、泛型函数、trait object 等工具，帮助我们更容易写出结构良好、容易维护的代码。</p>
        <h3 class="project__title">Http请求</h3>
        <p>
            main 函数变成了 async fn，它代表异步函数。对于 async main，我们需要使用 #[tokio::main]
            宏来自动添加处理异步的运行时。
        </p>
        <highlightjs lang="rust" :code="demo5" />
        <p>然后在 main 函数内部，我们根据子命令的类型，分别调用 get 和 post 函数做具体处理</p>
        <highlightjs lang="rust" :code="demo6" />
        <p>全部代码</p>
        <highlightjs lang="rust" :code="demo7" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import data from '@/data/rust/implementsCliData';

export default defineComponent({
    name: 'implementCliPage',
    setup() {
        return {
            ...data,
        };
    },
});
</script>

<style scoped lang="scss"></style>
