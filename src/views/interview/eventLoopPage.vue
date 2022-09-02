<!--
 * @Description: 
 * @Author: 李昶
 * @Date: 2022-09-02 14:09:07
 * @LastEditors: 李昶
 * @LastEditTime: 2022-09-02 17:23:16
 * @Profile: 一个比较废柴的前端开发
-->
<template>
    <div class="event-wrapper article-wrapper">
        <h2 class="project__title article-title">进程和线程</h2>
        <div class="article-tips warning">进程和线程的区别？单线程有什么好处？</div>
        <p>
            线程和进程都是CPU工作时间片的描述。进程描述的是CPU在运行指令及加载和存储数据所需要的时间，对于应用就是应用中的一个程序。线程是进程中更小的单位，描述执行一段指令所需要的时间。
        </p>
        <p>
            新开一个浏览器页面，有渲染线程、JS引擎线程、HTTP请求线程等等。而线程之间是有可能互相影响的，如浏览器在渲染DOM的时候JS操作DOM就会影响到渲染UI。这也是JS单线程的原因。在当前指令完成后才去执行下一步操作。有节省内存、节省存储数据的时间、没有锁的好处。
        </p>
        <h4 class="project__title">什么是锁？</h4>
        <p>当一个参数有两个操作调用时就会出现这个问题，就是在读取的时候加锁，读取过程中不可做其他操作。</p>
        <h2 class="project__title article-title">执行栈</h2>
        <p>执行栈可认为是一个存储函数调用的栈结构，遵循先进后出的原则。</p>
        <p>
            执行JS代码时，先执行一个main函数，然后才会执行我们的代码。根据先进后出的原则，后执行的函数会先从栈中移除。
        </p>
        <p>栈可以存放的函数也是有限制的，如果存放的函数过多并且没有释放的话，就会出现爆栈的问题。</p>
        <h2 class="project__title article-title">什么是浏览器中的Event Loop？</h2>
        <div class="article-tips warning">异步代码的执行顺序？什么是Event Loop？</div>
        <p>
            其实本质上JS的异步还是同步的行为，在遇到异步的代码时，会先挂起并且在需要执行的时候加入的任务队列中，只要执行栈空了，Event
            Loop就会从任务队列中把需要执行的代码放入执行栈中执行。
        </p>
        <h3 class="project__title">什么是任务队列？</h3>
        <p>
            任务队列是不同的，而不同的任务源会被分配到不同的任务队列中。任务源分为微任务(microtask)和宏任务(macrotask)。
        </p>
        <p>Event Loop执行顺序</p>
        <ul>
            <li>先执行同步代码，属于宏任务</li>
            <li>当执行完了所有同步代码后，执行栈为空，查询是否有异步代码需要执行</li>
            <li>执行所有的微任务</li>
            <li>当执行完所有的微任务后，就可能会渲染页面</li>
            <li>然后开始下一轮的Event Loop，执行宏任务中的异步代码，也就是setTimeout中的回调函数</li>
        </ul>
        <p></p>
        <p>
            微任务：<code-txt>process.nextTick</code-txt>, <code-txt>promise</code-txt>,
            <code-txt>MutationObserver</code-txt>
        </p>
        <p>
            宏任务：<code-txt>script</code-txt>，<code-txt>setTimeout，setInterval，setImmediate</code-txt>,
            <code-txt>I/O</code-txt>，<code-txt>UI rendering</code-txt>。
        </p>
        <p>示例</p>
        <highlightjs language="js" :code="demo1" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import data from '@/data/eventLoopData';
import codeTxt from '@/components/tools/codeTxt.vue';

export default defineComponent({
    components: { codeTxt },
    name: 'eventLoopPage',
    setup() {
        return { ...data };
    },
});
</script>

<style scoped lang="scss"></style>
