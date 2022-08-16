<!--
 * @Description: 
 * @Author: 李昶
 * @Date: 2022-08-12 16:05:12
 * @LastEditors: 李昶
 * @LastEditTime: 2022-08-16 23:04:30
 * @Profile: 一个比较废柴的前端开发
-->
<template>
    <div class="basic-wrapper article-wrapper">
        <h2 class="project__title article-title">== 对比 ===</h2>
        <div class="article-tips warning">==和===有什么区别？</div>
        <p>对于<code-txt>==</code-txt>，如果类型不一样的话，会先进行类型转换，转换成同样的类型后在进行比较</p>
        <ul>
            <li>首先对比类型是否相同，如果类型相同则比较大小</li>
            <li>类型不同则类型转换</li>
            <li>
                首先先判断是否在对比<code-txt>null</code-txt>和<code-txt>undefined</code-txt>，是的话返回<code-txt
                    >true</code-txt
                >
            </li>
            <li>判断两个类型是否是字符串和数字，如果是则将字符串转换成数字然后比较</li>
            <li>判断一方是否是布尔值，是的话将布尔值转换成数字然后进行比较</li>
            <li>判断一方是否是对象切另一方是字符串，则会调用对象内置原始类型转换转换成原始类型在进行下一步</li>
        </ul>
        <p></p>
        <p>对于<code-txt>===</code-txt>就很简单了，判断类型和值是否相同，一般比较运算的时候我都喜欢用这个。</p>
        <h2 class="project__title article-title">闭包</h2>
        <div class="article-tips warning">什么是闭包？</div>
        <p>闭包的定义就是一个函数访问了包裹函数的一个变量。存在的意义就是间接访问内部的变量。</p>
        <highlightjs language="js" :code="demo1" />
        <div class="article-tips warning">for循环内异步拿到的for循环变量问题？</div>
        <highlightjs language="js" :code="demo2" />
        <p>三种解决方案：</p>
        <p>1.通过闭包的方式（立即执行函数）</p>
        <highlightjs language="js" :code="demo3" />
        <p>2.setTimeout传参</p>
        <highlightjs language="js" :code="demo4" />
        <p>3.let</p>
        <highlightjs language="js" :code="demo5" />
        <h2 class="project__title">深浅拷贝</h2>
        <div class="article-tips warning">什么是浅拷贝？什么是深拷贝？如何实现他们？</div>
        <p>
            对于对象类型赋值，都是复制的地址赋值给新对象，这样的话新对象或者旧对象修改属性就会导致另一个对象造成变化。而要移除新旧对象之间的联系的话，就需要浅拷贝或者深拷贝了。
        </p>
        <h3 class="project__title">浅拷贝</h3>
        <p>
            浅拷贝将对象的属性和值复制到新对象中，如果属性的值是对象的话，拷贝的也是地址。可以通过<code-txt
                >Object.assign({}, copyObj)</code-txt
            >来实现。
        </p>
        <h3 class="project__title">深拷贝</h3>
        <p>对于浅拷贝我们了解了无法对属性为对象的值移除和原对象的关联，所以深拷贝</p>
        <p>
            可以通过<code-txt>JSON.parse(JSON.stringify(copyObject))</code-txt>，但是有局限性，会忽略<code-txt>undefined</code-txt>、<code-txt>symbol</code-txt>、不能序列化函数、不能解决循环引用的对象。
        </p>
        <p>如果拷贝的对象含内置类型且不包含函数，可以使用<code-txt>MessageChannel</code-txt></p>
        <highlightjs language="js" :code="demo6" />
        <p>循环实现深拷贝：</p>
        <highlightjs language="js" :code="demo7" />
        <h2 class="project__title">原型</h2>
        <div class="article-tips warning">什么是原型？原型链是什么？</div>
        <p>疑惑：为什么创建一个对象后，明明我们没有给它定义函数，但是却可以调用它们。</p>
        <p>
            当我们创建一个对象并打印后发现，在浏览器上这个对象里面还包含了一个<code-txt>__proto__（[[Prototype]]）</code-txt>属性，而我们调用的函数也可在这上找到。也就是说JS的每个对象都有这个<code-txt>__proto__</code-txt>属性，而这个属性的值也就是所谓的原型。这个原型上绑定了很多函数，所以创建一个对象后，可以通过<code-txt>__proto__</code-txt>找到一个原型对象，而这个原型对象上定义了很多函数供我们使用。在<code-txt>__proto__</code-txt>对象内还有一个<code-txt>constructor</code-txt>属性，这个属性值是一个对象。这个对象有个属性<code-txt>prototype</code-txt>，它的值和原对象的<code-txt>__proto__</code-txt>相同。
        </p>
        <highlightjs language="js" :code="demo8" />
        <p>而所谓的原型链就是通过<code-txt>__proto__</code-txt>的方式连接。这就是对象可以访问自己并没有绑定的函数。</p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CodeTxt from '@/components/tools/codeTxt.vue';
import data from '@/data/basicDataTwo';

export default defineComponent({
    name: 'basicPageTwo',
    components: { CodeTxt },
    setup() {
        return { ...data };
    },
});
</script>

<style scoped lang="scss"></style>
