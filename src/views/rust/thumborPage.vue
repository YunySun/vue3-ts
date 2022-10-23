<!--
 * @Description: 
 * @Author: 李昶
 * @Date: 2022-10-22 16:42:16
 * @LastEditors: 李昶
 * @LastEditTime: 2022-10-23 17:19:33
 * @Profile: 一个比较废柴的前端开发
-->
<template>
    <div class="thumbor-wrapper article-wrapper">
        <h2 class="article-title project__title">构建一个类似Thumbor的图片服务器</h2>
        <h3 class="project__title">Thumbor</h3>
        <p>Thumbor是python下的一个著名的图片服务器，被广泛应用在各种需要动态调整图片尺寸的场合中。</p>
        <p>它可以通过一个简单的Http接口，实现图片的动态裁剪和大小调整，另外还支持存储、替换处理引擎等其他辅助功能。</p>
        <p>
            Thumbor可以对这个图片最后的URL使用smart
            crop剪切，并调整大小为300*200的尺寸输出，用户访问这个URL就会得到一个300*200大小的省略图。
        </p>
        <h3 class="project__title">分析</h3>
        <p>
            实现图片转换，要支持转换功能，比如调整大小、剪切、加水印，甚至包括图片的滤镜，难点在于接口设计上，需要设计
            简用、简洁的接口，让图片服务器更具扩展性。
        </p>
        <p>
            需要找一种简洁且可扩展的方式，来描述对图片进行的一系列有序操作。如：先做resize之后再添加一个水印，最后统一
            使用一个滤镜
        </p>
        <highlightjs lang="rust" :code="demo1" />
        <p>
            我这里的思路是使用protobuf。protobuf可以描述数据结构，几乎所有语言都有对protobuf的支持。当用protobuf
            生成一个image spec后，我们可以将其序列化成字节流。但字节流无法放在URL中，怎么办？我们可以用 base64
            转码！protobuf (protocol buffer)
            是谷歌内部的混合语言数据标准。通过将结构化的数据进行序列化(串行化)，用于通讯协议、数据存储等领域的语言无关、平台无关、可扩展的序列化结构数据格式。
        </p>
        <highlightjs lang="rust" :code="demo2" />
        <p>这样就可以在 URL 中，嵌入通过 protobuf 生成的 base64 字符串，来提供可扩展的图片处理参数。</p>
        <highlightjs lang="rust" :code="demo3" />
        <p>
            CgoKCAjYBBCgBiADCgY6BAgUEBQKBDICCAM 描述了我们上面说的图片的处理流程：先做 resize，之后对 resize
            的结果添加一个水印，最后统一使用一个滤镜。它可以用下面的代码实现：
        </p>
        <highlightjs lang="rust" :code="demo4" />
        <p>使用 protobuf 的好处是，序列化后的结果比较小巧，而且任何支持 protobuf 的语言都可以生成或者解析这个接口。</p>
        <p>
            接下来就是做一个HTTP服务器提供这个接口。在HTTP服务器对/image路由的处理流程里，我们需要从URL
            中获取原始的图片，然后按照image spec依次处理，最后把处理完的字节流返回给用户。
        </p>
        <p>
            在这个流程中，显而易见能够想到的优化是，为原始图片的获取过程，提供一个 LRU（Least Recently
            Used）缓存，因为访问外部网络是整个路径中最缓慢也最不可控的环节。
        </p>
        <img src="../../assets/img/9.png" width="600" alt="" />
        <h3 class="project__title">protobuf 的定义和编译</h3>
        <p>Cargo.toml</p>
        <highlightjs lang="rust" :code="demo5" />
        <p>在项目根目录下，生成一个 abi.proto 文件，写入我们支持的图片处理服务用到的数据结构：</p>
        <highlightjs lang="rust" :code="demo6" />
        <p>
            protobuf 是一个向下兼容的工具，所以在服务器不断支持更多功能时，还可以和旧版本的客户端兼容。在 Rust
            下，我们可以用 prost 来使用和编译 protobuf。同样，在项目根目录下，创建一个 build.rs
        </p>
        <highlightjs lang="rust" :code="demo7" />
        <p>
            build.rs 可以在编译 cargo 项目时，做额外的编译处理。这里我们使用 prost_build 把 abi.proto 编译到 src/pb
            目录下。
        </p>
        <p>
            运行 cargo build，你会发现在src/pb 下，有一个abi.rs文件被生成出来，这个文件包含了从protobuf消息转换出来的
            Rust 数据结构。build后发现报错提示没有protoc。
        </p>
        <h3 class="project__title">Windows系统安装protoc</h3>
        <ul>
            <li>下载包地址https://github.com/protocolbuffers/protobuf/releases，下载的是protoc-21.8-win64.zip</li>
            <li>将bin文件夹里的protoc.exe设置为环境变量，并且将protoc.exe文件拷贝到C:\Windows|System32文件夹中</li>
            <li>在终端输入protoc --version 打印出libprotoc 3.21.8表示安装成功</li>
        </ul>
        <p></p>
        <p>
            创建src/pb/mod.rs文件，一个目录下的所有代码，可以通过mod.rs声明。在这个文件中引入abi.rs。添加一些函数。用作
            于将ImageSpec转换为字符串，或者恢复字符串。且要在main.rs添加mod pb引入这个模块。
        </p>
        <highlightjs lang="rust" :code="demo8" />
        <h3 class="project__title">引入Http服务器</h3>
        <p>
            <a class="link" href="https://github.com/actix/actix-web" target="_blank">actix-web</a>、
            <a class="link" href="https://github.com/SergioBenitez/Rocket" target="_blank">rocket</a>、
            <a class="link" href="https://github.com/seanmonstar/warp" target="_blank">warp</a>，以及
            <a class="link" href="https://github.com/tokio-rs/axum">axum</a>。
        </p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import data from '@/data/rust/thumborData';

export default defineComponent({
    name: 'thumborPage',
    setup() {
        return { ...data };
    },
});
</script>

<style scoped lang="scss"></style>
